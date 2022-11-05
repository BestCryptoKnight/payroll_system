import { ethers } from 'ethers';
import contracts from "./contracts.json"
import payroll from './abi/payroll.json'
import erc20 from './abi/erc20.json'

const rpc = process.env.REACT_APP_NETWORK_URL;
const chainid = process.env.REACT_APP_CHAIN_ID || 5;
const addrs = contracts[Number(chainid)];

const provider = new ethers.providers.JsonRpcProvider(rpc);

const PayRollContract = new ethers.Contract(addrs.payroll, payroll, provider);
const DaiContract = new ethers.Contract(addrs.tokens.dai.address, erc20, provider);


export {
    provider,
    PayRollContract,
    DaiContract
}