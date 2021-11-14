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
import CollectorAuth from "../utils/CollectorAuth";
import NotificationSnackBar from "../components/NotificationSnackBar";



const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


export default class CollectorActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bins: [],
            userId: CollectorAuth.getClientId(),
            open: false,
            binName: '',
            donorName: '',
            binTypes: [],
            donorId: 0
        }
    }

    componentDidMount() {
        let params = {
            id: this.state.userId
        }
        axios.post(`http://localhost:8000/bins/full`, params)
            .then(response => {
                let binsArray = response.data;
                this.setState({ bins: binsArray.readyBins, userId: response.data.collector.id });
            });
    }

    handleClickOpen = (e) => {
        let { bins } = this.state;
        this.setState({ open: true });
        let donorId = Number(e.currentTarget.id);
        console.log(donorId);
        bins.forEach(donors => {
            if (donors.id === donorId) {
                let params = {
                    donorId
                };
                axios.post('http://localhost:8000/accept/request', params)
                    .then(response => {
                        console.log(response.data);
                        this.setState({ binTypes: response.data.bins, donorId: response.data.bins[0].waste_donor_id });
                    });
                this.setState({ donorName: `${donors.firstname + " " + donors.lastname}` });
            }
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleAccept = () => {
        let { binTypes, userId, donorId } = this.state;
        this.setState({ open: false });
        let params = {
            donorId: donorId,
            collectorId: userId,
            binTypeId: binTypes
        };
        axios.post('http://localhost:8000/collect', params);
    }

    renderModal = () => {
        let { binTypes, donorName } = this.state;
        return (
            <div>
                <Dialog
                    fullScreen={this.state.fullScreen}
                    open={this.state.open}
                    onClose={this.handleAccept}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Accept request?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <strong>{donorName}</strong> Has the following bins
                            <Grid item xs={12} md={6}>
                                <Demo>
                                    <List dense={true}>
                                        {binTypes.map((list) => (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={binLogo} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={list.name + " " + 'waste'}
                                                    secondary={'Secondary text'}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Demo>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAccept}>
                            close
                        </Button>
                        <NotificationSnackBar open={true} />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    renderBins = () => {
        let { bins } = this.state;
        let screen = ''
        if (bins.length !== 0) {
            return <List className='center' sx={{ width: '100%', bgcolor: 'rgba(82, 183, 136, 0.74)', borderRadius: '12px' }}>
                {bins.map((list) => (
                    <div id={list.id} onClick={this.handleClickOpen}>
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
                                            Ready for collection
                                        </Typography>
                                        {" — This bin is full and is ready for pick-up. Select to accept request"}
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
            return <h5 className='center'>No bins available for collection</h5>
        }
    }

    render() {
        let { bins } = this.state;

        return (
            <div>
                <h3 className='center'>Bins available for pick-up</h3>
                {this.renderBins()}
                {this.renderModal()}
            </div>
        );
    }
}