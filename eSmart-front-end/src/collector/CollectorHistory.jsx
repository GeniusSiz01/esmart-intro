import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import moment from "moment";


export default class CollectorHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bins: [],
            userId: 0,
            open: false,
            binName: '',
            donorName: '',
            binTypes: [],
            donorId: 0
        }
    }

    async componentDidMount() {
        let params = {
            collectorId: 8
        }
        await axios.get(`/collector/history/${params.collectorId}`)
            .then(response => {
                let binsArray = response.data;
                this.setState({ bins: binsArray.history });
            });
    }


    render() {
        let { bins } = this.state;

        return (
            <div>
                <h3 className='center'>History</h3>
                <List className='center' sx={{ width: '100%', bgcolor: 'rgba(82, 183, 136, 0.74)', borderRadius: '12px' }}>
                    {bins.map((list) => (
                        <div>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={list.firstname} src='/static/images/avatar/1.jpg' />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${list.firstname + " " + list.lastname}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Collected
                                            </Typography>
                                            {` — ${list.name} waste`}
                                        </React.Fragment>
                                    }
                                />
                                <ListItemText secondary={moment(list.date_time).fromNow()} />
                            </ListItem>

                        </div>
                    ))}
                </List >
            </div>
        );
    }
}