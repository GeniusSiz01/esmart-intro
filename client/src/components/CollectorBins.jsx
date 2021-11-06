import React from 'react';
import { Loader, Card, Icon, Label, Image, Modal, Button, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import _ from 'lodash';


export default class ReadyToCollect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bins: [],
            userId: 0,
            binToCollect: [],
            open: false,
            donorName: '',
            binTypes: []
        }

    }

    componentDidMount() {
        let params = {
            id: 8
        }
        axios.post(`http://localhost:3007/bins/full/`, params)
            .then(response => {
                let binsArray = response.data;
                console.log(binsArray);
                this.setState({ bins: binsArray.readyBins });
            });
    }

    renderBinRequest = async () => {
        const { bins } = this.state;
        const binsList = _.groupBy()
    }

    handleCollectRequest = () => {
        this.setState({ open: false })
    }

    handleCloseModal = () => {
        this.setState({ open: false })
    }

    handleOpenModal = (e) => {
        let { bins } = this.state;
        this.setState({ open: true });
        let donorId = Number(e.currentTarget.id);
        bins.forEach(donors => {
            if (donors.id === donorId) {
                let params = {
                    donorId
                }
                axios.post('http://localhost:3007/collector/waste/donor/full', params).then(response => {
                    console.log(response.data);
                    this.setState({ binTypes: response.data.bins });
                });
                
                this.setState({ donorName: `${donors.firstname + " " + donors.lastname}` });
            }
        });
    }

    renderModal = () => {
        let { donorName, open, binTypes } = this.state;
        return (
            <Modal style={{ height: 447 }} size='fullscreen' open={open}>
                <Modal.Header>{`${donorName} waste donor`}</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to collect this pick up</p>
                    {binTypes.map((list) => (
                        <List divided relaxed>
                            <List.Item>
                                <List.Icon name='square full' size='large' verticalAlign='middle' />
                                <List.Content>
                                    BinType:<List.Header as='a'>{list.name} waste bin</List.Header>
                                    <List.Description as='a'>request sent 10 mins ago</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    ))}

                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.handleCloseModal} >
                        No
                    </Button>
                    <Button positive onClick={this.handleCollectRequest} >
                        Collect
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
                        <Card key={list.id} onClick={this.handleOrders} color='teal' >
                            <Card.Content onClick={this.handleOpenModal} id={list.id}>
                                <Image floated='right'>
                                    <Loader active size='small' />
                                </Image>
                                <Card.Header>{`${list.firstname} ${list.lastname}`}</Card.Header>
                                <Card.Description>
                                    {list.status}
                                </Card.Description>
                                <Card.Meta><Icon name='trash' /> Capacity {`Full`}</Card.Meta>
                            </Card.Content>
                            <Label attached='bottom right' >Ready for collection
                            </Label>
                        </Card>

                    ))}
                </Card.Group>
                {this.renderModal()}
            </div>
        );
    }
}

