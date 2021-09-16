import EmailServices from "../utils/EmailService";
import Accounts, { WasteCollectorAccountSchema } from '../models/Accounts';
let emailService = new EmailServices;


export default class CreateWasteCollectorAccount {


    create = async (account: WasteCollectorAccountSchema) => {
        // let createAccount = CreateAccounts(Pool);

        if (await emailService.verifyEmail(account.email)) { // valide email
            // if (cellNumberService.verifyCellNumber(cellNumber)) { // check if the number is valid
            if (account.firstName && account.lastName && account.location && account.cellNumber && account.email && account.idNumber && account.gender && account.age) { // checking if info is available and not empty strings
                // do something if the info is valid and save data
                // await createAccount.createWasteCollectorAccount(account);    
                let collector = new Accounts(account);
                // let res = await Accounts.findOne();
                // console.log(res?._id);
                
                // await 
                return { response: 'Account created', account }
            }
            // } else {
            // return { response: 'Your cell number is invalid' }
            // }

        } else {
            return { response: 'Your email is invalid' }
        }
    }
}