import React from 'react'
import { DataRow } from '@/components/tokens/TokenTable'
import { Navbar } from '@/components/nav'

const tokens = () => {
  return (
    <div className='bg-[#FFF4FA]'>
      <Navbar />
      <DataRow />
    </div>
  )
}

export default tokens
