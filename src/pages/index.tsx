import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import {Theme, SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { Navbar } from '@/components/nav/index'

const theme: Theme = {
  // container: '#0000'
}

const Ecoswap: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Ecoswap - Ecoswap Exchange</title>
      </Head>
      <div className='h-screen justify-between items-center w-screen relative bg-[#FFF4FA]'>
        <Navbar />
        <div className='flex items-center justify-center pt-14'>
          <SwapWidget width={550} theme={theme}/>
        </div>
      </div>
    </Fragment>
  )
}

export default Ecoswap
