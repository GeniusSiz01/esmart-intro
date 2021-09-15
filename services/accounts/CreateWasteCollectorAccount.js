import CellNumberService from "../utils/CellNumberService";
import EmailServices from "../utils/EmailService";
let cellNumberService = new CellNumberService;
let emailService = new EmailServices;

export default class CreateWasteCollectorAccount {

    create = async (userSignUpInfo) => {
        let { firstName, lastName, location, cellNumber, email, idNumber, gender, age } = userSignUpInfo;
        // let exist = false;
        if (emailService.verifyEmail(email)) { // valide email
            if (cellNumberService.verifyCellNumber(cellNumber)) { // check if the number is valid
                if (firstName && lastName && location && cellNumber && email && idNumber && gender && age) { // checking if info is available and not empty strings
                    // do something if the info is valid
                }
            } else {
                return { response: 'Your cell number is invalid' }
            }

        } else {
            return { response: 'Your email is invalid' }
        }
    }
}