import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import DonorNavigation from "./DonorNavigation";

export default class DonorHomeScreen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <DonorNavigation />
                <Container fixed>
                </Container>
            </React.Fragment>
        );
    }
}