import React from "react";
import DonorLogin from "../components/DonorLogin";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6G46Jang8fkPnhYUI6UVvI6G8FjcQ44A",
    authDomain: "esmart-e6ed0.firebaseapp.com",
    projectId: "esmart-e6ed0",
    storageBucket: "esmart-e6ed0.appspot.com",
    messagingSenderId: "1027784695916",
    appId: "1:1027784695916:web:5b16914c3325133b607849"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default class DonorSignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOtpForm: false,

        }
    }




    render() {
        let { viewOtpForm } = this.state;
        return (
            <>
                <DonorLogin viewOtpForm={viewOtpForm} loginSubmit={this.loginSubmit} otpSubmit={this.otpSubmit} />
            </>
        );
    }
}