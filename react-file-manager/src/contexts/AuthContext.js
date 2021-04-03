import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
} 
 

export function AuthProvider( {children} ) {
  const [currentUser, setcurrentUser] = useState()
  const [loading, setloading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  
  useEffect( () => {
    const unsubscribe =  auth.onAuthStateChanged(user => {
      setcurrentUser(user)
      setloading(false)
    })

    return unsubscribe
  },[])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading&& children}
    </AuthContext.Provider>
  )
}   