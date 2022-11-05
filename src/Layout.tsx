import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useMetaMask } from 'metamask-react';
import WalletConnect from "@walletconnect/client";//add
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";//add
import { errHandler, tips, /* toValue, */ fromValue, fromBigNum } from './util';

import "./layout.scss"
import "./assets/css/stars.css"
import Meta from './assets/img/metamask.png';
import Trust from './assets/img/trust.png';







const Layout = (props: any) => {


	const [scrolling, setScrolling] = React.useState<boolean>(false);
	const [up, setUp] = React.useState<boolean>(false);
	const { status, connect, account, chainId, ethereum } = useMetaMask();


	useEffect(() => {
		window.addEventListener('scroll', onScroll, true);
	}, [])
	let scrollTop = 0;
	const onScroll = () => {
		const scroll = document.body.scrollTop;
		if (scroll > 80) {
			if (scroll > scrollTop) {
				setScrolling(true);
				setUp(false);
			} else {
				setUp(true);
			}
		} else {
			setScrolling(false);
			setUp(false);
		}
		scrollTop = scroll;
	}

	const [WalletConnectModal, setWalletConnectModal] = useState(false);



	const WalletModal = () => {
		return (
			<div className='modal-continer' >
				<div className='modal-back' onClick={() => setWalletConnectModal(false)}></div>

				<div className="modal-body wallet-modal" >
					<div className='justify'>
						<div className='wallet-icon-hover'>
							<a onClick={() => MetamaskConnect()}>
								<img src={Meta} className='justify wallet-imgs' alt='metamask' />
							</a>
						</div>
						<div className='wallet-icon-hover'>
							<a onClick={walletConnect}>
								<img src={Trust} className='justify wallet-imgs' alt='Trust' />
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
	const walletConnect = async () => {
		// @ts-ignore
		const walletConnector = window.mywallet = new WalletConnect({
			bridge: "https://bridge.walletconnect.org" // Required
		});

		walletConnector.killSession()

		// Check if connection is already established
		if (!walletConnector.connected) {
			console.log("Creating session")
			// create new session
			walletConnector.createSession().then(() => {
				// get uri for QR Code modal
				const uri = walletConnector.uri;
				// display QR Code modal
				WalletConnectQRCodeModal.open(uri, () => {
					console.log("QR Code Modal closed");
				})
			})
		}

		// Subscribe to connection events
		walletConnector.on("connect", (error: any, payload: any) => {
			if (error) {
				throw error;
			}

			// Close QR Code Modal
			WalletConnectQRCodeModal.close();

			// Get provided accounts and chainId
			// const { accounts, chainId } = payload.params[0];

			// @ts-ignore
			walletConnector.getAccounts().then(result => {
				// Returns the accounts
				// @ts-ignore	
				const account = result.find((account) => account.network === 714);
				console.log("ACCOUNT:", account)
				console.log("WALLET CONNECT ACCOUNTS RESULTS " + account.address);
				// @ts-ignore
				console.log("ADDR:", crypto.decodeAddress(account.address))
				// context.({
				// 	"wallet": {
				// 		"walletconnect": walletConnector,
				// 		"address": account.address,
				// 		"account": account,
				// 	}
				// }, () => {
				// 	props.history.push("/stake")
				// })
				//@ts-ignore
			}).catch(error => {
				// Error returned when rejected
				console.error(error);
			})
		})
		//@ts-ignore
		walletConnector.on("session_update", (error, payload) => {
			if (error) {
				throw error;
			}

			// Get updated accounts and chainId
			// const { accounts, chainId } = payload.params[0];
		})
		//@ts-ignore
		walletConnector.on("disconnect", (error, payload) => {
			if (error) {
				throw error;
			}

		})

	}
	const MetamaskConnect = () => {
		// const disconnect = () => {
		// 	window.ethereum.request({ method: "eth_chainId" });
		// }
		if (status === "initializing")
			return tips('Synchronisation with MetaMask ongoing...')
		if (status === "unavailable")
			return tips('MetaMask not avaliable');
		if (status === "notConnected") {
			// MetaMask connect
			return connect();
		}
		if (status === "connecting")
			return tips('Connecting...');
		if (status === "connected") {
			return tips('Connected');

			// //@ts-ignore
			// account && account.length !== 0 &&
			// //@ts-ignore
			// account.slice(0, 4) + '...' + account.slice(account.length - 4, account.length)
		}
	}

	return (
		<>
			<header className={'smart-scroll' + (scrolling ? ' scrolling' : '') + (up ? ' up' : '')}>
				<div className="container-fluid">
					<div className="background">
						<div id="stars"></div>
						<div id="stars2"></div>
						<div id="stars3"></div>
					</div>
					<nav className="navbar navbar-expand-md navbar-dark">
						<Link className="navbar-brand heading-black" to="./">
							Savvy
						</Link>
						<button onClick={() => setWalletConnectModal(true)} className="navbar-toggler navbar-toggler-right border-0 collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
						</button>
						<div className="navbar-collapse collapse" id="navbarCollapse">
							<ul className="navbar-nav ml-auto flex-align-center align-items-center">
								{/* <li className="nav-item">
									<Link className="nav-link page-scroll" to="./">Home</Link>
								</li> */}
								{/* <li className="nav-item">
									<Link className="nav-link page-scroll" to="./staking">Staking</Link>
								</li> */}
								<li className="nav-item">
									<a className="nav-link page-scroll p-0">
										{
											account && account.length !== 0 ?
												<button onClick={() => setWalletConnectModal(true)} className="btn btn-primary d-inline-flex flex-row align-items-center" id="loginButton">
													{
														// @ts-ignore
														account.slice(0, 4) + '...' + account.slice(account.length - 4, account.length)
													}
												</button>
												:
												<button onClick={() => setWalletConnectModal(true)} className="btn btn-primary d-inline-flex flex-row align-items-center" id="loginButton">
													Wallet Connect
												</button>
										}
									</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</header>
			<main>
				{props.children}
			</main>



			{WalletConnectModal === true
				? <WalletModal />
				: <></>
			}

			<Outlet />
		</>)
}

export default Layout