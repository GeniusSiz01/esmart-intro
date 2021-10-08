import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle, faComment, faCommentAlt, faTrashAlt, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import AppLogo from '../esmartbin.png';
import { Link } from 'react-router-dom';


const tabs = [{
    route: "/donor/home",
    icon: faHome,
    label: "Home"
}, {
    route: "/donor/bins",
    icon: faTrashAlt,
    label: "Bins"
}, {
    route: "/donor/history",
    icon: faCalendarTimes,
    label: "History"
}, {
    route: "/donor/account",
    icon: faUserCircle,
    label: "Account"
}]

export default class BottomTabNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav style={{ backgroundColor: 'rgba(196, 196, 196, 0.74)' }} className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" role="navigation">
                    <div className="container-fluid">
                        <img src={AppLogo} alt="" width='38' />
                        <a className="navbar-brand" href="/home">eSmart solutions</a>
                        <Nav className="ml-auto">
                            <NavItem>
                                <NavLink style={{ color: 'black' }} to="/donor/home" className="nav-link">
                                    Home
                                </NavLink>
                            </NavItem>


                            <NavItem>
                                <NavLink style={{ color: 'black' }} to="/donor/bins" className="nav-link">
                                    Bins
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink style={{ color: 'black' }} to="/donor/history" className="nav-link">
                                    History
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink style={{ color: 'black' }} to="/donor/account" className="nav-link">
                                    Account
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </nav>
                <nav style={{ backgroundColor: 'rgba(196, 196, 196, 0.74)' }} className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
                    <Nav className="w-100">
                        <div className=" d-flex flex-row justify-content-around w-100">
                            {
                                tabs.map((tab, index) => (
                                    <NavItem key={`tab-${index}`}>
                                        <NavLink activeStyle to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                                            <div className="row d-flex flex-column justify-content-center align-items-center">
                                                <FontAwesomeIcon size="lg" color='black' icon={tab.icon} />
                                                <div style={{ color: 'black' }} className="bottom-tab-label">{tab.label}</div>
                                            </div>
                                        </NavLink>
                                    </NavItem>
                                ))
                            }
                        </div>
                    </Nav>
                </nav>
            </div>
        );
    }
}