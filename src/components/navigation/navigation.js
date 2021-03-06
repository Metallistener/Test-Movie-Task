import React, { Component } from 'react';
import { FontAwesome } from 'react-web-vector-icons';
import './navigation.css';
import { NavLink } from 'react-router-dom'


class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="navigation">
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <NavLink activeClassName="navigation__activeLink" to="/home">
                            <div className="navigation__link">
                                <FontAwesome
                                    name='home'
                                    color='#f5905b'
                                    size={30}
                                    style={{
                                        verticalAlign: 'middle'
                                    }}
                                />
                                <span className="navigation__link-name">Home</span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }

}

export default Navigation;