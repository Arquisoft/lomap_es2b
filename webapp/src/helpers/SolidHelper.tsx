import { fetch } from "@inrupt/solid-client-authn-browser";
import { getSolidDataset,getStringNoLocale,Thing,getThing} from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";

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