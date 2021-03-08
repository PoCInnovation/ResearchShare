import Web3 from 'web3';

export function truncate(str, n) {
    return (
        (str.length > n) ?
            str.substr(0, n - (n / 2)) + '...' + str.substr(str.length - (n / 2), str.length) : str
    );
}

/**
 * ask user to link his metamask account
 * @param window - Global Window
 * @param setCurrentAccount - function to setAccount
 */
export function connectToMetamask(window, setCurrentAccount) {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.autoRefreshOnNetworkChange = false;
        window.ethereum
        .request({method : 'eth_requestAccounts'})
        .then((value) => setCurrentAccount(value[0]))
        .catch(() => alert('Please connect to MetaMask.'));
    } else if (!window.web3) {
        alert('Please install MetaMask!');
    }
}