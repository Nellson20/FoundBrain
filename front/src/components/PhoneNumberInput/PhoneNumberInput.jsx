import React, { useState, useEffect } from 'react'
import './PhoneNumberInput.scss'
import { getCountryCodes } from '../../api/coutry'
import SelectSearch from '../SelectSearch/SelectSearch'
import { Link } from 'react-router-dom'

const PhoneNumberInput = ({ onChange = () => { }, value = null }) => {
    const [phoneNumber, setPhoneNumber] = useState(value)
    useEffect(() => {
        onChange(phoneNumber)
    }, [phoneNumber])
    return (
        <div className='phone-number-input flex flex-grow-1'>
            <div className="code">
                <SelectSearch
                    searchFields={['countryCode']}
                    onChange={(country) => setPhoneNumber(prev => ({ ...prev, country:`/pays/${country?.id}` }))}
                    placeholder={null}
                    value={null}
                    searchPlaceholder='Rechercher votre pays'

                    query={(filters) => getCountryCodes({ filters })}
                    defaultValueIndex={0}
                    repoName="countryCodesRepo"
                    toPlaceholder={(elem) =>
                        <span className='flex align-items-center gap-5'>
                            <img className='block flag' height={15} width={22} src={elem.flag?.fileUrl} alt={`Flag of ${elem.name}`} />
                            <span className='whitespace-pre'>+{elem.countryCode}</span>
                        </span>}
                    objectMapping={(c) => ({
                        ...c, title: (<span className='flex align-items-center gap-5'>
                            <img className='block flag' height={15} width={22} src={c.flag?.fileUrl} alt={`Flag of ${c.name}`} />
                            <span className='whitespace-pre'>+{c.countryCode}</span>
                        </span>), value: `/pays/${c.id}`
                    })}
                    mapping={(c) => <Link className='country-code-item'>
                        <img src={c.flag?.fileUrl} className='block flag' height={15} width={22} alt={`Flag of ${c.name}`} /><span className='text-ellipsis'>(+{c.countryCode}) {c.name}</span>
                    </Link>} />
            </div>
            <div className="number flex-grow-1">
                <input type="text" className='inpt' onChange={(e) => { setPhoneNumber(prev => ({ ...prev, number: e.target.value })) }} id="" />
            </div>
        </div>
    )
}

export default PhoneNumberInput
