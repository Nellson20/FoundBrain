import React, { useEffect, useState } from 'react'
import './LinkInput.scss'
import SelectSearch from '../SelectSearch/SelectSearch'
import { Link } from 'react-router-dom'

const SocialMediaInput = ({value={
    name:"",
    url:""
  },onChange=()=>{}}) => {
  const [link,setLink]=useState(value)
  useEffect(()=>{
    onChange(link)
  },[link])
  return (
    <div className='social-media-input flex gap-10 flex-grow-1'>
      <SelectSearch onChange={(selected)=>setLink(prev=>({...prev,name:selected}))} searchBar={false} toPlaceholder={(elem)=>elem} placeholder='Choisir un réseau social' defaultValues={['Facebook','Instagram','LinkedIn','Twiter']} mapping={(s)=><Link>{s}</Link>}/>
      <input type="text" onChange={(e)=>setLink(prev=>({...prev,url:e.target.value}))} className='link-content inpt' placeholder="Entrer l'URL du lien"/>
    </div>
  )
}

export default SocialMediaInput
