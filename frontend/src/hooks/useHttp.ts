import { TApi, TInitials, TInstance } from '@@types'
import { InitialConfig, PayloadType } from '@services/defaults'
import Endpoints from '@services/endponits'
import axios from 'axios'
import { useCallback, useState } from 'react'

const http: TInstance = axios.create(InitialConfig)
let responseInterceptor: number | null = null
let requestInterceptor: number | null = null

const useHttp: TApi = () => {
  const [loading, setLoading] = useState<TInitials['loading']>(true)
  const [response, setResponse] = useState<TInitials['response']>(undefined)
  const [error, setError] = useState<TInitials['error']>(undefined)

  const onRejectInterceptor = useCallback(
    (type: 'response' | 'request', interceptor: number | null) => {
      if (!!interceptor || interceptor === 0) {
        http.interceptors[type].eject(interceptor)
      }
    },
    []
  )

  onRejectInterceptor('request', requestInterceptor)
  onRejectInterceptor('response', responseInterceptor)

  requestInterceptor = http.interceptors.request.use(
    httpConfig => {
      return httpConfig
    },
    (httpError: unknown) => {
      return Promise.reject(httpError)
    }
  )

  responseInterceptor = http.interceptors.response.use(
    httpResponse => {
      return httpResponse
    },
    httpError => {
      if (httpError && httpError.response) {
        if (httpError.response.data.message) {
          return Promise.reject(httpError)
        }
      }
      return Promise.reject(httpError)
    }
  )

  const onRequest: TInitials['onRequest'] = useCallback(
    async (endpoint, payload = {}, signal, dynamic = '') => {
      setLoading(true)
      const method = Endpoints[endpoint].method
      const url = dynamic
        ? `${Endpoints[endpoint].url}/${dynamic}`
        : Endpoints[endpoint].url
      const responseType = Endpoints[endpoint].responseType
      const isFormData = Endpoints[endpoint].isFormData
      let payloadData

      if (isFormData) {
        payloadData = new FormData()
        for (const key in payload) {
          payloadData.append(key, payload[key] as Blob | string)
        }
      } else {
        payloadData = { ...payload }
      }

      http.defaults.headers.common['Content-Type'] =
        PayloadType[isFormData ? 'formData' : 'default']
      http.defaults.responseType = responseType

      const data =
        method.toLowerCase() === 'get' || method.toLowerCase() === 'delete'
          ? { params: payloadData }
          : { data: payloadData }

      http
        .request({
          method,
          url,
          signal,
          ...data
        })
        .then(result => {
          setResponse(result.data)
          setLoading(false)
        })
        .catch(error => {
          if (error.code !== 'ERR_CANCELED') {
            setError(error)
            setLoading(false)
          }
        })
    },
    []
  )

  return [onRequest, response, loading, error]
}

export default useHttp
