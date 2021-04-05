import { useEffect, useReducer } from 'react'
import { database } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

const ACTIONS = {
  ADD: 'add-folder',
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders'
}

export const ROOT_FOLDER = { name: 'Root', id: null, path:[] }

function reducer ( state, {type, payload}) {
  switch( type ) {
    case ACTIONS.SELECT_FOLDER:{
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders:[],
        childFIles:[],
      }
    }
    case ACTIONS.UPDATE_FOLDER:{
      return {
        ...state,
        folder: payload.folder
      }
    }
    case ACTIONS.SET_CHILD_FOLDERS:{
      return {
        ...state,
        childFolders: payload.childFolders
      }
    }
    default:{
      return state
    }
  }
}

export function useFolder(folderId = null, folder = null) {

  const { currentUser } = useAuth()

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders:[],
    childFIles:[],
  })

  useEffect( () => {
    dispatch( { type:ACTIONS.SELECT_FOLDER, payload:{
      folderId, folder
    }} )
  },[folderId, folder])
  
  useEffect( () => {
    if( folderId == null ){ 
      return dispatch({ 
        type:ACTIONS.UPDATE_FOLDER, 
        payload:{ folder: ROOT_FOLDER}
      })
    }

    database.folders
    .doc(folderId)
    .get()
    .then( doc => {
      dispatch({ 
        type:ACTIONS.UPDATE_FOLDER, 
        payload:{ folder: database.formatDoc(doc)}
      })
    }).catch(() => {
      return dispatch({ 
        type:ACTIONS.UPDATE_FOLDER, 
        payload:{ folder: ROOT_FOLDER}
      })
    })

  },[folderId, currentUser])
  
  useEffect( () => {
    return database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot( snapshot => {
        dispatch({ 
          type:ACTIONS.SET_CHILD_FOLDERS, 
          payload:{ childFolders: snapshot.docs.map( folder => database.formatDoc(folder)) },
        })
      })
  },[folderId, currentUser])

  return state
}
