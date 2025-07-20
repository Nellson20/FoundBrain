import React from 'react'
import PhoneNumberInput from '../PhoneNumberInput/PhoneNumberInput'
import { Trash } from 'react-bootstrap-icons'
import ErrorLabel from '../ErrorLabel/ErrorLabel'

const MultiPhoneOption = ({ value = null,error=null, options = [], setOptions = () => { }, removeOption = () => { }, index }) => {
    const editOption = (index, newValues) => {
        const opts = options.slice()
        opts[index] = { ...opts[index], ...newValues }
        setOptions(opts)
    }
    return (
        <div className='multi-phone-option flex flex-column gap-10'>

            <input type="text" className="inpt mb-10" value={value?.reference ?? ''} placeholder='Réference' onChange={(e) => editOption(index, { reference: e.target.value })} />
            <div className="flex gap-10">
                <PhoneNumberInput value={value ?? null} onChange={(val) => editOption(index, { phoneNumber: val })}/>
                <button className='btn-outline-light' onClick={(e) => {
                    e.preventDefault()
                    removeOption(index)
                }}><Trash size={18} /></button>
            </div>
            <ErrorLabel error={error?.country} />
            <ErrorLabel error={error?.number} />
        </div>
    )
}

export default MultiPhoneOption
