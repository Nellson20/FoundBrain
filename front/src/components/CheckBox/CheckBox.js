import React, { useRef, useState } from 'react'
import { CheckLg } from 'react-bootstrap-icons'
import './CheckBox.scss'
const CheckBox = ({checked=false,value="",id='',onChange=()=>{},name=''}) => {
  const [check,setCheck]=useState(checked)
  const original=useRef()
  const clickOriginal=()=>{
    original.current.click()
  }
  return (
    <div className={`checkBox${check ? ' checked' : ""}`} onClick={clickOriginal}>
        <div className="checkMark">
            <CheckLg size={18}/>
        </div>
        <input ref={original} id={id} name={name} type="checkbox" checked={check} onChange={(e)=>{
          setCheck(e.target.checked)
          onChange(e)
        }} value={value}/>
    </div>
  )
}

export default CheckBox