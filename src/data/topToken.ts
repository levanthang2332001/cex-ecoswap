import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { client } from '@/apollo/client'

export const TOP_TOKENS = gql`
  query topPools {
    tokens(first: 10, orderBy: volumeUSD, orderDirection: desc){
      id
      name
      volumeUSD
    }
  }
`
interface TopTokenResponse {
  tokens: {
    id: string
    name: string
    volumeUSD: number
  }[]
}

export function useTopTokenAddresses(): {
  loading: boolean
  error: boolean
  addresses: string[] | undefined
} {

  const { loading, error, data} = useQuery<TopTokenResponse>(TOP_TOKENS, { client: client})
  
  // console.log(data)

  const formattedData = useMemo(() => {
    if(data) {
      return data.tokens.map(e => e.name)
    } else {
      return undefined
    }
  }, [data])

  return {
    loading: loading,
    error: Boolean(error),
    addresses: formattedData
  }
}