import { MsgDepositDeployment } from '@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/deploymentmsg'
import {
  getAkashTypeRegistry,
  getTypeUrl
} from '@akashnetwork/akashjs/build/stargate/index'
import useHelp from '@contexts/Help/useHelp'
import { KeplrWallet, initialState } from '@contexts/Keplr/context'
import useKeplr from '@contexts/Keplr/useKeplr'
import { Registry } from '@cosmjs/proto-signing'
import {
  SigningStargateClient,
  assertIsDeliverTxSuccess
} from '@cosmjs/stargate'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

const useWallet = () => {
  const { keplr, setKeplr } = useKeplr()
  const { setHelp } = useHelp()
  const isConnected = keplr.isConnected

  const onHandleDisconnect = useCallback(() => {
    if (isConnected) {
      setKeplr(initialState)
      window.localStorage.setItem(
        import.meta.env.ENV_STORAGE_KEY,
        JSON.stringify(initialState)
      )
    }
  }, [isConnected, setKeplr])

  const onHandleConnect = useCallback(() => {
    if (!window.keplr) {
      setHelp(true)
      // Keplr is not installed
      return
    }

    onGetKeplr()
      .then((response: KeplrWallet) => {
        setKeplr(response)
        window.localStorage.setItem(
          import.meta.env.ENV_STORAGE_KEY,
          JSON.stringify(response)
        )
      })
      .catch(() => {
        onHandleDisconnect()
      })
  }, [onHandleDisconnect, setHelp, setKeplr])

  useEffect(() => {
    if (isConnected) {
      onHandleConnect()
    }
  }, [isConnected, onHandleConnect])

  const onHandlePayment = async (
    amount: number,
    denom: string,
    address: string,
    dseq: string
  ) => {
    if (!window.keplr || !keplr.client) {
      setHelp(true)
      // Keplr is not installed or wallet is not connected
      return
    }

    const finalFee = {
      amount: [
        {
          denom: denom,
          amount: import.meta.env.ENV_PAYMENT_FEE
        }
      ],
      gas: import.meta.env.ENV_PAYMENT_GAS
    }

    const message = {
      // typeUrl: `akash.deployment.${
      //   import.meta.env.ENV_NETWORK_VERSION
      // }.MsgDepositDeployment`,
      typeUrl: getTypeUrl(MsgDepositDeployment),
      value: {
        id: {
          owner: address,
          dseq: parseInt(dseq)
        },
        amount: {
          denom: denom,
          amount: amount.toString()
        },
        depositor: keplr.accounts[0].address || address
      }
    }

    try {
      const result = await keplr.client.signAndBroadcast(
        keplr.accounts[0].address,
        [message],
        finalFee,
        ''
      )

      assertIsDeliverTxSuccess(result)

      if (result.code !== undefined && result.code !== 0) {
        toast.error('Transaction failed!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      } else {
        toast.success(
          `Transaction succeeded!\nHash: ${result.transactionHash}`,
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          }
        )
      }
    } catch (error) {
      toast.error("You can't afford this transaction!", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
  }

  return {
    isConnected,
    pay: onHandlePayment,
    connect: onHandleConnect,
    disconnect: onHandleDisconnect
  }
}

const onGetKeplr = async (): Promise<KeplrWallet> => {
  if (!window.keplr) {
    return initialState
  }

  const chainId = import.meta.env.ENV_CHAIN_ID
  await window.keplr.enable(chainId)
  const offlineSigner = window.keplr.getOfflineSigner(chainId)
  const accounts = await offlineSigner.getAccounts()

  const localRegistry = new Registry(getAkashTypeRegistry())
  const client = await SigningStargateClient.connectWithSigner(
    import.meta.env.ENV_RPC_NODE,
    offlineSigner,
    { registry: localRegistry }
  )

  return {
    accounts: [...accounts],
    offlineSigner: offlineSigner,
    client: client,
    isConnected: true
  }
}

export default useWallet
