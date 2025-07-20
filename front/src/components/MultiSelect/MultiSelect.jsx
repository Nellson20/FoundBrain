import React, { useEffect, useState } from 'react'
import './MultiInputs.scss'
import MultiInputOption from './MultiSelectOption'
import { PlusLg } from 'react-bootstrap-icons'

const MultiSelect = ({ onChange = () => { },optionsList=[{ title:"option1",value: "" },{ title:"option2",value: "" }] }) => {
    const [options, setOptions] = useState(optionsList)
    const addOption = () => {
        setOptions([...options, { title:"",value: "" }])
    }
    const removeOption = (index) => {
        if (options?.length > 1) {
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
                options.map((o, i) => <MultiSelectOption key={i} options={options} value={o.value} setOptions={setOptions} removeOption={removeOption} index={i} />)
            }
            <button className="btn btn-orange mt-10" onClick={addOption}><PlusLg /></button>
        </>

    )
}

export default MultiSelect
