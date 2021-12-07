import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from './home/Home';
import DonorHomeScreen from './donor/DonorHomeScreen';
import CollectorHomeScreen from './collector/CollectorHomeScreen';
import DonorAuth from './utils/DonorAuth';
import CollectorAuth from './utils/CollectorAuth';
import DonorLogin from './components/DonorLogin';
import DonorSignIn from './components/DonorSignIn';
import CollectorSignIn from './components/CollectorSignIn';
import CollectorSignUp from './components/CollectorSignUp';

export default class Router extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <DonorPrivateRoute path="/donor/app" component={DonorHomeScreen} />
                        <CollectorPrivateRoute path="/collector/app" component={CollectorHomeScreen} />

                        <Route path="/donor/register" >
                            <DonorLogin />
                        </Route>
                        <Route path="/donor/signin" component={DonorSignIn} />
                        <Route path="/collector/signin" component={CollectorSignIn} />
                        <Route path="/collector/register" component={CollectorSignUp} />
                        <Route path="/" component={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}


const DonorPrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            DonorAuth.getAuth() ? (
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

const CollectorPrivateRoute = ({ component: Component, ...rest }) => (
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
