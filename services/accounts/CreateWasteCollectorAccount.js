module.exports = (model) => {
    const create = async (account) => {
        if (account.firstName && account.lastName && account.location && account.cellNumber && account.email && account.idNumber && account.gender && account.age && account.password) {
            let res = await model.findAccount(account.firstName);
            if (res.length !== 2) {
                await model.createAccount(account);
                return { response: 'Account was created' };
            } else {
                return { response: 'Account already exist' }
            }
        }
    }

    return {
        create
    }
}