import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import moment from "moment";


export default class DonorHistory extends React.Component {
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
            donorId: this.state.userId
        }
        await axios.get(`/donor/history/${params.donorId}`, params)
            .then(response => {
                let binsArray = response.data;
                console.log(binsArray);
                this.setState({ bins: binsArray.history });
            });
    }

    renderHistory = () => {
        let { bins } = this.state;
        if (bins.length !== 0) {
            return (
                <div>
                    <h3 className='center'>History</h3>
                    <List className='center' sx={{ width: '100%', bgcolor: 'rgba(82, 183, 136, 0.74)', borderRadius: '12px' }}>
                        {bins.map((list) => (
                            <div>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={list.first_name} src='/static/images/avatar/1.jpg' />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${list.first_name + " " + list.last_name}`}
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
        } else {
            return (
                <div>
                    <h3 className='center'>No pick up history</h3>
                </div>
            );
        }
    }


    render() {
        return (
            <div>
                {this.renderHistory()}
            </div>
        );
    }
}