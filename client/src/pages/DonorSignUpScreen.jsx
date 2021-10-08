import React from "react";
import { Button, Form, Grid, Header, Image, Message, Segment, Radio, Checkbox } from 'semantic-ui-react';
import appLogo from '../esmartbin.png';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class DonorSignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            idNumber: 0,
            password: '',
            gender: ''
        }

    }

    handleChange = (e, { value }) => {
        this.setState({ value });

    }

    handleFormInpu = (event) => {
        let input = event.target.name;
        switch (input) {
            case 'firstName':
                this.setState({ firstName: event.target.value });
                break;
            case 'lastName':
                this.setState({ lastName: event.target.value });
                break;
            case 'phoneNumber':
                this.setState({ phoneNumber: event.target.value });
                break;
            case 'emailAddress':
                this.setState({ email: event.target.value });
                break;
            case 'idNumber':
                this.setState({ idNumber: event.target.value });
                break;
            case 'password':
                this.setState({ password: event.target.value });
                break;
            default:
                break;
        }

    }

    handleSubmit = () => {
        let { firstName, lastName, phoneNumber, email, idNumber, password, value } = this.state;
        if (firstName && lastName && phoneNumber && email && idNumber && password && value) {
            let params = {
                Firstname: firstName,
                Lastname: lastName,
                Phonenumber: phoneNumber,
                email: email,
                Idnuber: idNumber,
                password: password,
                gender: value
            }
            axios.post('http://localhost:3007/donor/signup', params)
                .then(response => {
                    let token = response.data.token;
                    window.localStorage.setItem('sudo', token);
                    console.log(response.data);
                });
        } else {
            console.log('please enter all details');
        }
    }

    render() {
        const { value } = this.state;
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={appLogo} /> Create waste donor account
                    </Header>
                    <Form size='large' >
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' name='firstName' placeholder='First name' onChange={this.handleFormInpu} />
                            <Form.Input fluid icon='user' iconPosition='left' name='lastName' placeholder='Last name' onChange={this.handleFormInpu} />
                            <Form.Input fluid icon='phone' iconPosition='left' name='phoneNumber' placeholder='Phone number' onChange={this.handleFormInpu} />
                            <Form.Input fluid icon='user' iconPosition='left' name='emailAddress' placeholder='E-mail address' onChange={this.handleFormInpu} />
                            <Form.Input fluid icon='id card' iconPosition='left' name='idNumber' type='number' placeholder='ID number' onChange={this.handleFormInpu} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                onChange={this.handleFormInpu}
                            />
                            <Form.Group inline>
                                <label>Gender</label>
                                <Form.Field control={Radio} label='Female' value='Female' checked={value === 'Female'} onChange={this.handleChange} />
                                <Form.Field control={Radio} label='Male' value='Male' checked={value === 'Male'} onChange={this.handleChange} />
                            </Form.Group>

                            <Button type='submit' onClick={this.handleSubmit} color='teal' fluid size='large'>
                                Sign up
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>

            </Grid>
        );
    }
}