import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CollectorNavigation from "./CollectorNavigaion";
export default class CollectorHomeScreen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <CollectorNavigation />
                <Container fixed>
                </Container>
            </React.Fragment>
        );
    }
}