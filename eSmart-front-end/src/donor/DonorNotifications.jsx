import React from "react";
import axios from "axios";
import DonorAuth from "../utils/DonorAuth";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default class DonorNotifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            did: DonorAuth.getClientId(),
            viewNotification: false,
            notifications: []
        }
    }

    async componentDidMount() {
        let body = { donorId: this.state.did };
        await axios.post('/donor/notifications', body).then(response => {
            if (response.data.isAvailable) {
                this.setState({ notifications: response.data.notifications[0], viewNotification: response.data.isAvailable });
            }
        })
    }


    render() {
        const { viewNotification, notifications } = this.state;
        return (
            <div className='center'>
                <h3>Notifications</h3>
                <Stack sx={{ width: '100%', borderRadius: '12px' }} spacing={2}>
                    {viewNotification ? (
                        <Alert onClick={this.handleClickOpen} sx={{ borderRadius: '12px' }} severity="info">
                            <AlertTitle>{`${notifications.first_name} ${notifications.last_name}`} </AlertTitle>
                            Is on they way — <strong>open</strong>
                        </Alert>
                    ) : (
                        <h5 className="center">You have no latest notifications</h5>
                    )}
                </Stack>
            </div>
        );
    }
}