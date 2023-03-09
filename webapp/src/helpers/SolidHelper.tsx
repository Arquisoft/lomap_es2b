
import { getSolidDataset,getStringNoLocale,Thing,getThing} from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";
import {MarkerType} from "../types/Marker";
import { getFile, isRawData, getContentType, getSourceUrl, } from "@inrupt/solid-client";
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
    



