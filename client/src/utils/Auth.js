import axios from "axios";

const Auth = {
    isAuthenticated: false,
    client_id: 0,
    token: '',

    async check() {
        let jwt = {
            token: ''
        }
        jwt.token = window.localStorage.getItem('sudo');
        if (jwt.token) {
            await axios.post('http://localhost:3007/verify', jwt)
                .then(response => {
                    if (response.data.auth) {
                        this.isAuthenticated = true;
                        this.client_id = response.data.userId;
                    }
                });

        } else {
        }
    },

    getToken() {

    },

    getAuth() {
        return this.isAuthenticated;
    },

    getClientId() {
        return this.client_id;
    },

    signOutUser() { 
        window.localStorage.removeItem('sudo');
    }


}

export default Auth;