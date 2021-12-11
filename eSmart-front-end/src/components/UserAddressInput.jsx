import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import axios from 'axios';

export default class UserAddressInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isDisabled: false
        }
    }

    addUserAddressSubmit = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        let address = e.target.address.value;
        if (address) {
            let body = { address, donorId: this.props.did }
            await axios.post('/donor/add/address', body).then(response => {
                if (response.data.isAdded) {
                    this.setState({ isLoading: false, isDisabled: true });
                } else { 
                    
                }
            });
        }
    }

    render() {
        const { isLoading, isDisabled } = this.state;
        return (
            <form onSubmit={this.addUserAddressSubmit}>
                <Input loading name='address' type='text' placeholder='Address. . . .' action>
                    <input />
                    <Button disabled={isDisabled} loading={isLoading} type='submit' positive>Add</Button>
                </Input>
            </form>
        );
    }
}