module.exports = (model) => {
    const create = async (account) => {
        if (account.firstName && account.lastName && account.location && account.cellNumber && account.email && account.idNumber && account.gender && account.age) {
            await model.createAccount(account);
        }
    }

    return {
        create
    }
}