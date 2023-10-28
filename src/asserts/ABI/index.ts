import ERC20Token from './ERC20Token.json'

const ABI_LIST = {
  ERC20Token,
}

export type ABI_KEY_LIST = keyof typeof ABI_LIST

export function getABI(name: ABI_KEY_LIST) {
  return ABI_LIST[name]
}
