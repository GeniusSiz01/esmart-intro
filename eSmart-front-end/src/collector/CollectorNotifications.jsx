import * as React from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import CollectorAuth from '../utils/CollectorAuth';
import MapBox from '../components/MapBox';

export default class CollectorNotifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: [],
            cid: CollectorAuth.getClientId(),
            viewNotifications: false
        }
    }

    async componentDidMount() {
        let params = { collectorId: this.state.cid }
        await axios.post(`/collector/notifications`, params).then(response => {
            if (response.data.isAvailable) {
                console.log(response.data);
                this.setState({ notifications: response.data.notifications.lenght ? 2 : response.data.notifications[0], viewNotifications: response.data.isAvailable });
            }
        });
    }

    render() {
        const { viewNotifications, notifications } = this.state;
        return (
            <div className='center'>
                {/* <h3>Notifications</h3> */}
                <Stack sx={{ width: '100%', borderRadius: '12px' }} spacing={2}>
                    {viewNotifications ? (
                        // <Alert onClick={this.handleClickOpen} sx={{ borderRadius: '12px' }} severity="info">
                        //     <AlertTitle>{`${notifications.firstname} ${notifications.lastname}`} </AlertTitle>
                        //     Is waiting for you to collect thier waste — <strong>open</strong>
                        // </Alert>
                        <MapBox address={notifications.residential_address} phone={notifications.cell_number} cid={this.state.cid} />

                    ) : (
                        <h5 className="center">You have no latest notifications</h5>
                    )}
                </Stack>
            </div>
        );
    }
}
