module.exports = (model) => {
    const create = async (account) => {
        if (account.firstName && account.lastName && account.location && account.cellNumber && account.email && account.idNumber && account.gender && account.age && account.password) {
            let res = await model.createAccount(account);
            return res
        }
    }

    return {
        create
    }
}