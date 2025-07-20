import React from 'react'
import { Trash } from 'react-bootstrap-icons'
import ErrorLabel from '../ErrorLabel/ErrorLabel'

const MultiEmailOption = ({ value = null,error=null, options = [], setOptions = () => { }, removeOption = () => { }, index }) => {
    const editOption = (index, newValues) => {
        const opts = options.slice()
        opts[index] = { ...opts[index], ...newValues }
        setOptions(opts)
    }
    return (
        <div className='multi-email-option flex flex-column'>

            <input type="text" className="inpt mb-10" value={value?.reference ?? ''} placeholder='Réference' onChange={(e) => editOption(index, { reference: e.target.value })} />
            <div className="flex gap-10">
                <input type="text" className="inpt flex-grow-1" value={value?.email ?? ''} placeholder='Adresse email' onChange={(e) => editOption(index, { email: e.target.value })} />
                <button className='btn-outline-light' onClick={(e) => {
                    e.preventDefault()
                    removeOption(index)
                }}><Trash size={18} /></button>
            </div>
            <ErrorLabel error={error} />
        </div>
    )
}

export default MultiEmailOption
