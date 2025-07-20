import React, { useRef } from 'react'
import './ChipsCheckbox.scss'
import { Check2 } from 'react-bootstrap-icons'

const ChipsCheckbox = ({ children, className = null, onChange = () => { }, ...props }) => {
    const checkbox = useRef()
    const chips = useRef()
    const onChangeInput = (e) => {
        const { value, checked } = e.target
        onChange({value,checked})
    }
    const clickInput = (e) => {
        checkbox.current.click()
        console.log(props)
    }
    return (
        <>
            <input ref={checkbox} onChange={onChangeInput} type="checkbox" className={`chips-checkbox-inpt${className ? ' ' + className : ''}`} {...props} />
            <div ref={chips} onClick={clickInput} className='chips-checkbox flex align-items-center gap-5'>
                <span>{children}</span>
                <span className='ico'><Check2 size={22} /></span>
            </div>
        </>
    )
}

export default ChipsCheckbox
