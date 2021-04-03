import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from 'react'
import { Button, Form, Modal } from "react-bootstrap"
export default function AddFolderButton() {
  const [ open, setOpen ] = useState(false)
  const [ name, setName ] = useState('')

  function openModal() {
    setOpen(true)
  }

  function closeModal(){
    setOpen(false)
  }

  function handleSubmit(e){
    e.preventDefault()
    setName('')
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
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
              Submit
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
