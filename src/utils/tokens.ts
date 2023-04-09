import { Token } from '@uniswap/sdk-core'


const WETH_ADDRESSES = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }
}

export function formatTokenSymbol(address: string, symbol: string) {
  // dumb catch for matic

  if (WETH_ADDRESSES.includes(address)) {
    return 'ETH'
  }
  return symbol
}

export function formatTokenName(address: string, name: string) {
  // dumb catch for matic

  if (WETH_ADDRESSES.includes(address)) {
    return 'Ether'
  }
  return name
}
