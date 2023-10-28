import { Provider } from '@ethersproject/providers'
import BigNumber from 'bignumber.js'
import { GAS_PRICE_ADJUSTMENT_MAP, MAX_GAS_PRICE_MAP, SuppportedChainId } from 'config/chains'
import { bigNumberify } from '../number/numbers'

export async function setGasPrice(txnOpts: any, provider: Provider, chainId: SuppportedChainId) {
  let maxGasPrice = BigNumber(MAX_GAS_PRICE_MAP[chainId])
  const premium = GAS_PRICE_ADJUSTMENT_MAP[chainId] || bigNumberify(0)

  const gasPrice = await provider.getGasPrice()

  if (maxGasPrice) {
    if (gasPrice.gt(maxGasPrice.toString())) {
      maxGasPrice = new BigNumber(gasPrice.toString())
    }

    const feeData = await provider.getFeeData()

    // the wallet provider might not return maxPriorityFeePerGas in feeData
    // in which case we should fallback to the usual getGasPrice flow handled below
    if (feeData && feeData.maxPriorityFeePerGas) {
      txnOpts.maxFeePerGas = maxGasPrice
      txnOpts.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas.add(premium.toString())
      return
    }
  }

  txnOpts.gasPrice = gasPrice.add(premium.toString())
  return
}

export async function getGasLimit(contract: any, method: any, params = [], value: any): Promise<BigNumber> {
  const defaultValue = bigNumberify(0)

  if (!value) {
    value = defaultValue
  }

  let gasLimit = await contract?.estimateGas[method](...params, { value })

  if (gasLimit.lt(22000)) {
    gasLimit = bigNumberify(22000)
  }

  return gasLimit.mul(11000).div(10000) // add a 10% buffer
}
