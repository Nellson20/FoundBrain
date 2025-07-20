import React,{useEffect,useState} from 'react'

const useMultipleOptions = ({defaultState = [{}],allowEmpty=false,onChange=()=>{}}) => {

    const [options, setOptions] = useState(defaultState)
    useEffect(() => {
        onChange(options)
    }, [options])
    const addOption = (option={}) => {
        setOptions([...options, option])
    }
    const removeOption = (index) => {
        if(!allowEmpty && options.length === 1) return
        if (options.length > 0) {
            const newOptions = [...options]
            setOptions(newOptions.filter((m, i) => i !== index))
        }
    }
    const editOtion = (index, newValues) => {
        const newOptions = [...options]
        newOptions[index] = { ...options[index], ...newValues }
        setOptions(newOptions)
    }
    return {addOption,editOtion,removeOption,options, setOptions}
}

export default useMultipleOptions
