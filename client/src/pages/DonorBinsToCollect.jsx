import React from "react";
import BottomTabNavigation from "../components/BottomTabNavigation";
import ReadyToCollect from "../components/ReadyToCollectBins";
import { Container } from 'bootstrap-4-react';
export default class DonorBinsToCollect extends React.Component {

    render() {
        return (
            <div>
                <BottomTabNavigation />
                <Container>
                    <ReadyToCollect />
                </Container>
            </div>
        );
    }
}