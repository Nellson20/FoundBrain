import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Check } from 'react-bootstrap-icons'
import './SquareRadio.scss'

const SquareRadio = ({ children = 'Radio', checked = false, className = null, value = null, defaultChecked = false, onChange = () => { }, name = null }) => {

    const squareRadio = useRef()
    const squareRadioRef = useRef()
    const clickInput = () => {
        squareRadio.current.click()
    }
    return (
        <>
            <input ref={squareRadio} type="radio" checked={checked} value={value} className='square-radio' style={{ display: 'none' }} defaultChecked={defaultChecked} onChange={onChange} name={name} />
            <div ref={squareRadioRef} onClick={clickInput}
                className={`square-radio-ref relative${(squareRadio.current?.checked || squareRadio.current?.defaultChecked) ? ' checked' : ''}${className ? ' ' + className : ''}`}>
                <span>{children}</span>
                <div className='checked-mark absolute'><Check /></div>
            </div>
        </>
    )
}

export default SquareRadio
