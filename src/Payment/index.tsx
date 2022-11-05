import React, { useState, useEffect } from 'react'
import './index.scss'
import '../responsive.scss'
import {
    PayRollContract,
    DaiContract
} from "../config"
import { errHandler, tips, /* toValue, */ fromValue, fromBigNum, toBigNum } from '../util';
import { ethers } from 'ethers';
import { Link, Outlet } from 'react-router-dom';
import { useMetaMask } from 'metamask-react';
import contracts from '../config/contracts.json';
import { isAddress, recoverAddress } from 'ethers/lib/utils';


// interface User {
//     address: string
//     amount: number
// }

const Payment = () => {

    const { status, connect, account, chainId, ethereum } = useMetaMask();

    const daiDecimal = 18;
    const daiAdddress = "0xf35f0114D97E2255E7837fE262BF29b8851eD6D1";

    const [recipientAddress, setRecipientAddress] = useState('');
    const [recipientAmount, setRecipientAmount] = useState();
    const [userBalance, setUserBalance] = useState(0);
    const [onBalance, setOnBalance] = useState(false);
    const [users, setUsers] = useState([
        {
            address: '',
            amount: 0
        }
    ]);

    const getBalance = async () => {
        try {
            if (status === "connected") {
                var provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                var MyContract = PayRollContract.connect(signer);
                let balance = await MyContract.getBalance(daiAdddress);
                console.log(balance)
                console.log('------------------------------------------------')
                let bigBal = fromBigNum(balance, daiDecimal);
                console.log(bigBal)
                // setStatusApp({ ...statusApp, stakeValue: statusApp.balance })
                let tokenBalance = Number(bigBal.toFixed(3));
                console.log(tokenBalance)

                setUserBalance(tokenBalance);
            } else if (status === "notConnected") {
                return tips('Please Connect Metamask Wallet');
            }
        } catch (err) {
            console.log("context : getBalance error", err);
            // toast.error("context : getBalance error", err);
        }
    }

    const addUser = async () => {
        try {
            console.log()
            // let userArray = users;
            // userArray.push({ address: '', amount: 0 });
            setUsers([...users, { address: '', amount: 0 }])

        } catch (error) {

        }
    }

    const removeUser = async (index: number) => {
        try {
            const _users = [...users];
            _users.splice(index, 1);
            setUsers(_users);


        } catch (error: any) {

        }
    }

    const setUser = async (index: number, event: any) => {
        const { name, value } = event.target;
        const user = [...users];
        // @ts-ignore
        user[index][name] = value;
        setUsers(user);
    }


    const getBalanceOf = async (account: string) => {
        try {
            if (status === "connected") {
                var provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                var MyContract = DaiContract.connect(signer);
                let balance = await MyContract.balanceOf(account);
                console.log(balance)
                console.log('------------------------------------------------')
                let bigBal = fromBigNum(balance, daiDecimal);
                console.log(bigBal)

                // setStatusApp({ ...statusApp, stakeValue: statusApp.balance })
                let tokenBalance = Number(bigBal.toFixed(3));
                console.log(tokenBalance)
                setUserBalance(tokenBalance)
                return tokenBalance;
            } else if (status === "notConnected") {
                return tips('Please Connect Metamask Wallet');
            }
        } catch (err: any) {
            console.log("context : getBalance error", err);
            // toast.error("context : getBalance error", err);
        }
    }

    const sendToken = async (address: string, _amount: number) => {
        try {
            if (status === "connected") {
                if (address === '' || address.length <= 0) {
                    return tips('Please input address');
                }
                if (_amount <= 0) {
                    return tips('Please input amount');
                }
                if (await getBalanceOf(account) <= 0) {
                    return tips('You have not enough balance');
                }
                if (await getBalanceOf(account) < await getBalanceOf(address)) {
                    return tips('Not enough balance');
                }
                console.log(getBalanceOf(account))


                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let SignedDaiContract = (DaiContract).connect(signer);
                let amount = toBigNum(_amount, daiDecimal);
                let tx = await SignedDaiContract.transfer(address, amount);
                console.log('tx  : ', tx);

            } else if (status === "notConnected") {
                return tips('Please Connect Metamask Wallet');
            }

        } catch (error) {
            console.log(error)
        }
    }

    const setTokens = async () => {
        try {
            if (users && users.length > 0) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].address === '' || users[i].amount <= 0)
                        return tips('Please input all addresss and amounts')
                }
                for (let i = 0; i < users.length; i++) {
                    // @ts-ignore
                    await sendToken(users[i].address, users[i].amount);
                }
            } else {
                return tips('Please input addresss and amount')
            }
        } catch (error: any) {
            console.log('bug')
            console.log(error)
        }
    }

    const handleClick = () => {
        setOnBalance(!onBalance);
    }



    useEffect(() => {
        if (account) {
            getBalanceOf(account)
        }
    }, [account, chainId])

    return (
        <section className="py-7 bg-hero" id="home">
            <div className="container">
                <div className='stake-panel'>
                    <div className='panel-title'>
                        <h1 className='mauto'>Payroll</h1>
                    </div>

                    {
                        (onBalance)
                            ?
                            <div className='period-btn-group'>
                                <button className='btn btn-primary px-5 w10' onClick={handleClick} >Wallet Balance</button>
                                <input className='' type="number btn btn-primary" style={{ width: '100%' }} placeholder='User Balance' defaultValue={userBalance} disabled={true} />
                            </div>
                            :
                            <div className='period-btn-group'>
                                <button className='btn btn-primary px-5 w10 dis-f' onClick={handleClick} >

                                    <span className=''>Wallet Balance</span>

                                    {/* {userBalance && userBalance > 0 ? (<span style={{ marginLeft: '10px' }} >: {userBalance}</span>) : ''} */}
                                </button>
                            </div>
                    }
                    <div className='dis-f gap2'>
                        <button onClick={addUser} className='btn btn-primary w3' >Add user</button>
                    </div>

                    {users.map((user, index) => (
                        <div className="w10 dis-f mt-3 " style={{ gap: '20px', height: '40px' }} key={index}>
                            <div className="" style={{ height: '100%', flex: 4 }}>
                                <input name='address' onChange={(event: any) => setUser(index, event)} className='' type="number btn btn-primary" style={{ height: '100%', width: '100%' }} placeholder='Recipient Address' value={user.address} />
                            </div>
                            <div className="" style={{ height: '100%', flex: 2 }}>
                                <input name='amount' onChange={(event: any) => setUser(index, event)} className='' type="number btn btn-primary" style={{ height: '100%', width: '100%' }} placeholder='Amount' value={user.amount} />
                            </div>
                            <button onClick={() => removeUser(index)} className='justify cu-po remove-user' style={{ borderRadius: '7px' }}>
                                <span className="" style={{ fontSize: '30px', marginTop: '-3px' }}>
                                    &times;
                                </span>
                            </button>
                        </div>

                    ))

                    }
                    <div className='period-btn-group'>
                        {/* <button className='btn btn-primary px-5 w10' >payment Amount</button> */}
                    </div>
                    <button onClick={setTokens} className='btn btn-primary px-5 w10' >Pay now</button>
                    <hr />

                    <div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Payment;