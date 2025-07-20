import React from 'react'
import { ExclamationTriangleFill } from 'react-bootstrap-icons'

const ErrorLabel = ({ error = null }) => {
  return error &&
    <div className="errorLabel flex align-items-center gap-5">
      <span>{error}</span><ExclamationTriangleFill/>
    </div>
}

export default ErrorLabel
