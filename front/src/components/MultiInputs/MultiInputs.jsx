import React, { useEffect, useState } from 'react'
import './MultiInputs.scss'
import MultiInputOption from './MultiInputOption'
import { PlusLg } from 'react-bootstrap-icons'

const MultiInputs = ({ onChange = () => { },placeholder="",inputType="text"}) => {
    const [options, setOptions] = useState([""])
    const addOption = () => {
        setOptions([...options, ""])
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

        <>
            {
                options.map((o, i) => <MultiInputOption inputType={inputType} placeholder={placeholder} key={i} options={options} value={o} setOptions={setOptions} removeOption={removeOption} index={i} />)
            }
            <button type='button' className="add-input-option btn btn-orange mt-10" onClick={addOption}><PlusLg /> <span>Ajouter</span></button>
        </>

    )
}

export default MultiInputs
