import React from 'react'
import Navbar from "./Navbar"
import { Container } from "react-bootstrap"
import AddFolderButton from './AddFolderButton'
import AddFileButton from './AddFileButton'
import { useFolder } from "../../hooks/useFolder"
import Folder from "../FIleManager/Folder" 
import { useParams, useLocation } from "react-router-dom"
import  FolderBreadcrumb  from "./FolderBreadcrumb"
export default function Dashboard() {

  const { folderId  } = useParams()
  const { state = {} } = useLocation()
  console.log(state)
  const { folder, childFolders } = useFolder(folderId, state.folder)

  return (
    <>
      <Navbar/>
      <Container>
        <div className="d-flex align-items-center" >
          <FolderBreadcrumb currentFolder={folder}/>
          <AddFileButton currentFolder={folder}/>
          <AddFolderButton currentFolder={folder}/>
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div key={childFolder.id} style={{maxWidth:"250px"}} className="p-2" >
                <Folder folder={childFolder}/>
              </div>
            ))}
          </div> 
        )}
      </Container>
    </>
  )
}
