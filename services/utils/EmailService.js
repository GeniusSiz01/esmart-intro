import Verifier from 'email-verifier';

export default class EmailServices {

    verifyEmail = async (email) => {
        let verifier = new Verifier("at_LduR7GIoEt6gOYvU6zp6mX0r8iLQl");
        let isValid = false;
        verifier.verify(email, (err, data) => {
            if (err) throw err;
            else if (data.smtpCheck) {
                isValid = true;
            }
        });
        if (isValid) {
            return true;
        } else {
            return true
        }
    }
}