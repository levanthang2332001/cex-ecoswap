import React from 'react'

export const ButtonSwap = ({ btnSwap }: any) => {
  return (
    <div className='bg-[#EE0481] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer text-white' onClick={btnSwap}>
      Swap
    </div>
  )
}
