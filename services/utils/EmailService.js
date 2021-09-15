const Verifier = require('email-verifier');

export default class EmailServices {

    verifyEmail = async (email) => {
        let verifier = new Verifier("at_LduR7GIoEt6gOYvU6zp6mX0r8iLQl");
        verifier.verify(email, (err, data) => {
            if (err) throw err;
            console.log(data);
        });
    }
}