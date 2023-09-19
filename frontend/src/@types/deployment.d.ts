export type TDeployment = {
  data: {
    notification: boolean
    dseq: string
    balance: {
      amount: string
      denom: string
    }
    transferred: {
      amount: string
      denom: string
    }
    price: {
      amount: string
      denom: string
    }
    settledAt: string
    providerName: string
    resources: {
      count: number
      cpu: string
      memory: string
      storage: string
      network: number
    }
  }[]
  limit: number
  offset: number
  total: number
}
