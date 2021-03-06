import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import CenteredContainer from "./CenteredContainer"

export default function Signup() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState()
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmationRef.current.value){
      return setError("Passwords do not match")
    }
    try{  
      setMessage('')
      setError('')
      setLoading(true)
      await signup( emailRef.current.value, passwordRef.current.value)
      setMessage('Sign up Sucessfull')
    }catch (err){
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error&& <Alert variant="danger">{error}</Alert>}
          {message&& <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmationRef} required />
            </Form.Group>
            <Button 
              disabled={loading}
              className="w-100" 
              type="submit"
            >
              SignUp
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </CenteredContainer>
  )
}
