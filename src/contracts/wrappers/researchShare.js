const submitPaper = async (account, contract, paperHash) => {
    await contract.methods.submitPaper(paperHash).send({from: account, gas: '1000000'})
}
