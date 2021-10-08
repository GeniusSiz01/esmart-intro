import React from 'react';
import { Loader, Card, Icon, Label, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import _ from 'lodash';


export default class ReadyToCollect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bins: [],
            userId: 0,
            binToCollect: []
        }

    }

    componentDidMount() {
        let params = {
            id: 8
        }
        axios.post(`http://localhost:3007/bins/full/`, params)
            .then(response => {
                console.log(response.data.readyBins);
                let binsArray = response.data;
                this.setState({ bins: binsArray.readyBins });
            });
    }

    renderBinRequest = async () => {
        const { bins } = this.state;
        const binsList = _.groupBy()
    }


    render() {
        const { bins } = this.state;
        return (
            <div className=''>
                <h5 className='center' style={{ paddingTop: 15 }}></h5>

                <Card.Group itemsPerRow={3} stackable centered doubling>
                    {bins.map((list) => (
                        <Card key={list.id} id={list.id} onClick={this.handleOrders} color='teal' >
                            <Card.Content>
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
            </div>
        );
    }
}

