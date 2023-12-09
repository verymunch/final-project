import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import logo from '../imgs/logo.png';

function NavBar() {
    return (
        <Navbar className="mainNav" activeKey='/'>
            <Container>
                    <img className="d-inline-block align-top" src={logo} alt="Company Logo" height="50"/>
                <Navbar.Brand href="/" className="mainNavText">Happy Harry's Hardware
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/customers">Customers</Nav.Link>
                    <Nav.Link href="/items">Products</Nav.Link>
                    <Nav.Link href="/sales">Sales</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;