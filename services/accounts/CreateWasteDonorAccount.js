module.exports = (model) => {
    const create = async (account) => {
        if (account.firstName && account.lastName && account.residentialAddress && account.cellNumber && account.email && account.idNumber && account.gender && account.age && account.password) {
            await model.createAccount(account);
            return { response: 'Account was created' };
        }
    }

    return {
        create
    }
}