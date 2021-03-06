import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from 'react'
import { Button, Form, Modal } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { database } from "../../firebase"
import { ROOT_FOLDER } from "../../hooks/useFolder"

export default function AddFolderButton( {currentFolder} ) {
  const [ open, setOpen ] = useState(false)
  const [ name, setName ] = useState('')

  const { currentUser } = useAuth()
  function openModal() {
    setOpen(true)
  }

  function closeModal(){
    setOpen(false)
  }

  function handleSubmit(e){
    e.preventDefault()
    const path = [...currentFolder.path]

    if( currentFolder !== ROOT_FOLDER ) {
      path.push({name:currentFolder.name, id:currentFolder.id})
    }



    if(currentFolder == null) return

    database.folders.add({
      name,
      userId: currentUser.uid,
      parentId: currentFolder.id,
      path:path,
      createdAt: database.getCurrentTimestamp(),
    })
    setName('')
    closeModal()``
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" style={{ width:"40px", height:"40px"}}>
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control 
                required 
                type="text"
                value={name}
                onChange={ e => setName(e.target.value) }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
