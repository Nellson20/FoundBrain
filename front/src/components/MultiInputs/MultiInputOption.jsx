import React from 'react'
import { Trash } from 'react-bootstrap-icons'
const MultiInputOption = ({ value = "", options = [], setOptions = () => { }, removeOption = () => { }, index,placeholder="",inputType="text" }) => {
    const editOption = (index, newValue) => {
        const opts = options.slice()
        opts[index] = newValue
        setOptions(opts)
    }
    return (
        <div className="multi-inpt-opt flex align-items-center gap-10">
            <input type={inputType} className="inpt" onChange={
                (e) => editOption(index, e.target.value)
            } placeholder={placeholder} />
            <button className='btn-outline-light' onClick={(e) => { 
                e.preventDefault()
                removeOption(index)
             }}><Trash size={18} /></button>
        </div>
    )
}

export default MultiInputOption
