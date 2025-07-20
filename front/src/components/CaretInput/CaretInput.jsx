import React, { useEffect } from 'react'
import './CaretInput.scss'
import { CaretDownFill } from 'react-bootstrap-icons'
import { useState } from 'react'

const CaretInput = ({value,showValue=(value)=>value,onChange=()=>{},onClick=()=>{},active=false,className=null}) => {
  const [defaultValue,setDefaultValue]=useState(value?.code)
  useEffect(()=>{
    onChange(value)
    console.log(value,'VALUEEE')
    setDefaultValue(showValue(value))
  },[value])
  return (
    <div onClick={onClick} className={`carret-inpt gap-5 flex${active ? ` active` : ``}${className ? ` ${className}` : ''}`}>
      <div className="left">
        {defaultValue}
      </div>
      <div className="carret">
        <CaretDownFill/>
      </div>
    </div>
  )
}

export default CaretInput
