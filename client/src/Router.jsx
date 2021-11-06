import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DonorScreen from './pages/DonorHomeScreen';
import HomeScreen from './pages/HomeScreen';
import CollectorHomeScreen from './pages/CollectorHomeScreen';
import HistoryScreen from './pages/DonorHistoryScreen';
import DonorAccountScreen from './pages/DonorAccountScreen';
import DonorSignInScreen from './pages/DonorSignInScreen';
import DonorSignUpScreen from './pages/DonorSignUpScreen';
import DonorBinsToCollect from './pages/DonorBinsToCollect';
import CollectorSignInScreen from './pages/CollectorSigninScreen';
import CollectorHistoryScreen from './pages/CollectorHistoryScreen';
import Auth from './utils/Auth';
import { Redirect } from 'react-router';
import CollectorAuth from './utils/CollectorAuth';

export default class Router extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute path="/donor/home" component={DonorScreen} />
                        <PrivateRoute path="/donor/history" component={HistoryScreen} />
                        <PrivateRoute path="/donor/account" component={DonorAccountScreen} />
                        <PrivateRoute path="/donor/bins" component={DonorBinsToCollect} />
                        <Route path="/donor/signin" component={DonorSignInScreen} />
                        <Route path="/donor/signup" component={DonorSignUpScreen} />
                        <Route path="/collector/signin" component={CollectorSignInScreen} />
                        <Route path="/collector/signup" component={CollectorSignInScreen} />
                        <WasteCollector path="/collector/home" component={CollectorHomeScreen} />
                        <WasteCollector path="/collector/history" component={CollectorHistoryScreen} />
                        <Route path="/" component={HomeScreen} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.getAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/donor/signin"
                    }}
                />
            )
        }
    />
);

const WasteCollector = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            CollectorAuth.getAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/collector/signin"
                    }}
                />
            )
        }
    />
);