import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import binLogo from '../esmartbin.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
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
        await axios.get(`https://e-smart-web.herokuapp.com/collector/history/${params.collectorId}`)
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