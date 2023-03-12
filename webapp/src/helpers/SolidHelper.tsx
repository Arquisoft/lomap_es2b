
import { getSolidDataset, getStringNoLocale, Thing, getThing, saveFileInContainer } from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { IMarker } from "../types/IMarker";
import { getFile, overwriteFile, getContentType, getSourceUrl, } from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";


async function getProfile(webId: string) {
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
        const file = await getFile(
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
            const createFile = await saveFileInContainer(
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
            const savedFile = await overwriteFile(
                targetFileURL,                              // URL for the file.
                blob,                                       // File
                { contentType: blob.type, fetch: fetch }    // mimetype if known, fetch from the authenticated session
            );
        } catch (error) {
            console.error(error);
        }
    }

};





