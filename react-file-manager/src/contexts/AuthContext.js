import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
} 
 

export function AuthProvider( {children} ) {
  const [currentUser, setcurrentUser] = useState()
  const [loading, setloadning] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  useEffect( () => {
    const unsubscribe =  auth.onAuthStateChanged(user => {
      setcurrentUser(user)
      setloadning(false)
    })

    return unsubscribe
  },[])

  const value = {
    currentUser,
    signup,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading&& children}
    </AuthContext.Provider>
  )
}   