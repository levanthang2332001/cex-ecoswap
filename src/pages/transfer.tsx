import React, { useState, useEffect} from 'react'
import { Navbar } from '@/components/nav/index'
import { TransferETH } from '@/components/swap/index'
import { ethers } from 'ethers'

const Transfer = () => {

  return (
    <div>
      <div className='h-screen justify-between items-center w-screen relative bg-[#FFF4FA]'>
          <Navbar />
          <TransferETH />
          {/* {balance} */}
      </div>
    </div>
  )
}

export default Transfer
