import React from 'react';
import CollectorNavigation from '../components/CollectorNavigation';
import CollectorHistory from '../components/CollectorHistrory';
import { Container } from 'bootstrap-4-react';


export default class CollectorHistoryScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CollectorNavigation />

                <Container>
                    <CollectorHistory />
                </Container>
            </div>
        );
    }
}