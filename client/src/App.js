import React from 'react';
import Router from './Router';
import Auth from './utils/Auth';
import CollectorAuth from './utils/CollectorAuth';


export default class App extends React.Component {

    async componentDidMount() {
        await Auth.check();
        await CollectorAuth.check();
    }

    render() {
        return (
            <Router />
        );
    }
};