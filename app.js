
const getWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
        const web3 = new Web3(window.ethereum)
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts'})
            resolve(web3)
        } catch (error) {
            reject(error)
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('connect_button').addEventListener('click', async ({target}) => {
        const web3 = await getWeb3()
        const walletAddress = await web3.eth.requestAccounts()
        const walletBalance = await web3.eth.getBalance(walletAddress[0])
        const walletEth = Math.round(web3.utils.fromWei(walletBalance) * 1000) / 1000
        target.setAttribute('hidden', 'hidden')
        document.getElementById("wallet_address").textContent = `Id: ${walletAddress}`
        document.getElementById("account_send").textContent = `Id: ${walletAddress}`
        document.getElementById("wallet_balance").textContent = `ETH: ${walletEth}`
    })

    document.getElementById('send_button').addEventListener('click', async () => {
        const web3 = await getWeb3()
        web3.eth.accounts.wallet.add('2bad31867c77560f3725c69284ae0c9403758b31172dec65b3b713d972ccb4b2')
        const sender = await web3.eth.requestAccounts()
        const receive = document.querySelector('#receiveId').value
        
        const sendEth = async () => {
           try {
            await web3.eth.sendTransaction({from: sender[0], to: receive, value: web3.utils.toWei(document.getElementById('totalEth').value, 'ether'), gas: 24000})
            alert('Chuyển thành công')
           } catch (error) {
            alert('có lỗi xảy ra')
            console.log(error);
           }
        }
        await sendEth()
    })
})

