import gql from "graphql-tag";
import { client } from "@/apollo/client";
import { useQuery } from "@apollo/client";
import { useMemo } from 'react'

export const GET_TOKEN_PRICE = gql`
  query topPools {
    pools(orderBy: volumeUSD, orderDirection: desc, first: 10){
      id
      volumeUSD
      liquidity
      totalValueLockedUSD
      
    }
  }
`

interface pools {
  datas: {
    id: string
    volumeUSD: number
    liquidity: number
    totalValueLockedUSD: number
  }[]
}

export function topPools(): {
  loading: boolean
  error: boolean
  topPool: string[] | undefined
} {
  const { loading, error, data} = useQuery<pools>(GET_TOKEN_PRICE, { client: client})

  const formattedData = useMemo(() => {
    if(data) {
      return data.datas.map(e => e.id)
    } else {
      return undefined
    }
  }, [data])

  return {
    loading: loading,
    error: Boolean(error),
    topPool: formattedData
  }
}

