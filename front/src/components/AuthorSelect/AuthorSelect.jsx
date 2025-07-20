import React, { useEffect, useState } from 'react'
import DropDown from '../DropDown/DropDown'
import './AuthorSelect.scss'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'

const AuthorSelect = ({ options = [{ title: 'Option1', value: 1 }, { title: 'Option2', value: 2 }, { title: 'Option3', value: 3 }],onSelect=()=>{} }) => {
    const [active, setActive] = useState({ title: 'Choisir un portail' })

    return (
        <div className='auth-select'>
            <DropDown>
                <div><input type="text" value={active.title} readOnly />
                    <input type="hidden" value={active.value} /></div>
                <div>
                    <div className="heading">
                        <h3>Publier en tant que</h3>
                        <span>Choisir un portail où publier votre offre</span>
                    </div>
                    <ul className="select-options">
                        {
                            options.map((o, i) => <li key={i}><Link onClick={() => {
                                onSelect(o.value)
                                setActive(o)
                            }} className='flex align-items-center gap-10'><Avatar src={o.avatar ? o.avatar : null} height={35} width={35} /> {o.title}</Link></li>)
                        }
                    </ul>
                </div>
            </DropDown>
        </div>
    )
}

export default AuthorSelect
