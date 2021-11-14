import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import binImg from '../esmartbin.png';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import DonorAuth from "../utils/DonorAuth";

export default class BinsHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            bins: [],
            binName: '',
            firstName: '',
            lastName: '',
            userId: DonorAuth.getClientId(),
            binToCollect: [],
            isLoading: false,
        }
    }

    componentDidMount() {
        axios.post(`http://localhost:8000/donor/home`)
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

    openModal = (e) => {
        let { bins } = this.state;
        this.setState({ open: true });
        const binId = Number(e.currentTarget.id);
        bins.forEach(bin => {
            if (bin.id === binId) {
                this.setState({ binName: bin.name, binToCollect: bin });
            }
        });
    }

    handleRequest = async () => {
        let { binToCollect, userId } = this.state;
        this.setState({ open: false });
        let params = {
            userId: userId,
            binId: binToCollect.id
        }
        if (binToCollect.length !== 0) {
            await axios.post('http://localhost:8000/donor/send/request', params)
                .then(response => {

                });
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
                        {"Send request for pick-up?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Send the request for collectors near you to come and pick-up your waste bin
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={this.handleClose}>
                            Cancel request
                        </Button>
                        <Button onClick={this.handleRequest} >
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }


    render() {
        let { bins } = this.state;
        return (
            <div>
                <h3 className='center'>Welcome UserTest to eSmart</h3>
                <Box className='center' sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {bins.map((list) => (
                            <Grid item xs={6}>
                                <div className='block center' id={list.id} onClick={this.openModal}>
                                    <p><strong>{list.name}</strong></p>
                                    <img src={binImg} width='95' alt="" />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Box >
                {/* <Box sx={{ width: '100%' }}>
                    <h5 className="center">Please wait..</h5>
                    <LinearProgress color="success" />
                </Box> */}
                {this.renderModal()}
            </div>
        );
    }
}