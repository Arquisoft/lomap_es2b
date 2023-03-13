export interface IMarker {
  id: number
  name: string
  address?: string
  lat: number
  lng: number
  date: Date
  images: string[] // Se guardan las URLs
  description?: string
  category: string[]
  comments: string[]
  score: number
}