import { Thing } from "@inrupt/solid-client"
import { ISolidManager } from "../../src/types/ISolidManager"
import { IMarker } from "../../src/types/IMarker"
import { ISolidUser } from "../../src/types/ISolidUser"
import { Category } from "../../src/types/Category"

let markersList: IMarker[] = [
  { id: '1',name: 'marker1', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
  { id: '2',name: 'marker2', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
  { id: '3',name: 'marker3', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
]
let friends: ISolidUser[] = [
  { webId: 'https://user1.solidtest.com' },
  { webId: 'https://user2.solidtest.com' },
  { webId: 'https://user3.solidtest.com' },
]
export const mockSolidHelper: ISolidManager = {
  async getProfile(webId) {
      return {} as Thing
  },
  async readMarkersFromPod(webId) {
    return markersList
  },
  async saveMarkersToPod(markers, webId) {
      markersList = markers
  },
  async getFriends(webId) {
    return friends
  },
  async addFriend(webId: string, friend: string) {
    friends = [...friends, { webId: friend }]
  },
  async deleteFriend(webId, friend) {
    friends = [...friends.filter(f => f.webId !== friend)]
  }
}