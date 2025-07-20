import React,{useState,useEffect} from 'react'
import './MultiEmail.scss'
import MultiEmailOption from './MultiEmailOption'
import { PlusLg } from 'react-bootstrap-icons'

const MultiEmail = ({ onChange = () => { },validationErrors=[],values=[],errors=[]}) => {
    const [options, setOptions] = useState([{}])
    const addOption = () => {
        setOptions([...options, {}])
    }
    const removeOption = (index) => {
        if (options.length > 1) {
            const newOptions = options.slice()
            setOptions(options.filter((m, i) => i !== index))
        }
    }
    useEffect(() => {
        onChange(options)
    }, [options])


    return (
        <div className='multi-email flex flex-column gap-10 mt-10'>
            {
                options.map((o,i)=><MultiEmailOption key={i} error={validationErrors[i]} options={options} value={o} setOptions={setOptions} removeOption={removeOption} index={i}/>)
            }
            <button type='button' className="add-input-option btn btn-orange flex-grow-1" onClick={addOption}><PlusLg /> <span>Ajouter une adresse mail</span></button>
        </div>
    )
}

export default MultiEmail
