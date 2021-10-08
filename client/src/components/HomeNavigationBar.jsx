import React from "react";
import { Link } from "react-router-dom";
import AppLogo from '../esmartbin.png';
// import 'bootstrap/dist/css/bootstrap.min.css';



export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav class=" navbar-expand-lg navbar appNav navbar-light  py-3" style={{ backgroundColor: 'rgba(196, 196, 196, 0.74)', }}>
                <div class="container-fluid">
                <img src={AppLogo} alt="" width='38' />
                    <a class="navbar-brand companyName" href="#">eSmart</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Company
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">About us</a></li>
                                    <li><a class="dropdown-item" href="#">How eSmart work</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Careers</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                {/* <Link to='/'>
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </Link> */}
                            </li>
                        </ul>

                        <div class="d-flex">
                            <Link to='/signin'>
                                <button class="btn signUpBtn" type="button">Log in</button>
                            </Link>
                            {' '}
                            <Link to='/signup'>
                                <button class="btn signUpBtn" type="button">Sign up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}