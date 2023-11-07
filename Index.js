const ethers=  require("ethers");
const {parseUnits, parseEther, Contract} = require("ethers");
const url = 'https://binance.llamarpc.com'
const privateKey = '0x264232763fc62b36a2bb6b1501ab35f679823793f62253dcedff77a2f0de9234'
const provider = new ethers.JsonRpcProvider(url)
const wallet = new ethers.Wallet(privateKey, provider)
const ERC20 = 'адрес вашего токена'
const abi = [
    "function transfer(address to, uint amount)",
    "function balanceOf(address account) returns (uint)",
]
async function getBalance() {
    const balance = await provider.getBalance(wallet.address)
    const balanceInEth = ethers.formatEther(balance) // wei to ether
    console.log(balanceInEth.toString())
}
async function sendEth() {
    const tx = await wallet.sendTransaction({
        to: "кому переводим",
        value: parseEther("количество токенов")
    });
    console.log(tx.hash)
    const receipt = await tx.wait();
    console.log(receipt)
}

async function sendErc20() {
    const contract = new Contract(ERC20, abi, wallet)
    const amount = parseUnits("количество токенов", 18);
    const tx = await contract.transfer("кому переводим", amount)
    console.log(tx.hash)
    const receipt = await tx.wait();
    console.log(receipt)

}
//вызов функций
sendErc20()
getBalance()
sendEth()
