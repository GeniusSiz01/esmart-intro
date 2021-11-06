import React from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import appLogo from '../esmartbin.png';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Auth from "../utils/Auth";
import CollectorAuth from "../utils/CollectorAuth";

export default class CollectorSignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            error: '',
            auth: false,
            userAuth: false
        }
    }

    handleErrorMessages = () => {
        let { error } = this.state;
        return (
            <Message color='red'>{error}</Message>
        );
    }

    async checkAuthorization() {
        await Auth.check();
        this.setState({ userAuth: CollectorAuth.getAuth() });
    }

    async componentDidMount() {
        this.checkAuthorization();
    }

    handleSubmit = () => {
        let { email, password } = this.state;
        if (email && password) {
            this.setState({ isLoading: true });
            let params = {
                email: email,
                password: password
            }
            axios.post('http://localhost:3007/collector/signin', params)
                .then(response => {
                    if (response.data.auth) {
                        let token = response.data.token;
                        window.localStorage.setItem('sudo', token);
                        this.setState({ isLoading: false });
                        this.checkAuthorization();
                    } else {
                        this.setState({ error: 'You have entered an invalid email or password', auth: true, isLoading: false });
                    }

                });
        } else {
            this.setState({ error: 'Please enter both email and password', auth: true, isLoading: false });
        }

    }

    handleChange = (event) => {
        let input = event.target.name;
        switch (input) {
            case 'email':
                this.setState({ email: event.target.value });
                break;
            case 'password':
                this.setState({ password: event.target.value });
                break;
            default:
                break;
        }
    }

    render() {
        let { auth, isLoading, userAuth } = this.state;
        let message = '';
        if (auth) {
            message = this.handleErrorMessages();
        }
        if (userAuth) {
            return <Redirect to='/collector/home' />
        }
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={appLogo} /> Log-in as waste a collector
                    </Header>
                    {message}
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' name='email' placeholder='E-mail address' onChange={this.handleChange} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                onChange={this.handleChange}
                            />

                            <Button loading={isLoading} onClick={this.handleSubmit} color='teal' fluid size='large'>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to='signup'>Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
