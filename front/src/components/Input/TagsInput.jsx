import React from 'react'
import './TagsInput.scss'
import { X } from 'react-bootstrap-icons'
import useMultipleOptions from '../../Hooks/useMultipleOptions'
import SuggestInput from './SuggestInput'

const TagsInput = ({ placeholder="",onChange = () => { },defaultState=[],creatable=false,creatableProperty="title",comparisonProperty="title" }) => {
    const { addOption, removeOption, options } = useMultipleOptions({ defaultState:[],onChange,allowEmpty:true })
    return (
        <div className='tags-inpt flex gap-10 flex-wrap'>
            {
                options.map((o, i) => (
                    <div key={i} className="tag flex align-items-center gap-10">
                        <span className="label">{o.title}</span>
                        <div className="remove" onClick={()=>removeOption(i)}><X size={20} /></div>
                    </div>
                ))
            }
            <SuggestInput toValue={(elem)=>elem ? elem[comparisonProperty] : null} onChange={(s,i)=> {
               if(i>-1) 
                addOption(s) 
               else if(creatable && s!=="") addOption({[creatableProperty]:s})
            }} defaultSuggestion={defaultState} placeholder={placeholder} mapping={(elem)=>elem.title} comparisonElement={(elem)=>elem[comparisonProperty]}/>
        </div>
    )
}

export default TagsInput
