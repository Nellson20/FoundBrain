import React from 'react'
import { ExclamationTriangleFill } from 'react-bootstrap-icons'
import './Input.css'

const Input = ({ placeholder = "", value = "", type="text", onChange = () => { }, error = null }) => {
    return (
        <div className={`input${error ? " has-error" : ""}`}>
            <input type={type} className="inpt" value={value} placeholder={placeholder} onChange={onChange} />
            {
                error &&
                <div className="errorLabel flex justify-content-between align-items-center">
                    <span>{error}</span>
                    <ExclamationTriangleFill/>
                </div>
            }
        </div>
    )
}

export default Input
