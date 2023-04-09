import gql from 'graphql-tag'
import { useState, useEffect, useMemo } from 'react'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { client } from '@/apollo/client'
import { splitQuery } from '@/utils/queries'


export const GET_BLOCKS = (timestamps: string[]) => {
  let queryString = 'query blocks {'
  queryString += timestamps.map((timestamp) => {
    return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
      timestamp + 600
    } }) {
        number
      }`
  })
  queryString += '}'
  return gql(queryString)
}

/**
 * for a given array of timestamps, returns block entities
 * @param timestamps
 */
export function useBlocksFromTimestamps(
  timestamps: number[],
  blockClientOverride?: ApolloClient<NormalizedCacheObject>
): {
  blocks:
    | {
        timestamp: string
        number: any
      }[]
    | undefined
  error: boolean
} {
  const [blocks, setBlocks] = useState<any>()
  const [error, setError] = useState(false)

  const activeBlockClient = blockClientOverride ?? client

  // derive blocks based on active network
  const networkBlocks = blocks
  // console.log(GET_BLOCKS)

  useEffect(() => {
    async function fetchData() {
      const results = await splitQuery(GET_BLOCKS, activeBlockClient, [], timestamps)
      if (results) {
        setBlocks({ ...(blocks ?? {})})
      } else {
        setError(true)
      }
    }
    if (!networkBlocks && !error) {
      fetchData()
    }
  })

  const blocksFormatted = useMemo(() => {
    if (blocks) {
      const networkBlocks = blocks
      const formatted = []
      for (const t in networkBlocks) {
        if (networkBlocks[t].length > 0) {
          formatted.push({
            timestamp: t.split('t')[1],
            number: networkBlocks[t][0]['number'],
          })
        }
      }
      return formatted
    }
    return 
  }, [blocks])

  return {
    blocks: blocksFormatted,
    error,
  }
}