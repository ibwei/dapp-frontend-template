import { SWRMulticallResponse } from 'types'

export function formatMulticallResponse<T>(addressList: string[], muticallResponse: SWRMulticallResponse<T>[]) {
  return addressList.map((address, index) => {
    const response = muticallResponse[index]
    return { address, ...response }
  })
}
