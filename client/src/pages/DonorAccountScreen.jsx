import React from "react";
import BottomTabNavigation from "../components/BottomTabNavigation";
import { Button, Icon } from 'semantic-ui-react'

export default class DonorAccountScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <BottomTabNavigation />
                <h1 className='center'>Hello Account</h1>

                <Button animated='vertical'>
                    <Button.Content hidden>Log out</Button.Content>
                    <Button.Content visible>
                        <Icon name='power off' />
                    </Button.Content>
                </Button>
            </div>
        );
    }
}