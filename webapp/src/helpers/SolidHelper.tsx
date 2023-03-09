
import { getSolidDataset,getStringNoLocale,Thing,getThing} from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";
import {MarkerType} from "../types/Marker";
import { getFile, overwriteFile, getContentType, getSourceUrl, } from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";

async function getProfile(webId: string){
    let profileDocumentURI = webId.split("#")[0]; 
    let myDataset = await getSolidDataset(profileDocumentURI); 
    return getThing(myDataset, webId) as Thing;
}
export async function getNameFromPod(webId: string) {
    if (webId === "" || webId === undefined){
        return "Not Found"
    }    
    let name=getStringNoLocale(await getProfile(webId) , FOAF.name) ;
    if(name== null){
        name="Not Name Found"
    }
    return name;
}


export async function readMarkerFromPod(webId?:string ) {
    let markers : MarkerType[] = []
    let profileDocumentURI = webId?.split("profile")[0];
    try {
        const file = await getFile(
            profileDocumentURI+'private/Markers.json',
            { fetch: fetch },
        );
        console.log(`Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`);
        markers=JSON.parse(await file.text());
      } catch (err) {
        console.log(err);
      }
    return markers;
};

export async function saveMarkerToPod(markers:MarkerType[], webId?:string) {
    
    let profileDocumentURI = webId?.split("profile")[0];
    let targetFileURL = profileDocumentURI+'private/Markers.json';
    let str=JSON.stringify(markers);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8"
    });
    try {
        const savedFile = await overwriteFile(  
          targetFileURL,                              // URL for the file.
          blob,                                       // File
          { contentType: blob.type, fetch: fetch }    // mimetype if known, fetch from the authenticated session
        );
        console.log(`File saved at ${getSourceUrl(savedFile)}`);
      } catch (error) {
        console.error(error);
    }
};

    



