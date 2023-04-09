import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '@/abi/Transfer'
import { client } from '@/sanity/sanityClient'

export const ConnectWalletContext = React.createContext()

let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )

  return transactionContract
}

export const ConnectionProvider = ({ children }) => {
  
  const [currentAccount, setCurrentAccount] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
  })

  const handleChange = (e, name) => {
    setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
  }

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ')

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object')
    }
  }

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return alert('Please install metamask ')

      const accounts = await window.ethereum.request({ method: 'eth_accounts' })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      }
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object.')
    }
  }

  const saveTransaction = async (
    txHash,
    amount,
    fromAddress = currentAccount,
    toAddress,
  ) => {
    const txDoc = {
      _type: 'transactions',
      _id: txHash,
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamp: new Date(Date.now()).toISOString(),
      txHash: txHash,
      amount: parseFloat(amount),
    }

    await client.createIfNotExists(txDoc)

    await client
      .patch(currentAccount)
      .setIfMissing({ transactions: [] })
      .insert('after', 'transactions[-1]', [
        {
          _key: txHash,
          _ref: txHash,
          _type: 'reference',
        },
      ])
      .commit()

    return
  }

  const sendTransaction = async ( metamask = eth, connectedAccount = currentAccount ) => {
    try {
      const {addressTo, amount} = formData
      console.log(addressTo)
      if(!metamask) return alert('Please install metamask')
      const transactionContract = getEthereumContract()

      const parsedAmount = ethers.utils.parseEther(amount)

      console.log(parsedAmount)

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x7EF40', // 520000 Gwei
            value: parsedAmount._hex,
          },
        ],
      })

      // const transactionHash = await transactionContract.publishTransaction(
      //   addressTo,
      //   parsedAmount,
      //   `Transferring ETH ${parsedAmount} to ${addressTo}`,
      //   'TRANSFER',
      // )

      // setIsLoading(true)

      // await transactionHash.wait()
      // await saveTransaction(
      //   transactionHash,
      //   amount,
      //   connectedAccount,
      //   addressTo,
      // )

      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletConnected()
  },[])

  return (
    <ConnectWalletContext.Provider 
    value={{
      connectWallet,
      currentAccount,
      sendTransaction,
      handleChange,
      formData,
      setFormData,
      isLoading
    }}>
      { children }
    </ConnectWalletContext.Provider>
  )

}

