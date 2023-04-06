
import { getSolidDataset,getStringNoLocale,saveSolidDatasetAt, Thing, getThing,setThing, saveFileInContainer,buildThing, getUrlAll } from "@inrupt/solid-client";
import { FOAF} from "@inrupt/vocab-common-rdf";
import { IMarker } from "../types/IMarker";
import { getFile, overwriteFile} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { getFriendData } from "./friendHelper";
import { ISolidUser } from "../types/ISolidUser";
import {
    getSolidDatasetWithAcl,
    hasResourceAcl,
    hasFallbackAcl,
    hasAccessibleAcl,
    createAclFromFallbackAcl,
    getResourceAcl,
    setAgentResourceAccess,
    saveAclFor,
  } from "@inrupt/solid-client";
  



export async function getProfile(webId: string) {
  let profileDocumentURI = webId.split("#")[0];
  let myDataset = await getSolidDataset(profileDocumentURI);
  return getThing(myDataset, webId) as Thing;
}

export async function getNameFromPod(webId: string) {
  if (webId === "" || webId === undefined) {
    return "Not Found"
  }
  let name = getStringNoLocale(await getProfile(webId), FOAF.name);
  if (name == null) {
    name = "Not Name Found"
  }
  return name;
}

export async function readMarkerFromPod(webId?: string) {
  let markers: IMarker[] = []
  let profileDocumentURI = webId?.split("profile")[0];
  try {
    await getFile(
      profileDocumentURI + 'private/LoMap/Markers.json',
      { fetch: fetch },
    ).then(async () => {
      const file = await getFile(
        profileDocumentURI + 'private/LoMap/Markers.json',
        { fetch: fetch },
      )
      markers = JSON.parse(await file.text());
    }).catch(async (err: any) => {
      const blob = new Blob([], {
        type: "application/json;charset=utf-8"
      })
      await saveFileInContainer(
        profileDocumentURI + 'private/LoMap/',
        blob,
        { slug: "Markers.json", contentType: blob.type, fetch }
      );
    });
  } catch (err) {
  }
  return markers;
};

export async function saveMarkerToPod(markers: IMarker[], webId?: string) {
        let profileDocumentURI = webId?.split("profile")[0];
        let targetFileURL = profileDocumentURI + 'private/LoMap/Markers.json';
        let str = JSON.stringify(markers);
        const bytes = new TextEncoder().encode(str);
        const blob = new Blob([bytes], {
            type: "application/json;charset=utf-8"
        });
        try {
            await overwriteFile(
                targetFileURL,                              // URL for the file.
                blob,                                       // File
                { contentType: blob.type, fetch: fetch }    // mimetype if known, fetch from the authenticated session
            );
        } catch (error) {
        }
};

export async function getFriends(webId: string) {
  let dataset = await getSolidDataset(webId);
  let aux= getThing(dataset,webId) as Thing;
  let friends= getUrlAll(aux, FOAF.knows);

  const list: ISolidUser[] = []
  for (let id of friends) {
    const friend = await getFriendData(id)
    if (friend)
      list.push(friend)
  }

  return list;
}


export async function addFriend(webId: string,friend:string) {
  let dataset = await getSolidDataset(webId);
  let friends= getThing(dataset,webId) as Thing;
  
  friends = buildThing(friends).addUrl(FOAF.knows, friend).build();
  
  dataset = setThing(dataset, friends);
  
  await saveSolidDatasetAt(webId, dataset, { fetch });

  setPerms(webId,friend,true);
}

export async function deleteFriend(webId: string,friend:string) {
  let dataset = await getSolidDataset(webId);
  let friends= getThing(dataset,webId) as Thing;
  
  friends = buildThing(friends).removeUrl(FOAF.knows, friend).build();
  
  dataset = setThing(dataset, friends);
  
  await saveSolidDatasetAt(webId, dataset, { fetch });

  setPerms(webId,friend,false);
}

