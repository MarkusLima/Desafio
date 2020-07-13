import React from 'react';
import './index.css';
import { Navbar, Nav } from 'react-bootstrap';

export default function Menu() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
                <Navbar.Brand href="/">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Nav.Link href="/">Cadastros</Nav.Link>
                        <Nav.Link href="/entregas">Entregas</Nav.Link>  
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}