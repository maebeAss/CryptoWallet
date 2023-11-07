const ethers = require("ethers");
const { Telegraf } = require("telegraf");
const {parseUnits, parseEther, Contract} = require('ethers');
async function getBalance() {
    const balance = await provider.getBalance(wallet.address);
    const balanceInEth = ethers.formatEther(balance); // wei to ether
    return balanceInEth
  //   console.log(balance.toString() / 1e18);
  }
  
  async function getERC20() {
    const contract = new Contract(ERC20, abi, provider);
    const balance = await contract.balanceOf(wallet.address);
    const balanceInEth = ethers.formatEther(balance); // wei to ether
    return balanceInEth
  //   console.log(balance.toString() / 1e18);
  }
  
  async function sendEth(whomTransfer, numOfTokens) { // first param - wallet address, second - number of tokens
    const tx = await wallet.sendTransaction({
      to: whomTransfer, // to whom to transfer
      value: parseEther(numOfTokens) // number of tokens
    });
  
    console.log(tx.hash);
    const receipt = await tx.wait();
    console.log(receipt);
  }
  
  async function sendERC20(whomTransfer, numOfTokens) {
    const contract = new Contract(ERC20, abi, wallet);
    const amount = parseUnits(numOfTokens, 18); // number of tokens
    const tx = await contract.transfer(whomTransfer, amount); // to whom to transfer
  
    console.log(tx.hash);
    const receipt = await tx.wait();
    console.log(receipt);
  } 
  
  bot.launch()
