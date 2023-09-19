import { TEndpoints } from '@@types'

export type TEndpoint =
  | 'fetchDeployments'
  | 'fetchNotifications'
  | 'addNotifications'
  | 'removeNotifications'
  | 'addTelegram'

const Endpoints: TEndpoints = {
  fetchDeployments: {
    url: 'owner',
    method: 'get',
    responseType: 'json',
    isFormData: false
  },
  fetchNotifications: {
    url: 'subscription',
    method: 'get',
    responseType: 'json',
    isFormData: false
  },
  addNotifications: {
    url: 'initiation',
    method: 'post',
    responseType: 'json',
    isFormData: false
  },
  removeNotifications: {
    url: 'initiation',
    method: 'delete',
    responseType: 'json',
    isFormData: false
  },
  addTelegram: {
    url: 'initiation',
    method: 'post',
    responseType: 'json',
    isFormData: false
  }
}

export default Endpoints
