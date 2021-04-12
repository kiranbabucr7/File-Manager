import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyC1HXZa1cqbB0RpnvBad2jO-kXeKhOxNJQ",
  authDomain: "mad-file-manager.firebaseapp.com",
  projectId: "mad-file-manager",
  storageBucket: "mad-file-manager.appspot.com",
  messagingSenderId: "515743121427",
  appId: "1:515743121427:web:a9976d0370d63e66063fe6",
})

const firestore = app.firestore()

export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}
export const storage = app.storage()
export const auth = app.auth()
export default app