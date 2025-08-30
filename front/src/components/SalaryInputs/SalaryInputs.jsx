import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import AmountInput from '../AmountInput/AmountInput'
import './SalaryInputs.scss'
import Select from '../Input/Select'
import { useTranslation } from 'react-i18next'

    

const SalaryInputs = ({onChange=()=>{}}) => {

    const { t } = useTranslation()

    const EXACT = t("Montant exact")
    const INTERVAL = t("Fourchette")

    const [salary, setSalary] = useState({
        amount:null,
        currency:null
    })
    const min=useRef()
    const max=useRef()
    const amount=useRef()

    const [layout, setLayout] = useState(EXACT)
    useEffect(()=>{
        onChange(salary);
        console.log(salary,'SALARY')
    },[salary])
    return (
        <div className='salary-inputs'>
            <div className="flex gap-10 flex-wrap">
                <div>
                    <span>{t("Afficher par")}</span>
                    <Select selectList={[
                        {title:EXACT},
                        {title:INTERVAL}
                    ]} onChange={(selected)=>setLayout(selected?.title)}/>
                </div>
                {
                    layout === INTERVAL ? <div className='flex gap-10' style={{ width: '100%' }}>
                        <div className="form-group">
                            <span>{t("Minimum")}</span>
                            <AmountInput onChange={({value,currency})=>setSalary(prev=>({...prev,min:parseInt(value),currency}))} placeholder={t('Salaire minimum')}/>
                        </div>
                        <div className="form-group">
                            <span>{t("Maximum")}</span>
                            <AmountInput onChange={({value,currency})=>setSalary(prev=>({...prev,max:parseInt(value),currency}))} placeholder={t('Salaire maximale')}/>
                        </div>
                    </div> :
                        <div className="form-group">
                            <span>{t("Montant")}</span>
                            <AmountInput onChange={({value,currency})=>setSalary({amount:parseInt(value),currency})} placeholder={t('Montant du salaire')}/>
                        </div>
                }

            </div>
        </div>
    )
}

export default SalaryInputs
