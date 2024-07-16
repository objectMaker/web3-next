'use client'

import { useEffect, useState } from "react"
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
	
	return <>
		<div>account : {account}</div>
		<button onClick={connect} className="mr-3">connect</button>
		<button onClick={handleGetAccount}>setAccount</button>
	</>
}