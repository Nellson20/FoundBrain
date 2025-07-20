import React, { useEffect, useState } from 'react'
import './LinkInput.scss'

const LinkInput = ({value={
    title:"",
    url:""
  },onChange=()=>{}}) => {
  const [link,setLink]=useState(value)
  useEffect(()=>{
    onChange(link)
  },[link])
  return (
    <div className='link-input flex gap-10 flex-grow-1'>
      <input type="text" onChange={(e)=>setLink(prev=>({...prev,title:e.target.value}))} className='link-ttl inpt' placeholder='Titre du lien'/>
      <input type="text" onChange={(e)=>setLink(prev=>({...prev,url:e.target.value}))} className='link-content inpt' placeholder="Entrer l'URL du lien"/>
    </div>
  )
}

export default LinkInput