async function setPerms(webId: string, friend: string, mode: boolean) {
  await checkIfFriendsFile(webId);
  let profileDocumentURI = webId?.split("profile")[0];
  let targetFileURL = profileDocumentURI + 'public/LoMap/';

  
  
  const myDatasetWithAcl = await getSolidDatasetWithAcl(targetFileURL,{fetch :fetch});
  // Obtain the SolidDataset's own ACL, if available,
  // or initialise a new one, if possible:
  let resourceAcl;
  if (!hasResourceAcl(myDatasetWithAcl!)) {
    if (!hasAccessibleAcl(myDatasetWithAcl!)) {
      throw new Error(
        "The current user does not have permission to change access rights to this Resource."
      );
    }
    if (!hasFallbackAcl(myDatasetWithAcl)) {
      throw new Error(
        "The current user does not have permission to see who currently has access to this Resource."
      );
      // Alternatively, initialise a new empty ACL as follows,
      // but be aware that if you do not give someone Control access,
      // **nobody will ever be able to change Access permissions in the future**:
      // resourceAcl = createAcl(myDatasetWithAcl);
    }
    resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
  } else {
    resourceAcl = getResourceAcl(myDatasetWithAcl);
  }
  
  // Give someone Control access to the given Resource:
  const updatedAcl = setAgentResourceAccess(
    resourceAcl,
    friend,
    { read: mode, append: mode, write: mode, control: false },
  );
  
  // Now save the ACL:
  await saveAclFor(myDatasetWithAcl, updatedAcl,{fetch :fetch});
    
}

export async function checkIfFriendsFile(webId?: string) {
        let profileDocumentURI = webId?.split("profile")[0];
        let targetFileURL = profileDocumentURI + 'public/LoMap/Markers.json';

        const blob = new Blob(undefined, {
            type: "application/json;charset=utf-8"
        });
        try {
            await overwriteFile(
                targetFileURL,                              // URL for the file.
                blob,                                       // File
                { contentType: blob.type, fetch: fetch }    // mimetype if known, fetch from the authenticated session
            );
        } catch (error) {
        }
};


export async function readMarkerFromFriends(webId?: string) {
    let markers: IMarker[] = []
    let friends= await getFriends(webId!);
    friends.forEach(async (friend) =>{
        let profileDocumentURI = friend.webId.split("profile")[0];
    try {
      await getFile(
        profileDocumentURI + 'public/LoMap/Markers.json',
        { fetch: fetch },
      ).then(async () => {
        const file = await getFile(
          profileDocumentURI + 'public/LoMap/Markers.json',
          { fetch: fetch },
        )
        let aux = JSON.parse(await file.text());
        aux.forEach((marker:any) => {
            markers.push(marker);
        });
      }).catch(async (err: any) => {
      });} catch (err) {}
    });

    
    return markers;
  };

  export async function saveMarkerToPublic(marker:IMarker,webId?: string) {
    let markers: IMarker[] = []
    let profileDocumentURI = webId?.split("profile")[0];
    try {
      const file =await getFile(
        profileDocumentURI + 'public/LoMap/Markers.json',
        { fetch: fetch },
      )
      markers = JSON.parse(await file.text());
      if(markers.length === undefined){
        let aux: IMarker[] = [];
        aux.push(marker);
        markers=aux;
      }else{
        let exists=false;
        markers.forEach((m) => {
        if(m.id===marker.id){
          exists=true;
        }
        })
        if(!exists){
          markers.push(marker);
        }
      }
      let targetFileURL = profileDocumentURI + 'public/LoMap/Markers.json';
      let str = JSON.stringify(markers);
      const bytes = new TextEncoder().encode(str);
      const blob = new Blob([bytes], {
              type: "application/json;charset=utf-8"
      });
      await overwriteFile(
          targetFileURL,                              // URL for the file.
          blob,                                       // File
          { contentType: blob.type, fetch: fetch }    // mimetype if known, fetch from the authenticated session
      );
    } catch (err) {
    }
  };
  






