export default class CellNumberService {

    verifyCellNumber = async (cellNumber) => {
        const regex = '/^0(6|7|8){1}[0-9]{1}[0-9]{7}$/';
        let number = cellNumber.replace(/\s/g, '');
        if (regex.test(number) === true) {
            console.log(number);
            return true
        }
        return false
    }
}