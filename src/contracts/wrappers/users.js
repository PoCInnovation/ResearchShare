const registerUser = async (account, contract, userInfos) => {
    await contract.methods.registerUser(...userInfos).send({from: account, gas: '1000000'})
}

const getUser = async (account, contract) => {
    return await contract.methods.getUser().call({from: account, gas: '1000000'})
}

export {registerUser, getUser}
