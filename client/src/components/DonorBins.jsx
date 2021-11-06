import React from 'react';
import appLogo from '../esmartbin.png';
import { Grid, Modal, Button, Loader, Dimmer } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import Auth from '../utils/Auth';


export default class DonorBins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            bins: [],
            binName: '',
            firstName: '',
            lastName: '',
            userId: Auth.getClientId(),
            binToCollect: [],
            isLoading: false
        }

    }

    componentDidMount() {
        let { userId } = this.state;
        let params = {
            donorId: userId
        }
        console.log(userId);
        axios.get(`http://localhost:3007/home/${userId}`,)
            .then(response => {
                let binsArray = response.data;
                this.setState({ bins: binsArray.wasteDonor });
                if (binsArray.binCount === 0) {
                    this.setState({ isLoading: true });
                    axios.post('http://localhost:3007/add/bins', params)
                        .then(response => {
                            console.log(response.data);
                            if (response.data.isAdded) {
                                this.setState()
                                setTimeout(() => {
                                    console.log("closing loader.....");
                                    this.setState({ bins: response.data.bins, isLoading: false });
                                }, 10000);
                            }
                        });
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
            await axios.post('http://localhost:3007/donor/request', params)
                .then(response => {

                });
        }
    }

    handleCloseModal = () => {
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

    renderModal = () => {
        let { open, binName } = this.state;
        return (
            <Modal style={{ height: 200 }} size='fullscreen' open={open}>
                <Modal.Header>{`${binName} waste bin`}</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to request for pick-up</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.handleCloseModal} >
                        No
                    </Button>
                    <Button positive onClick={this.handleRequest} >
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    render() {
        const { bins, isLoading } = this.state;
        return (
            <div className=''>
                <h5 className='center' style={{ paddingTop: 15 }}>Welcome to eSmart solutions</h5>
                <Dimmer active={isLoading}>
                    <Loader content='Allocating bins to your account please wait.' />
                </Dimmer>
                <Grid doubling columns={4}>
                    {bins.map((list) => (
                        <Grid.Column key={`${list.id}`}>
                            <div onClick={this.openModal} id={`${list.id}`} className='block center' >
                                <p><strong>{`${list.name}`}</strong> {`${list.filled_capacity ? 0 : 'empty'}`}</p>
                                <img src={appLogo} alt="" width='100' />
                                {/* <Loader active inline='centered' size='mini' content='waiting' /> */}
                            </div>
                        </Grid.Column>
                    ))}
                </Grid>
                {this.renderModal()}
                {/* <Button fluid positive>Request pick up for all bins</Button> */}
            </div>
        );
    }
}