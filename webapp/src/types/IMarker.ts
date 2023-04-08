import { Category } from "./Category"

export interface IMarker {
  id: string
  name: string
  address?: string
  lat: number
  lng: number
  date: Date
  images: string[] // Se guardan las URLs
  description?: string
  category: Category
  comments: IComment[]
  score?: number
  property: {
    owns: boolean
  } & ({ owns: true, public: boolean } | { owns: false, author: string })
}

export interface IComment {
  author: string
  comment: string
}