import React from 'react'
import { Button, Form, Grid, Header, Image, Segment, Input, } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import binImg from '../esmartbin.png';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import axios from 'axios';
import { Redirect } from 'react-router';
import DonorAuth from '../utils/DonorAuth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
initializeApp(firebaseConfig);
const auth = getAuth();
export default class DonorLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOtpForm: false,
            donorName: '',
            donorLastName: '',
            donorPassword: '',
            donorPhoneNumber: '',
            isAuthenticated: false
        };
    };

    async componentDidMount() {
        await DonorAuth.check();
        this.setState({ isAuthenticated: DonorAuth.getAuth() });
    }


    loginSubmit = (e) => {
        e.preventDefault();
        window.recaptchaVerifier = new RecaptchaVerifier('sendCode', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // onSignInSubmit();
                console.log(response);
            }
        }, auth);

        let firstName = e.target.firstName.value;
        let lastName = e.target.lastName.value;
        let password = e.target.password.value;
        let phoneNumber = e.target.phone.value;
        let newPhone = phoneNumber.trim();
        newPhone = newPhone.slice(1, newPhone.length);
        newPhone = '+27' + newPhone.trim();
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, newPhone, appVerifier).then(confirmationResult => {
            this.setState({ viewOtpForm: true, donorName: firstName, donorLastName: lastName, donorPassword: password, donorPhoneNumber: newPhone });
            window.confirmationResult = confirmationResult;
        }).catch(error => {
            alert(error.message);
        });
    }

    otpSubmit = (e) => {
        e.preventDefault();
        const { donorName, donorLastName, donorPassword, donorPhoneNumber } = this.state;
        let optCode = e.target.otp.value;
        window.confirmationResult.confirm(optCode).then(confirmationResult => {
            let body = {
                firstName: donorName,
                lastName: donorLastName,
                password: donorPassword,
                phoneNumber: donorPhoneNumber
            }
            axios.post('/donor/register', body).then(response => {
                if (response.data.isCreated) {
                    this.setState({ isAuthenticated: true });
                }
            })
        }).catch(error => {
            alert(error.message);
        });
    };

    render() {
        const { viewOtpForm, isAuthenticated } = this.state;
        if (isAuthenticated) {
            return <Redirect to='/donor/signin' />
        }
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={binImg} /> Register as a donor
                    </Header>
                    {!viewOtpForm ? (
                        <>
                            <Form size='large' onSubmit={this.loginSubmit} >
                                <Segment stacked>
                                    <Form.Input fluid icon='user' type='text' autoComplete='false' iconPosition='left' placeholder='First name' name='firstName' />
                                    <Form.Input fluid icon='user' type='text' autoComplete='false' iconPosition='left' placeholder='Last name' name='lastName' />
                                    <Form.Input fluid icon='lock' type='password' autoComplete='false' iconPosition='left' placeholder='Password' name='password' />
                                    <Input label='+27' fluid type='text' autoComplete='false' placeholder='Phone' name='phone' pattern='[0-9]{10}' title='example: 0622635825' />
                                    <div style={{ paddingTop: '5%' }}></div>
                                    <Button id='sendCode' color='teal' fluid size='large' type='submit'>
                                        SignUp
                                    </Button>
                                </Segment>
                            </Form>
                            {/* <Message>
                                New to us? <a href='#'>Sign Up</a>
                            </Message> */}
                        </>
                    ) : (
                        <>
                            <Form size='large' onSubmit={this.otpSubmit}>
                                <Segment stacked>
                                    <Form.Input fluid icon='inbox' type='number' onFocus label='Enter OTP' iconPosition='left' placeholder='OTP code' name='otp' />

                                    <Button color='teal' fluid size='large'>
                                        Verify OTP
                                    </Button>
                                </Segment>
                            </Form>
                        </>
                    )}
                </Grid.Column>
            </Grid>
        );
    }
}