import React from 'react'
import { Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="xxlg">
      <Navbar.Brand as={Link} to="/">
        Mad Street Den
      </Navbar.Brand>
      <Nav.Link as={Link} to="/user">
        Profile
      </Nav.Link>
    </Navbar>
  )
}
