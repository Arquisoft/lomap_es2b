import { Thing } from '@inrupt/solid-client'
import { IMarker } from './IMarker'
import { ISolidUser } from './ISolidUser'

export interface ISolidManager {
  getProfile: (webId: string) => Promise<Thing>
  readMarkersFromPod: (webId?: string) => Promise<IMarker[]>
  saveMarkersToPod: (markers: IMarker[], webId?: string) => void
  getFriends: (webId: string) => Promise<ISolidUser[]>
  addFriend: (webId: string, friend: string) => Promise<void>
  deleteFriend: (webId: string, friend: string) => Promise<void>
}