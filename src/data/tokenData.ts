import { client } from '@/apollo/client'
import gql from 'graphql-tag'
import { TokenData } from '@/state/tokens/tokens'
import { useQuery } from '@apollo/client'
import { get2DayChange, getPercentChange } from '@/utils/data'
import { useBlocksFromTimestamps } from '@/state/appication/hooks'
import { useDeltaTimestamps } from '@/utils/queries'
import { useEthPrices } from '@/hooks/useEthPrices'
import { formatTokenSymbol, formatTokenName } from '@/utils/tokens'


export const TOKEN_BULK = (block: number | undefined, tokens: string[]) => {
  
  let tokenString = `[`
  tokens?.map((address) => {
    return (tokenString += `"${address}",`)
  })
  tokenString += ']'

  const queryString = `
    query tokens {
      tokens(where: {id_in: ${tokenString}},` +
    (block ? `block: {number: ${block}} ,` : ``) +
    ` orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {
        id
        symbol
        name
        derivedETH
        volumeUSD
        volume
        txCount
        totalValueLocked
        feesUSD
        totalValueLockedUSD
      }
    }
  `

  return gql(queryString)
}

interface TokenFields {
  id: string
  symbol: string
  name: string
  derivedETH: string
  volumeUSD: string
  volume: string
  feesUSD: string
  txCount: string
  totalValueLocked: string
  totalValueLockedUSD: string
}

interface TokenDataResponse {
  tokens: TokenFields[]
  bundles: {
    ethPriceUSD: string
  }[]
}


export function  useFetchedTokenDatas(tokenAddresses: string[]): {
  loading: boolean
  error: boolean
  data:
  | {
    [address: string]: TokenData
  }
  | undefined
} {

  const [t24, t48, tWeek] = useDeltaTimestamps()

  const { blocks, error: blockError } = useBlocksFromTimestamps([t24, t48, tWeek])
  // console.log(blocks)
  const [block24, block48, blockWeek] = blocks ?? []
  const ethPrices = useEthPrices()

  const { loading, error, data } = useQuery<TokenDataResponse>(TOKEN_BULK(undefined, tokenAddresses), { client: client })
  // console.log(data)
  const { loading: loading24, error: error24, data: data24 } = useQuery<TokenDataResponse>(
    TOKEN_BULK(parseInt(block24?.number), tokenAddresses),
    {
      client: client,
    }
  )

  const { loading: loading48, error: error48, data: data48 } = useQuery<TokenDataResponse>(
    TOKEN_BULK(parseInt(block48?.number), tokenAddresses),
    {
      client: client,
    }
  )
  
  const { loading: loadingWeek, error: errorWeek, data: dataWeek } = useQuery<TokenDataResponse>(
    TOKEN_BULK(parseInt(blockWeek?.number), tokenAddresses),
    {
      client: client,
    }
  )
  
  const anyError = Boolean(error || error24 || error48 || blockError || errorWeek)
  const anyLoading = Boolean(loading || loading24 || loading48 || loadingWeek || !blocks)

  if (!ethPrices) {
    return {
      loading: true,
      error: false,
      data: undefined,
    }
  }

  // return early if not all data yet
  if (anyError || anyLoading) {
    return {
      loading: anyLoading,
      error: anyError,
      data: undefined,
    }
  }

  const parsed = data?.tokens
    ? data.tokens.reduce((accum: { [address: string]: TokenFields }, poolData) => {
      accum[poolData.id] = poolData
      return accum
    }, {})
    : {}
    console.log(parsed)
  const parsed24 = data24?.tokens
    ? data24.tokens.reduce((accum: { [address: string]: TokenFields }, poolData) => {
      accum[poolData.id] = poolData
      return accum
    }, {})
    : {}
  const parsed48 = data48?.tokens
    ? data48.tokens.reduce((accum: { [address: string]: TokenFields }, poolData) => {
      accum[poolData.id] = poolData
      return accum
    }, {})
    : {}
  const parsedWeek = dataWeek?.tokens
    ? dataWeek.tokens.reduce((accum: { [address: string]: TokenFields }, poolData) => {
      accum[poolData.id] = poolData
      return accum
    }, {})
    : {}

  const formatted = tokenAddresses.reduce((accum: { [address: string]: TokenData }, address) => {

    const current: TokenFields | undefined = parsed[address]
    const oneDay: TokenFields | undefined = parsed24[address]
    const twoDay: TokenFields | undefined = parsed48[address]
    const week: TokenFields | undefined = parsedWeek[address]

    const [volumeUSD, volumeUSDChange] =
      current && oneDay && twoDay
        ? get2DayChange(current.volumeUSD, oneDay.volumeUSD, twoDay.volumeUSD)
        : current
          ? [parseFloat(current.volumeUSD), 0]
          : [0, 0]

    const volumeUSDWeek =
      current && week
        ? parseFloat(current.volumeUSD) - parseFloat(week.volumeUSD)
        : current
          ? parseFloat(current.volumeUSD)
          : 0
    const tvlUSD = current ? parseFloat(current.totalValueLockedUSD) : 0
    const tvlUSDChange = getPercentChange(current?.totalValueLockedUSD, oneDay?.totalValueLockedUSD)
    const tvlToken = current ? parseFloat(current.totalValueLocked) : 0
    const priceUSD = current ? parseFloat(current.derivedETH) * ethPrices.current : 0
    const priceUSDOneDay = oneDay ? parseFloat(oneDay.derivedETH) * ethPrices.oneDay : 0
    const priceUSDWeek = week ? parseFloat(week.derivedETH) * ethPrices.week : 0
    const priceUSDChange =
      priceUSD && priceUSDOneDay ? getPercentChange(priceUSD.toString(), priceUSDOneDay.toString()) : 0

    const priceUSDChangeWeek =
      priceUSD && priceUSDWeek ? getPercentChange(priceUSD.toString(), priceUSDWeek.toString()) : 0
    const txCount =
      current && oneDay
        ? parseFloat(current.txCount) - parseFloat(oneDay.txCount)
        : current
          ? parseFloat(current.txCount)
          : 0
    const feesUSD =
      current && oneDay
        ? parseFloat(current.feesUSD) - parseFloat(oneDay.feesUSD)
        : current
          ? parseFloat(current.feesUSD)
          : 0

    accum[address] = {
      exists: !!current,
      address,
      name: current ? formatTokenName(address, current.name) : '',
      symbol: current ? formatTokenSymbol(address, current.symbol) : '',
      volumeUSD,
      volumeUSDChange,
      volumeUSDWeek,
      txCount,
      tvlUSD,
      feesUSD,
      tvlUSDChange,
      tvlToken,
      priceUSD,
      priceUSDChange,
      priceUSDChangeWeek,
    }

    return accum
  }, {})

  return {
    loading: anyLoading,
    error: anyError,
    data: formatted,
  }
}
