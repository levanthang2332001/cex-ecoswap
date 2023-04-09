import React from 'react'
import Image from 'next/image'
import logo from '~/images/Ecoswap.png'
import Link from 'next/link'
import { Search } from '@/components/nav/Search'
import { Button } from '@/components/nav/Button'


export const Navbar = () => {
  return (
    <div className='pt-3'>
      <nav className='flex flex-wrap space-x-10'>
       <Link href='/' className='cursor-pointer'>
        <Image 
              className='logo'
              src={logo}
              width={60}
              height={60}
              objectFit="cover"
            >
            </Image> 
       </Link>
          <div className='flex justify-center '>
            <div className='flex space-x-10'>
              <div className='pt-5 '>
                <Link href='/'>
                  <span className='text-base not-italic font-semibold text-center items-center cursor-pointer'>Swap</span>  
                </Link>
              </div>
              <div className='pt-5 '>
                <Link href='/transfer'>
                  <span className='text-base not-italic font-semibold text-center items-center cursor-pointer'>Transfer</span>  
                </Link>
              </div>
              <div className='pt-5 '>
                <Link href='/tokens'>
                  <span className='text-base not-italic font-semibold text-center items-center cursor-pointer'>Chart</span>
                </Link>  
              </div> 
            </div>
          </div>
          {/* <Search /> */}
          <Button />
          
    </nav>
    </div>
  )
}

