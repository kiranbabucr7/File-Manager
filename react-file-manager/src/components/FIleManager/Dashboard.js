import React from 'react'
import Navbar from "./Navbar"
import { Container } from "react-bootstrap"
import AddFolderButton from './AddFolderButton'
import { useFolder } from "../../hooks/useFolder"
import Folder from "../FIleManager/Folder" 
import { useParams } from "react-router-dom"
export default function Dashboard() {

  const { folderId  } = useParams()
  const { folder, childFolders } = useFolder(folderId)

  return (
    <>
      <Navbar/>
      <Container fluid>
          <div className="d-flex " ></div>
        <AddFolderButton currentFolder={folder}/>
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
