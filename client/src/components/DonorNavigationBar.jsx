import React from "react";
import { Link } from "react-router-dom";
import AppLogo from '../esmartbin.png';


export default class DonorNavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav class="navbar navbar-expand-lg  navbar-light  py-3" style={{ backgroundColor: 'rgba(196, 196, 196, 0.74)' }}>
                <div class="container-fluid container">
                    <img src={AppLogo} alt="" width='38' />
                    <a class="navbar-brand companyName" href="#">eSmart</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                            <li class="nav-item">
                                <Link to='/donor/home'>
                                    <h3 className='appLinks'> <a class="nav-link active" aria-current="page" href="#">Home</a></h3>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/donor/history'>
                                    <h3 className='appLinks'><a class="nav-link active" aria-current="page" href="#">history</a></h3>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/donor/account'>
                                    <h3 className='appLinks'><a class="nav-link active" aria-current="page" href="#">Account</a></h3>
                                </Link>
                            </li>
                        </ul>

                        <div class="d-flex">
                            <Link to='/signout'>
                                <button class="btn signUpBtn" type="button">Sign out</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}