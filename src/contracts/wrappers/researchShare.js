const submitPaper = async (account, contract, paperHash, field) => {
    await contract.methods.submitPaper(paperHash, field).send({from: account, gas: '1000000'})
}

export{submitPaper};
