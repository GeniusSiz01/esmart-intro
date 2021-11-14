import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import CollectorAuth from '../utils/CollectorAuth';
// import ShowDonorLocation from './ShowDonorLocation';
import io from "socket.io-client";

const socket = io.connect('/');
export default class CollectorNotifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: []
        }
    }

    async componentDidMount() {
        socket.emit("notifications", { collectorId: CollectorAuth.getClientId() });
        let params = {
            collectorId: 8
        }
        await axios.get(`https://e-smart-web.herokuapp.com/collector/notifications/${params.collectorId}`)
            .then(response => {
                this.setState({ notifications: response.data.notifications.lenght ? 2 : response.data.notifications[0] })
            });
    }

    renderNotifications = () => {
        let { notifications } = this.state;
        console.log(notifications);
        let notify = '';
        // if (notifications !== undefined) {
        // if (notifications.status) {
        notify = <Alert onClick={this.handleClickOpen} sx={{ borderRadius: '12px' }} severity="info">
            <AlertTitle>{`${notifications.firstname} ${notifications.lastname}`} </AlertTitle>
            Is waiting for you to collect thier waste — <strong>open</strong>
        </Alert>
        //     } else if (!notifications.status) {
        //         notify = <Alert sx={{ borderRadius: '12px' }} severity="success">
        //             <AlertTitle>{`${notifications.firstname} ${notifications.lastname}`}</AlertTitle>
        //             You have collected their waste — <strong>closed</strong>
        //         </Alert>
        //     }
        // } else {
        //     notify = "No notifications available"
        // }
        return (
            notify
        );
    }

    render() {
        return (
            <div className='center'>
                <h3>Notifications</h3>
                <Stack sx={{ width: '100%', borderRadius: '12px' }} spacing={2}>
                    {this.renderNotifications()}
                    {/* <ShowDonorLocation /> */}
                    {/* <hr /> */}
                    {/* <MapContainer /> */}
                </Stack>
            </div>
        );
    }
}
