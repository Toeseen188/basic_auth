// auth.types.ts

export interface RegisterSuccessResponse {
  message: string
  statusCode: 201
  access_token?: string
}

export interface RegisterErrorResponse {
  message: string
  statusCode: 401 | 409 | 500
}

export type ResponseType = RegisterSuccessResponse | RegisterErrorResponse
