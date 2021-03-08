const stringToStatus = {
    'Accept': 0,
    'Refuse': 1,
    'Request change': 3
}

const statusStrings = Object.keys(stringToStatus)

const submitReview = async (account, contract, hash, status, changeRequests) => {
    const return_value = await contract.methods.submitReview(hash, stringToStatus[status], changeRequests).send({from: account, gas: '1000000'})

    return_value.then((e) => console.log(e));
}

export {statusStrings, submitReview}