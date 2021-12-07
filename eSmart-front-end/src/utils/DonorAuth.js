import axios from "axios";

const DonorAuth = {
    isAuthenticated: false,
    client_id: 0,
    token: '',

    async check() {
        let jwt = {
            token: ''
        }
        jwt.token = window.localStorage.getItem('sudo');
        if (jwt.token) {
            await axios.post('/verify/donor/token', jwt)
                .then(response => {
                    if (response.data.auth) {
                        this.isAuthenticated = true;
                        this.client_id = response.data.userId;
                    } else {
                        console.log('user not signed in');
                    }
                });

        } else {

        }
    },

    getToken() {

    },

    getAuth() {
        return this.isAuthenticated;
        // return true
    },

    getClientId() {
        return this.client_id;
        // return 11;
    },

    signOutUser() {
        window.localStorage.removeItem('sudo');
    }


}

export default DonorAuth;