import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { TokenData } from '@/state/tokens/tokens'
import { useTopTokenAddresses } from '@/data/topToken'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets'

export const DataRow =  () => {
  return (
    <div className='pt-[5rem]'>
      <AdvancedRealTimeChart  width={1500}></AdvancedRealTimeChart>
    </div>
  )
}
