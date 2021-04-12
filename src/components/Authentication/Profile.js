import React, { useState } from 'react'
import { Alert, Button, Card } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import NavbarComponent from '../FIleManager/Navbar'
import CenteredContainer from "./CenteredContainer"

export default function Profile() {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleLogOut = () => {
    setError('')
    try{
      logout()
      history.push("/login")
    }catch(error){
      setError(error.message)
    }
  }

  const handleCancel = () =>{
    history.push("/")
  }
  
  return (
    <>
      <NavbarComponent />
      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error&& <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong>{currentUser?.email}
            <Link className="w-100 btn btn-primary mt-3" to="/update-profile">Update Profile</Link>
          </Card.Body>
          <Button variant="link" onClick={handleCancel}>Cancel</Button>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogOut}><strong>Log Out</strong></Button>
        </div>
      </CenteredContainer>
    </>
  )
}
