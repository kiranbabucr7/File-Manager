import React from 'react'
import { Nav, Navbar } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

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
    <Navbar bg="d-flex justify-content-between light">
      <Navbar.Brand as={Link} to="/">
        Mad Street Den
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
