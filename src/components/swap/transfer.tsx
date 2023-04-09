import React, { useContext } from 'react'
import { RiSettings3Fill } from 'react-icons/ri'
import { AiOutlineDown } from 'react-icons/ai'
import Image from 'next/image'
import logoToken from '~/images/eth.png'
import {ConnectWalletContext } from '@/contract/Wallet/index'

export const TransferETH = () => {

  const { formData, handleChange, sendTransaction } = useContext(ConnectWalletContext)

  const handleSubmit = async (e: any) => {
    const { addressTo, amount} = formData
    e.preventDefault()

    if(!addressTo || !amount ) return 
    sendTransaction()
  }

  return (
    <div className='w-screen flex itQems-center justify-center mt-14'>
      <div className='bg-[#FFFFFF] w-[40rem] rounded-2xl p-4'>
        <div className='px-2 flex items-center justify-between font-semibold text-xl'>
          <div>Transfer</div>
          <RiSettings3Fill className='text-white'/>
        </div>
        <div className='bg-[#F5F6FC] my-3 rounded-2xl p-6 text-3xl  flex justify-between'>
          <input
              type='number'
              className='bg-transparent border-none focus:outline-none  mb-6 w-full text-2xl rounded-lg'
              placeholder='0.0'
              pattern='^[0-9]*[.,]?[0-9]*$'
              onChange={e => handleChange(e, 'amount')}
            />
          <div className='flex w-1/4'>
            <div className='w-full h-min flex justify-between items-center bg-[#E8ECFB] hover:bg-[#E8ECFB] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]'>
              <div className='flex items-center'>
                <Image src={logoToken} height={20} width={20} />
              </div>
              <div className='mx-2'>ETH</div>
              <AiOutlineDown />
            </div>
          </div>
        </div>
        <div className='bg-[#F5F6FC] my-3 rounded-2xl p-6 text-3xl flex justify-between'>
        <input
            type='text'
            className='bg-transparent  border-none outline-none mb-6 w-full text-2xl rounded-lg'
            placeholder='0x'
            onChange={e => handleChange(e, 'addressTo')}
          />
          {/* <div className='flex w-1/4'>
            <div className='w-full h-min flex justify-between items-center bg-[#E8ECFB] hover:bg-[#E8ECFB] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]'>
                <div className='flex items-center'>
                  <Image src={logoToken} height={20} width={20} />
                </div>
                <div className='mx-2'>ETH</div>
                <AiOutlineDown />
            </div>
          </div> */}
        </div>
        <div 
          className='bg-[#EE0481] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer text-white'
          onClick={e => handleSubmit(e)}
          >
          Swap
        </div>
      </div>
    </div>
  )
}
