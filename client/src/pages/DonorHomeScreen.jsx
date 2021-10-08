import React from 'react';
import BottomTabNavigation from '../components/BottomTabNavigation';
import DonorBins from '../components/DonorBins';
import DonorNavigationBar from '../components/DonorNavigationBar';
import { Container } from 'bootstrap-4-react';


export default class DonorHomeScreen extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <BottomTabNavigation />
                <Container>
                    <DonorBins />
                </Container>
            </div>
        );
    }
}