import { BigNumberish, ethers } from 'ethers'
import BigNumber from 'bignumber.js'

export function bigNumberify(n: BigNumberish | bigint) {
  try {
    return new BigNumber(String(n))
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('bigNumberify error', e)
    return new BigNumber(0)
  }
}

export function expandDecimals(n: BigNumberish, decimals: number): BigNumber {
  return bigNumberify(n).multipliedBy(bigNumberify(10).pow(decimals))
}

export const trimZeroDecimals = (amount: string) => {
  if (parseFloat(amount) === parseInt(amount)) {
    return parseInt(amount).toString()
  }
  return parseFloat(amount).toString()
}

export const limitDecimals = (amount: BigNumberish, maxDecimals?: number) => {
  let amountStr = amount.toString()
  if (maxDecimals === undefined) {
    return amountStr
  }
  if (maxDecimals === 0) {
    return amountStr.split('.')[0]
  }
  const dotIndex = amountStr.indexOf('.')
  if (dotIndex !== -1) {
    const decimals = amountStr.length - dotIndex - 1
    if (decimals > maxDecimals) {
      amountStr = amountStr.substr(0, amountStr.length - (decimals - maxDecimals))
    }
  }
  return amountStr
}

export const padDecimals = (amount: BigNumberish, minDecimals: number) => {
  let amountStr = amount.toString()
  const dotIndex = amountStr.indexOf('.')
  if (dotIndex !== -1) {
    const decimals = amountStr.length - dotIndex - 1
    if (decimals < minDecimals) {
      amountStr = amountStr.padEnd(amountStr.length + (minDecimals - decimals), '0')
    }
  } else {
    amountStr = amountStr + '.0000'
  }
  return amountStr
}

export const formatAmount = (
  amount: BigNumberish | undefined,
  tokenDecimals: number,
  displayDecimals?: number,
  useCommas?: boolean,
  defaultValue?: string
) => {
  if (!defaultValue) {
    defaultValue = '...'
  }
  if (amount === undefined || amount.toString().length === 0) {
    return defaultValue
  }
  if (displayDecimals === undefined) {
    displayDecimals = 4
  }
  let amountStr = ethers.formatUnits(amount, tokenDecimals)
  amountStr = limitDecimals(amountStr, displayDecimals)
  if (displayDecimals !== 0) {
    amountStr = padDecimals(amountStr, displayDecimals)
  }
  if (useCommas) {
    return numberWithCommas(amountStr)
  }
  return amountStr
}

export function formatAmountWithComma(
  amount: BigNumberish | undefined,
  tokenDecimals: number,
  groupSeparator = ',',
  displayDecimals?: number,
  useCommas?: boolean,
  defaultValue?: string
) {
  const amountStr = formatAmount(amount, tokenDecimals, displayDecimals, useCommas, defaultValue)
  if (amountStr === '...') {
    return amountStr
  }
  return BigNumber(amountStr).toFormat({ groupSeparator: groupSeparator, groupSize: 3, decimalSeparator: '.' })
}

export const formatKeyAmount = (map: any, key: string, tokenDecimals: number, displayDecimals: number, useCommas?: boolean) => {
  if (!map || !map[key]) {
    return '...'
  }

  return formatAmount(map[key], tokenDecimals, displayDecimals, useCommas)
}

export const formatArrayAmount = (arr: any[], index: number, tokenDecimals: number, displayDecimals?: number, useCommas?: boolean) => {
  if (!arr || !arr[index]) {
    return '...'
  }

  return formatAmount(arr[index], tokenDecimals, displayDecimals, useCommas)
}

export const formatAmountFree = (amount: BigNumberish, tokenDecimals: number, displayDecimals?: number) => {
  if (!amount) {
    return '...'
  }
  let amountStr = ethers.formatUnits(amount, tokenDecimals)
  amountStr = limitDecimals(amountStr, displayDecimals)
  return trimZeroDecimals(amountStr)
}

export const parseValue = (value: string, tokenDecimals: number) => {
  const pValue = parseFloat(value)

  if (isNaN(pValue)) {
    return undefined
  }

  value = limitDecimals(value, tokenDecimals)
  const amount = ethers.parseUnits(value, tokenDecimals)
  return bigNumberify(amount)
}

export function numberWithCommas(x: BigNumberish) {
  if (!x) {
    return '...'
  }

  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function formatNumberToDisplay(amount: BigNumberish | undefined, decimal: number) {
  if (!amount) {
    return '...'
  }
  const number = trimZeroDecimals(bigNumberify(amount).toFixed(decimal, BigNumber.ROUND_DOWN))
  return bigNumberify(number).toFormat({ groupSize: 3, groupSeparator: ',', decimalSeparator: '.' })
}

export function easyNumberFormatter(num: number, digits: number) {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return { number: (num / si[i].value).toFixed(digits).replace(rx, '$1'), unit: si[i].symbol }
}

export const pow8 = new BigNumber(10).pow(8)
export const pow10 = new BigNumber(10).pow(10)
export const pow18 = new BigNumber(10).pow(18)
export const powNum = (n: number) => new BigNumber(10).pow(n)

export function formatStringNumWithCommon(amount: string, groupSeparator = ',', useCommas?: boolean) {
  if (useCommas) {
    return numberWithCommas(amount)
  }
  return BigNumber(amount).toFormat({ groupSeparator: groupSeparator, groupSize: 3, decimalSeparator: '.' })
}
