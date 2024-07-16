'use client'

import { useState } from "react"
import {ethers,AbstractProvider,JsonRpcSigner,formatEther,parseEther} from "ethers"

export default function Test() {
	const [eth,setEth] = useState<{
		provider?:AbstractProvider,
		signer?:JsonRpcSigner,
	}>({
		provider:undefined,
		signer:undefined
	})
	async function connect() {
		if(eth.provider){
			return confirm("you are already connected!")
		}
		let provider 
		let signer
		if (window.ethereum == null) {
			console.log("MetaMask not installed; using read-only defaults")
			provider = ethers.getDefaultProvider()
		} else {
			provider = new ethers.BrowserProvider(window.ethereum)
			signer = await provider.getSigner();
		}
		setEth({
			provider,
			signer
		})
		confirm("you connected successfully")
	}

	const [accountAddress,setAccountAddress] = useState('')

	async function handleGetAccount() {
		if(!eth.provider){
			 confirm("you have not connected!")
			 throw new Error("you have not connected!")
		}
		//get account api
		const address = await eth.signer?.getAddress?.()
		setAccountAddress(address || '')
		return address || '';
	}

	const [blockNumber,setBlockNumber] = useState('')

	async function handleGetBlockNumber() {
		if(!eth.provider){
			return confirm("you have not connected!")
		}
		//get account api
		const number = await eth.provider?.getBlockNumber?.()
		setBlockNumber(number + '')
	}
	const [balance,setBalance] = useState('')
	async function handleGetBalance() {
		if(!eth.provider){
			return confirm("you have not connected!")
		}
		//get account api
		const accountAddress = await handleGetAccount()
		const number = await eth.provider?.getBalance(accountAddress)
		const numberEth = formatEther(number)
		setBalance(numberEth + 'eth')
	}

	const [nonce,setNonce] = useState('')
	async function handleGetNonce() {
		if(!eth.provider){
			return confirm("you have not connected!")
		}
		//get account api
		const accountAddress = await handleGetAccount()
		const count = await eth.provider.getTransactionCount(accountAddress)
		setNonce(count+"")
	}
	

	async function handleSendTransaction() {
		if(!eth.provider){
			return confirm("you have not connected!")
		}
		//get account api
		const tx = await eth.signer?.sendTransaction({
			to:"0xaa76702c82f66fe8F24f07fDAAf4662191Cf2F4C",
			value:parseEther('0.01')
		})
		const receipt = await tx?.wait()
		console.log(receipt,'receipt')
		confirm( `send transaction successfully use ${formatEther(receipt?.fee || 0)}eth,send 0.01eth`)
		await handleGetBalance();
	}
	
	return <>
		<div>account : {accountAddress}</div>
		<button onClick={connect} className="hover:scale-110 mr-3 border-2 p-1 transition-all ease-linear hover:bg-light-800 rounded-sm border-green-800">connect</button>
		<button onClick={handleGetAccount} className="hover:scale-110 mr-3 border-2 p-1 transition-all ease-linear hover:bg-light-800 rounded-sm border-green-800">		setAccount
		</button>
		<div>
		blockNumber : {blockNumber}
		</div>
		<button onClick={handleGetBlockNumber} className="hover:scale-110 mr-3 border-2 p-1 transition-all ease-linear hover:bg-light-800 rounded-sm border-green-800">		setBlockNumber
		</button>
		<div>
		balance : {balance}
		</div>
		<button onClick={handleGetBalance} className="hover:scale-110 mr-3 border-2 p-1 transition-all ease-linear hover:bg-light-800 rounded-sm border-green-800">		setBalance
		</button>
		<div>
		Nonce : {nonce}
		</div>
		<button onClick={handleGetNonce} className="hover:scale-110 mr-3 border-2 p-1 transition-all ease-linear hover:bg-light-800 rounded-sm border-green-800">		setNonce
		</button>
		<div>--------</div>
		<button onClick={handleSendTransaction} className="hover:scale-110 mr-3 border-2 p-1 transition-all ease-linear hover:bg-light-800 rounded-sm border-green-800">SendTransaction
		</button>
	</>
}