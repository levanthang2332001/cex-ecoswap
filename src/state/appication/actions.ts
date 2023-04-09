import { createAction } from '@reduxjs/toolkit'
import { NetworkInfo } from '@/constant/networks'

export const updateActiveNetworkVersion = createAction<{ activeNetworkVersion: NetworkInfo }>(
  'application/updateActiveNetworkVersion'
)