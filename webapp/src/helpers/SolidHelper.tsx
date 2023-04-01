
import { getSolidDataset,universalAccess,getStringNoLocale,getUrl,saveSolidDatasetAt, Thing, getThing,setThing, saveFileInContainer,buildThing, getUrlAll } from "@inrupt/solid-client";
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";
import { IMarker } from "../types/IMarker";
import { getFile, overwriteFile} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { getFriendData } from "./friendHelper";
import { ISolidUser } from "../types/ISolidUser";



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

export async function getImageFromPod(webId?: string) {
  if (webId === "" || webId === undefined) {
    return "Not Found"
  }
  let image = getUrl(await getProfile(webId),VCARD.hasPhoto);
  if (image == null) {
    image = "Not image Found"
  }
  return image;
}

export async function readMarkerFromPod(webId?: string) {
  let markers: IMarker[] = []
  let profileDocumentURI = webId?.split("profile")[0];
  try {
    await getFile(
      profileDocumentURI + 'private/Markers.json',
      { fetch: fetch },
    ).then(async () => {
      const file = await getFile(
        profileDocumentURI + 'private/Markers.json',
        { fetch: fetch },
      )
      markers = JSON.parse(await file.text());
    }).catch(async (err: any) => {
      const blob = new Blob([], {
        type: "application/json;charset=utf-8"
      })
      await saveFileInContainer(
        profileDocumentURI + 'private/',
        blob,
        { slug: "Markers.json", contentType: blob.type, fetch: fetch }
      );
    });
  } catch (err) {
  }
  return markers;
};

export async function saveMarkerToPod(markers: IMarker[], webId?: string) { 
  if (markers.length > 0) {
    let profileDocumentURI = webId?.split("profile")[0];
    let targetFileURL = profileDocumentURI + 'private/Markers.json';
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
      console.error(error);
    }
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
  
  saveSolidDatasetAt(webId, dataset, { fetch: fetch });

  setPerms(webId,friend,true);
}

export async function deleteFriend(webId: string,friend:string) {
  let dataset = await getSolidDataset(webId);
  let friends= getThing(dataset,webId) as Thing;
  
  friends = buildThing(friends).removeUrl(FOAF.knows, friend).build();
  
  dataset = setThing(dataset, friends);
  
  saveSolidDatasetAt(webId, dataset, { fetch: fetch });

  setPerms(webId,friend,false);
}

function setPerms(webId: string, friend: string, mode: boolean) {
  let profileDocumentURI = webId?.split("profile")[0];
  let targetFileURL = profileDocumentURI + 'private/prueba.json';

  universalAccess.getAgentAccessAll(
    targetFileURL, // resource
    { fetch: fetch }                // fetch function from authenticated session
  )
  .then((accessByAgent) => {
    // => accessByAgent is an object with Agent WebIDs as keys,
    //    and their associated access object {read: <boolean>, ... } as values.
    for (const [agent, agentAccess] of Object.entries(accessByAgent!)) {
      logAccessInfo(agent, agentAccess, targetFileURL);
    }
  });
  universalAccess.setAgentAccess(
    targetFileURL, // resource
    friend,
    { read: mode, write: false },    // Access object
    { fetch: fetch }                 // fetch function from authenticated session
  );
}

function logAccessInfo(agent:any, agentAccess:any, resource:any) {
  console.log(`For resource: ${resource}`);
  if (agentAccess === null) {
    console.log(`Could not load ${agent}'s access details.`);
  } else {
    console.log(`${agent}'s Access: ${JSON.stringify(agentAccess)}`);
  }
}

