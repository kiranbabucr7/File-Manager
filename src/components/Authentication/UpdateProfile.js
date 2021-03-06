import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import NavbarComponent from '../FIleManager/Navbar'
import CenteredContainer from "./CenteredContainer"

export default function UpdateProfile() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit (e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmationRef.current.value){
      return setError("Passwords do not match")
    } 

    const promises = []
    setLoading(true)
    emailRef.current.value !== currentUser.email && promises.push(updateEmail(emailRef.current.value))
    passwordRef.current.value && promises.push(updatePassword(passwordRef.current.value))

    Promise.all(promises).then(() => {
      history.push("/user")
    }).catch( (error) => {
      setError(error.message)
    }).finally( () => {
      setLoading(false)
    })

  }

  return (
    <>
    <NavbarComponent />
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Your Profile</h2>
          {error&& <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder={"Leave blank to keep same password"}/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmationRef} placeholder={"Leave blank to keep same password"}/>
            </Form.Group>
            <Button 
              disabled={loading}
              className="w-100" 
              type="submit"
            >
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
    </CenteredContainer>
    </>
  )
}
