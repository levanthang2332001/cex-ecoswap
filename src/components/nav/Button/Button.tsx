import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import logo from '~/images/eth.png';
import { ConnectWalletContext } from '@/contract/Wallet/index';
import { BiGlobe } from "react-icons/bi"
import Link from 'next/link';

export const Button = () => {
  const { connectWallet, currentAccount } = useContext(ConnectWalletContext);
  const [userName, setUserName] = useState<string>();

  // console.log(currentAccount);

  const ADDRESS_EXPLORER = `https://goerli.etherscan.io/address/${currentAccount}`

  useEffect(() => {
    if(currentAccount) {
      setUserName( `${currentAccount.slice(0, 5)}...${currentAccount.slice(37)}`)
    }
  }, [currentAccount]);

  return (
    <div className='flex items-center space-x-8 pl-[62rem]'>
      <div className='flex space-x-1  rounded-3xl p-[4px]'>
        <Image src={logo} width={25} height={20}></Image>
        <p className=''>Goerli</p>
      </div>
      {currentAccount ? (
        <button
          type='button'
          data-modal-toggle='crypto-modal'
          className='inline-flex h-12 items-center rounded-2xl border border-gray-200 bg-[#FEBBDF] px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100'
          onClick={connectWallet}
        >
          {userName}
        </button>
      ) : (
        <button
          type='button'
          data-modal-toggle='crypto-modal'
          className='inline-flex h-12 items-center rounded-2xl border border-gray-200 bg-[#FEBBDF] px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100'
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
      <Link href={ADDRESS_EXPLORER}>
        <a target='_blank'>
          <BiGlobe className=' text-zinc-700 w-8 h-8 cursor-pointer'/>
        </a>
      </Link>
    </div>
  );
};
