import { TEndpoint } from '@services/endponits'
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'

type TOptionalParams = { isFormData: boolean }
type TRequiredParams = Required<
  Pick<TConfig, 'method' | 'url' | 'responseType'>
>
type TEndpointParams = TRequiredParams & TOptionalParams
type TRequest = (
  endpoint: TEndpoint,
  payload?: Record<string, unknown>,
  signal?: AbortSignal,
  dynamic?: string
) => Promise<unknown>
export type TApi = () => [
  onRequest: TRequest,
  response: unknown,
  loading: boolean,
  error: unknown
]
export type TInitials = {
  loading: boolean
  response: unknown
  error: unknown
  token: string
  onRequest: TRequest
  result: AxiosResponse<unknown, unknown>
}
export type TInstance = AxiosInstance
export type TConfig = AxiosRequestConfig
export type TError = Partial<AxiosError<unknown, unknown>, unknown>
export type TEndpoints = Record<TEndpoint, TEndpointParams>
