const stringToStatus = {
    'Accept': 0,
    'Refuse': 1,
    'Request change': 2
}
const statusStrings = Object.keys(stringToStatus)

const createReview = async (account, contract, status) => {
    await contract.methods.createReview(stringToStatus[status]).send({from: account, gas: '1000000'})
}

export {statusStrings, createReview}