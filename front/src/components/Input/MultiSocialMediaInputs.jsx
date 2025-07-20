import React, { useEffect, useState } from 'react'
import { Plus, Trash } from 'react-bootstrap-icons'
import LinkInput from './LinkInput'
import SocialMediaInput from './SocialMediaInput'
import useMultipleOptions from '../../Hooks/useMultipleOptions'

const MultiSocialMediasInputs = ({ onChange = () => { } }) => {
    const { addOption, editOtion, removeOption, options } = useMultipleOptions({ onChange })
    return (
        <>
            {
                options?.map((l, i) => (
                    <div key={i} className='flex gap-10 mb-10'>
                        <SocialMediaInput onChange={(value) => editOtion(i, value)} />
                        <button type='button' onClick={() => removeOption(i)} className="btn btn-outline-red"><Trash /></button>
                    </div>
                ))
            }
            <button type='button' className="btn btn-outline-purple" onClick={addOption}>
                <Plus size={22} />
                <span>Ajouter un réseau social</span>
            </button>
        </>
    )
}

export default MultiSocialMediasInputs
