import React from 'react';
import { Navbar, Button, Alignment } from '@blueprintjs/core';
import { Link } from "react-router-dom";

import './header.scss';

function Header(props) {
    return (
        // {/* <h1>To Do List: {props.incomplete} items pending</h1> */}

        <Navbar className="nav">
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>To Do App</Navbar.Heading>
                <Navbar.Divider />

                <Link to="/" className="pages">
                    <Button className="bp3-minimal" icon="home" text="Home" />
                </Link>
                <Link to="/settings" className="pages">
                <Button className="bp3-minimal" icon="cog" text="Settings" />
                </Link>
            </Navbar.Group>
        </Navbar>

    )
}

export default Header;