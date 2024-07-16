'use client'

import { useState } from "react"
import {ethers,AbstractProvider,JsonRpcSigner} from "ethers"

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

	const [account,setAccount] = useState('')

	async function handleGetAccount() {
		if(!eth.provider){
			return confirm("you have not connected!")
		}
		//get account api
		const address = await eth.signer?.getAddress?.()
		setAccount(address || '')
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
	
	return <>
		<div>account : {account}</div>
		<button onClick={connect} className="hover:scale-110 mr-3 border-2 p-1 transition-all ease-linear hover:bg-light-800 rounded-sm border-green-800">connect</button>
		<button onClick={handleGetAccount} className="hover:scale-110 mr-3 border-2 p-1 transition-all ease-linear hover:bg-light-800 rounded-sm border-green-800">		setAccount
		</button>
		<div>
		blockNumber : {blockNumber}
		</div>
		<button onClick={handleGetBlockNumber} className="hover:scale-110 mr-3 border-2 p-1 transition-all ease-linear hover:bg-light-800 rounded-sm border-green-800">		setBlockNumber
		</button>
		
	</>
}