import React from 'react';
import CollectorNavigation from '../components/CollectorNavigation';
import CollectorBins from '../components/CollectorBins';
import { Container } from 'bootstrap-4-react';


export default class CollectorHomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CollectorNavigation />
                
                <Container>
                    <CollectorBins />
                </Container>
            </div>
        );
    }
}