export interface IRestApiResponse {
  success: boolean
  data?: object
  error?: {
    code?: number
    message: string
  }
}