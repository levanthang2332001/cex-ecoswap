import React from 'react'
import { ethers } from 'ethers'

// export const TransactionContext = React.createContext()

let eth: String ;

if(typeof window !== 'undefined') {
  eth = window.ethereum
}

