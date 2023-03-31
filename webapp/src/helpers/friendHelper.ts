import { getNamedNodeAll } from '@inrupt/solid-client';
import { getStringNoLocale } from '@inrupt/solid-client';
import { ISolidUser } from './../types/ISolidUser';
import { getProfile } from './SolidHelper';
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf';

export const getFriend = async (webId: string) => {
  const user = await getProfile(webId)

  let userPic = undefined
  if (getNamedNodeAll(user, VCARD.hasPhoto) && getNamedNodeAll(user, VCARD.hasPhoto).length > 0)
    userPic = getNamedNodeAll(user, VCARD.hasPhoto)[0].value || undefined

  const friend :ISolidUser = {
    webId: webId,
    name: getStringNoLocale(user, FOAF.name) || undefined,
    profilePic: userPic,
  }
  
  return friend;
}