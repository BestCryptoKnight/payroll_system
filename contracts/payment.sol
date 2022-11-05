// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

// Import the ERC20 token addresses for depositing funds
import {IERC20} from "./IERC20.sol";

// Import the dependencies for only owner
import "./Ownable.sol";

// Import the dependencies for ERC721 contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

// Create the interface to deposit funds to pay your employees
interface IDex {
    function depositUSDC(uint256 _amount) external;

    function depositDAI(uint256 _amount) external;
}

// This contract is an ERC721
contract Payment is ERC721, Ownable {
    // Give the contract a name and symbol
    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    // Aave ERC20 Token addresses on Goerli network
    address private immutable daiAddress =
        0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464;
    address private immutable usdcAddress =
        0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43;
    address private dexContractAddress =
        0xF2A7C8163b88Ff79727351ec1310ABd37DCc13F6;
    address private _address = 0xaF1d6B65D868A040Ec8F544b31D6A8e2EFDbdc42;
    IERC20 private dai;
    IERC20 private usdc;
    IDex private dexContract;

    // Function to pay your employees
    // "clientOne" = one of your employes
    // balance * 50 / 100 = your employee will receive 50% of all funds on contract
    // Put the wallet address of your employee in the "WALLET ADDRESS" place holder
    function PayAll() external payable onlyOwner {
        uint256 balance = address(this).balance;
        uint256 clientOne = (balance * 50) / 100;
        (bool payClientOne, ) = payable(_address).call{value: clientOne}("");
        require(payClientOne, "Transfer Failed");
    }

    // Get the balance of your contract
    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    // Withdraw back into your wallet
    function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }
}
