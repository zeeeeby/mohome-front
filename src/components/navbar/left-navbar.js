import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class LeftNavBar extends Component {
    render () {
        return (
            <div className="navbar-collapse collapse dual-nav w-50 order-1 order-md-0">
                <ul className="navbar-nav">
                    <li className="nav-item  mr-2">
                        <NavLink  className="nav-link" to="/" exact>
                            <i className="zmdi zmdi-home zmdi-hc-lg"></i> Home
                        </NavLink>
                    </li>
                    <li className="nav-item mr-2">
                        <NavLink className="nav-link" to="/photo">
                            <i className="zmdi zmdi-image zmdi-hc-lg"></i> Photo
                        </NavLink>
                    </li>
                    <li className="nav-item mr-2">
                        <NavLink className="nav-link" to="/video">
                            <i className="zmdi zmdi-movie zmdi-hc-lg"></i> Video
                        </NavLink>
                    </li>
                    <li className="nav-item mr-2">
                        <NavLink className="nav-link" to="/music" >
                            <i className="zmdi zmdi-audio zmdi-hc-lg"></i> Music
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
};