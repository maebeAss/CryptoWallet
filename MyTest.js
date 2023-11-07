const ethers = require("ethers");
const { Telegraf } = require("telegraf");
const {parseUnits, parseEther, Contract} = require('ethers');

const url = "wss://bsc-testnet.publicnode.com"; // blockchain node
const privateKey = "280d3760e4166b568cda2c7203513f4f8732f97b8a7357018d59584fc055b624"; // private key
const ERC20 = "0x4067105CF7DCbF3FC4b499C3e6a2360aac53EC6F"; // token address
const bot = new Telegraf('6929404757:AAHj1D8dfCOmlPcXqipcFLx87fOxnonkgLg')

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);
const abi = [
  "function transfer(address to, uint amount)", 
  "function balanceOf(address) public view returns (uint)"
];

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

let output1;
getBalance().then(e=>{console.log(e);output1=e;})
bot.hears('/getbalance', (ctx) => ctx.reply(output1))

let output2;
getERC20().then(e=>{console.log(e);output2=e;})
bot.hears('/geterc20', (ctx) => ctx.reply(output2))

bot.launch()
