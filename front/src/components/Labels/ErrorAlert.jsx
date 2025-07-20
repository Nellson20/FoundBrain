import React from 'react'
import { ExclamationTriangleFill } from 'react-bootstrap-icons'

const ErrorLabel = ({ title = null }) => {
    return (
        title &&
        <div className="errorLabel flex justify-content-between align-items-center">
            <span>{title}</span>
            <ExclamationTriangleFill />
        </div>
    )
}

export default ErrorLabel
