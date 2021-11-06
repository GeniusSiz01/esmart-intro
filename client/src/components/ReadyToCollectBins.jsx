import React from 'react';
import { Loader, Card, Icon, Label, Image, Modal, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import Auth from '../utils/Auth';
import PickUpScheduler from './PickUpScheduler';
import TimePicker from 'react-time-picker';


export default class ReadyToCollect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bins: [],
            userId: Auth.getClientId(),
            binToCollect: [],
            open: false,
            binName: '',
            date: new Date(),
            time: '',
            value: '',
            binSelected: {}
        }
    }

    onChange = date => {
        this.setState({ date: date });
    }

    handleEditRequest = () => {
        let { value } = this.state;
        this.setState({ open: false });
    }


    openModal = (e) => {
        let { bins } = this.state;
        let binId = Number(e.currentTarget.id);
        this.setState({ open: true });
        bins.forEach(binsList => {
            if (binId === binsList.id) {
                this.setState({ binName: binsList.name, binSelected: binsList });
            }
        });
    }

    closeModal = async () => {
        this.setState({ open: false });
        let params = {
            donorId: this.state.binSelected.waste_donor_id,
            binId: this.state.binSelected.id
        }
        axios.post('http://localhost:3007/donor/cancel/request', params);
    }


    componentDidMount() {
        axios.get(`http://localhost:3007/donor/get/${this.state.userId}`,)
            .then(response => {
                let binsArray = response.data;
                this.setState({ bins: binsArray.wasteDonor });
            });
    }

    renderTimePicker = () => {

    }

    renderModal = () => {
        let { open, binName, date } = this.state;
        return (
            <Modal style={{ height: 399 }} size='fullscreen' open={open}>
                <Modal.Header>{`${binName} waste bin`}</Modal.Header>
                <Modal.Content>
                    <p>Change pick up date or cancel pick up.</p>

                </Modal.Content>
                <Modal.Actions>
                    <h5>Pick up date</h5>
                    <PickUpScheduler name='date' />
                    <hr />
                    {/* <h5>Pick up time</h5> */}
                    {/* <TimePicker name='time' value={new Date()} onChange={new Date()} /> */}
                </Modal.Actions>
                <Modal.Actions>
                    <Button negative onClick={this.closeModal} >
                        Cancel pick up
                    </Button>
                    <Button positive onClick={this.handleEditRequest} >
                        Edit pick up
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }


    render() {
        const { bins } = this.state;
        return (
            <div className=''>
                <h5 className='center' style={{ paddingTop: 15 }}></h5>

                <Card.Group itemsPerRow={3} stackable centered doubling>
                    {bins.map((list) => (
                        <Card onClick={this.openModal} key={list.id} id={list.id} color='teal' >
                            <Card.Content>
                                <Image floated='right'>
                                    <Loader active size='small' />
                                </Image>
                                <Card.Header>{list.name}</Card.Header>
                                <Card.Description>
                                    {list.status}
                                </Card.Description>
                                <Card.Meta><Icon name='trash' /> Capacity {`full`}</Card.Meta>
                            </Card.Content>
                            <Label attached='bottom right' >Waiting for collector

                            </Label>
                        </Card>
                    ))}
                </Card.Group>
                {this.renderModal()}
            </div>
        );
    }
}

