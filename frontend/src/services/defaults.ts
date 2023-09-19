import { TConfig, TError } from '@@types'

export const InitialConfig: TConfig = {
  baseURL: import.meta.env.ENV_BASE_URL,
  timeout: parseInt(import.meta.env.ENV_TIMEOUT || '0'),
  headers: {
    Accept: 'application/json'
  }
}

export const InitialError: TError = {
  response: {
    data: {
      status: 'fail',
      code: '500',
      message: 'There is no connection between you and server now'
    }
  }
}

export const PayloadType = {
  default: 'application/json;charset=UTF-8',
  formData: 'multipart/form-data;charset=UTF-8'
}
