import React,{useState,useEffect} from 'react'
import './MultiPhone.scss'
import MultiPhoneOption from './MultiPhoneOption'
import { PlusLg } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next';

const MultiPhone = ({ onChange = () => { },validationErrors=[],values=[],errors=[]}) => {
    const { t } = useTranslation();
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
        <div className='multi-phone flex flex-column gap-10 mt-10'>
            {
                options.map((o,i)=><MultiPhoneOption error={validationErrors[i]} key={i} options={options} value={o} setOptions={setOptions} removeOption={removeOption} index={i}/>)
            }
            
            <button type='button' className="add-input-option btn btn-orange flex-grow-1" onClick={addOption}><PlusLg /> <span>{t("Ajouter un numéro")}</span></button>
        </div>
    )
}

export default MultiPhone
