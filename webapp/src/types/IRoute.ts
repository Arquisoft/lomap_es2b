import { IMarker } from "./IMarker";

export interface IRoute {
  id: string
  name: string
  description?: string
  time?: number
  points: IMarker[]
  created_at: Date
}