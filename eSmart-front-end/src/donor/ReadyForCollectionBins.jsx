import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
import DonorAuth from "../utils/DonorAuth";

export default class ReadyForCollectionBins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bins: [],
            userId: DonorAuth.getClientId(),
            binToCollect: [],
            open: false,
            binName: '',
            date: new Date(),
            time: '',
            value: '',
            binSelected: {}
        }
    }

    componentDidMount() {
        let { userId } = this.state;
        let params = {
            userId
        };
        axios.post(`/donor/get/requests`, params)
            .then(response => {
                let binsArray = response.data;
                this.setState({ bins: binsArray.bins });
            });
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    renderBins = () => {
        let { bins } = this.state;
        if (bins.length !== 0) {
            return <List className='center' sx={{ width: '95%', bgcolor: 'rgba(82, 183, 136, 0.74)', borderRadius: '12px', margin: '12px' }}>
                {bins.map((list) => (
                    <div onClick={this.handleClickOpen}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={list.name} src={binLogo} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${list.name} waste`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Waiting for collector
                                        </Typography>
                                        {" — The waste collector will come for pick-up..."}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress color='info' />
                        </Box>
                        
                    </div>
                ))}

            </List >
        } else {
            return <h4 className='center'>No bins available</h4>
        }
    }


    renderModal = () => {
        return (
            <div>
                <Dialog
                    fullScreen={this.state.fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Schedule pick-up?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Below you can schedule a date for your pick-up
                            <hr />
                            {/* <WasteSchedular /> */}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose}>
                            Cancel pick-up
                        </Button>
                        <Button onClick={this.handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3 className='center'>Bins scheduled for pick-up</h3>
                {this.renderBins()}
                {this.renderModal()}
            </div>
        );
    }
}