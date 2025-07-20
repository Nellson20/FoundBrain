import React, { useState, useEffect, useContext } from 'react'
import SelectSearch from '../SelectSearch/SelectSearch'
import './AmountInput.scss'
import { Link } from 'react-router-dom'
import { getCurrenciesList } from '../../api/coutry'
import CurrencyContext from '../../context/CurrencyContext'

const AmountInput = ({ placeholder, readOnlyCurrency = false, onChange = () => { }}) => {
    
    const { currency } = useContext(CurrencyContext)

    const [amount, setAmount] = useState({
        value:null,
        currency
    })
    useEffect(()=>{
        setAmount(prev=>({...prev,currency}))
    },[currency])
    useEffect(() => {
        onChange(amount)
    }, [amount])
    return (
        <div className='amount-input flex align-items-center relative'>
            <input type="number" name="" id="" className="inpt" {...{onChange:
                (e) => {
                    setAmount(prev => ({ ...prev, value: e.target.value }))
                }
            }} placeholder={placeholder} />
            <div className="currency">
                <span className='whitespace-pre'>{currency.code}</span>
            </div>
        </div>
    )
}

export default AmountInput
