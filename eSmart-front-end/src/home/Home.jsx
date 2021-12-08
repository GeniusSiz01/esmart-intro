import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import appLogo from '../esmartbin.png';
import Stack from '@mui/material/Stack';

export default class Home extends React.Component {
    render() {
        console.log("home route running");
        return (
            <div className='center'>
                <div>
                    <Stack spacing={10}>
                        <div>
                            <h2>One's man trash is another man's opportunity</h2>
                        </div>

                        <div>
                            <img src={appLogo} width='200' alt="" />
                        </div>

                        <div>
                            <Grid container spacing={2} columns={16}>
                                <Grid item xs={8}>
                                    <a style={{ textDecoration: 'none' }} href="/#/donor/app">
                                        <Button className='btn1' variant="contained">Waste donor</Button>
                                    </a>
                                </Grid>
                                <Grid item xs={8}>
                                    <a style={{ textDecoration: 'none' }} href="/#/collector/app">
                                        <Button className='btn1' variant="contained">Waste collector</Button>
                                    </a>
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </div>
            </div>
        );
    }
}