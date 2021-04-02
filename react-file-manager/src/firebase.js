import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyCPsHzYo4qIucwWMQcv81Y_5NXj6OWIvpQ",
    authDomain: "auth-kiran-development.firebaseapp.com",
    projectId: "auth-kiran-development",
    storageBucket: "auth-kiran-development.appspot.com",
    messagingSenderId: "1078628000107",
    appId: "1:1078628000107:web:5b446e18efd8212156ac2e"
})

export const auth = app.auth()
export default app