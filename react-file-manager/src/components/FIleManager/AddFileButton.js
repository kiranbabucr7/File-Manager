import React from 'react'
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function AddFileButton() {
  const handleUpload = () => {

  }

  return (
    <label className="btn btn-outline-success m-0 mr-2" style={{ width:"40px", height:"40px"}}>
      <FontAwesomeIcon icon={faFileUpload} />
      <input 
        type="file" 
        onChange={handleUpload} 
        style={{ opacity:0, position: 'absolute', left:"-9999px"}}
      >

      </input>
    </label>
  )
}
