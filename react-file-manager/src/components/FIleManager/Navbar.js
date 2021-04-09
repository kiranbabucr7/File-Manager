import React from 'react'
import { Nav, Navbar } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function NavbarComponent() {

  const { logout } = useAuth()
  const history = useHistory()

  const handleLogOut = () => {
    try{
      logout()
      history.push("/login")
    }catch(error){
    }
  }

  return (
    <Navbar bg="light" className="d-flex justify-content-between">
      <Navbar.Brand as={Link} to="/">
        My File Manager
      </Navbar.Brand>
      <div className="d-flex">
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
        <Nav.Link onClick={handleLogOut}>
          Logout
        </Nav.Link>
      </div>   
    </Navbar>
  )
}
