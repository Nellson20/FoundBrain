import React from 'react'
import { Trash } from 'react-bootstrap-icons'
const MultiSelectOption = ({ value = "", options = [], setOptions = () => { }, removeOption = () => { }, index }) => {
    const editOption = (index, newValue) => {
        const opts = options.slice()
        opts[index].title = newValue
        setOptions(opts)
    }
    return (
        <div className="multi-inpt-opt flex align-items-center gap-10">
            <select name="domain" id="" className='inpt' onChange={
                (e) => editOption(index, e.target.value)
            }>
                {
                    options.map((o, i) => <option key={i} value={o.value}>{o.title}</option>)
                }
            </select>
            <button className='btn-outline-light' onClick={() => { removeOption(index) }}><Trash size={18} /></button>
        </div>
    )
}

export default MultiSelectOption
