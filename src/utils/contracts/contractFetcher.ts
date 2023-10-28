import { Web3Provider } from '@ethersproject/providers'
import { readContract, readContracts } from '@wagmi/core'
import { ethers } from 'ethers'
import { getFallbackProvider } from '../rpc'

/**
 * @param string|address|address[] contractAddress 
 * when methods is a string, it will be called directly, when methods is an array, it will be call the method which type must be string of every contract in the array
 * @example
 ```js
    const {data} = useSWR([`AlpSwap:getAlpPric${isConnected}`,chainId,
      [contractAddress1,contractAddress2,contractAddress3],
      'balanceOf', // must be string   
    ],{fetcher: contractFetcher(getABI('ERC20TOKEN')),}
  )
  ```
 * @param string|{methods:string,args?:any[]}[] methods 
 * contract method name, when method is a string, it will be called directly
 * when method is an array, it will be called as multicall
 * @example 
 ```js
  const { data: [slpPrice, coolingDuration, lastMintedTimestamp]} = useSWR(
    [`AlpSwap:getAlpPric${isConnected}`,chainId,
    contractAddress,
    [{ method: 'slpPrice' }, { method: 'coolingDuration' }, { method: 'lastMintedTimestamp', args: [account] }]], 
    // use single call just set method as string,
    { fetcher: contractFetcher(getABI('AlpManagerFacet')),}
  )
  ```
 */
export const contractFetcher =
  <T>(contractInfo: any, additionalArgs?: any[]) =>
  (...args: any[]): Promise<T> => {
    // eslint-disable-next-line
    const [id, chainId, contractAddreeOrMethod, methodNameOrList, ...rest] = args[0]
    const params: any[] = rest ?? []
    const methods = ethers.isAddress(contractAddreeOrMethod) || Array.isArray(contractAddreeOrMethod) ? methodNameOrList : contractAddreeOrMethod

    const contractCall = getContractCall({
      chainId,
      contractInfo,
      contractAddreeOrMethod,
      methods,
      params,
      additionalArgs,
    })

    let shouldCallFallback = true

    //@ts-ignore
    const handleFallback = async (resolve, reject, error) => {
      if (!shouldCallFallback) {
        return
      }
      // prevent fallback from being called twice
      shouldCallFallback = false

      const fallbackProvider = getFallbackProvider(chainId)
      if (!fallbackProvider) {
        reject(error)
        return
      }

      // eslint-disable-next-line no-console
      console.info('using fallbackProvider for', methods)
      const fallbackContractCall = getContractCall({
        chainId,
        contractInfo,
        contractAddreeOrMethod,
        methods,
        params,
        additionalArgs,
      })

      fallbackContractCall
        .then((result: any) => resolve(result))
        .catch((e: any) => {
          // eslint-disable-next-line no-console
          console.error('fallback fetcher error', id, methods, e)
          reject(e)
        })
    }

    return new Promise(async (resolve, reject) => {
      contractCall
        .then((result: any) => {
          shouldCallFallback = false
          resolve(result)
        })
        .catch((e: any) => {
          // eslint-disable-next-line no-console
          console.error('fetcher error', id, methods, e)
          handleFallback(resolve, reject, e)
        })

      // fail retry
      setTimeout(() => {
        handleFallback(resolve, reject, 'contractCall timeout')
      }, 2000)
    })
  }

//@ts-ignore
function getContractCall({ chainId, contractInfo, contractAddreeOrMethod, methods, params, additionalArgs }) {
  // call single contract
  const finalParams: [Iterable<any>[]] = additionalArgs ? params.concat(additionalArgs) : params
  if (ethers.isAddress(contractAddreeOrMethod)) {
    const address = contractAddreeOrMethod as any
    if (!Array.isArray(methods)) {
      const SingleCall: any =
        finalParams.length > 0
          ? {
              address: address,
              abi: contractInfo,
              functionName: methods,
              args: finalParams,
              chainId,
            }
          : {
              address: address,
              abi: contractInfo,
              functionName: methods,
              chainId,
            }

      // return contract.read[method](...finalParams)
      // console.log('call single contract with single methods', SingleCall)

      return readContract(SingleCall)
    }

    const contractCalls = methods.map((m: { method: string; args?: any[] }) => {
      return m.args
        ? {
            address,
            abi: contractInfo,
            functionName: m.method,
            args: m.args,
            chainId,
          }
        : {
            address,
            abi: contractInfo,
            functionName: m.method,
            chainId,
          }
    })

    console.log('call single contract with multi methods', contractCalls)

    return readContracts({
      contracts: contractCalls,
      allowFailure: false,
    })
  }

  // call multi contract
  if (Array.isArray(contractAddreeOrMethod) && typeof methods === 'string') {
    const contractCalls = contractAddreeOrMethod.map((address: any) => {
      return finalParams.length
        ? {
            address,
            abi: contractInfo,
            functionName: methods,
            args: finalParams,
            chainId,
          }
        : {
            address,
            abi: contractInfo,
            functionName: methods,
            chainId,
          }
    })

    console.log('call multi contract with same method', contractCalls)

    return readContracts({
      contracts: contractCalls,
      allowFailure: false,
    })
  }

  if (!window.ethereum) {
    console.log('no provider')
    return
  }

  const provider: any = new Web3Provider(window.ethereum)
  return provider[contractAddreeOrMethod](methods, ...params)
}
