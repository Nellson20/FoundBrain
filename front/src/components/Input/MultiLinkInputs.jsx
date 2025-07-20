import React, { useEffect, useState } from 'react'
import { Plus, Trash } from 'react-bootstrap-icons'
import LinkInput from './LinkInput'

const MultiLinkInputs = ({ onChange = () => { } }) => {
    const [links, setLinks] = useState([
        {
            title: "",
            url: ""
        }
    ])
    useEffect(() => {
        onChange(links)
    }, [links])
    const addLink = () => {
        setLinks([...links, {}])
    }
    const removeLink = (index) => {
        if (links.length > 1) {
            const newLinks = [...links]
            setLinks(newLinks.filter((m, i) => i !== index))
        }
    }
    const editLink = (index, newValues) => {
        const newLinks = [...links]
        newLinks[index] = { ...links[index], ...newValues }
        setLinks(newLinks)
    }
    return (
        <>
            {
                links?.map((l, i) => (
                    <div key={i} className='flex gap-10 mb-10'>
                        <LinkInput value={l} onChange={(link) => editLink(i, link)} />
                        <button type='button' onClick={() => removeLink(i)} className="btn btn-outline-red"><Trash /></button>
                    </div>
                ))
            }
            <button type='button' className="btn btn-outline-purple" onClick={addLink}>
                <Plus size={22}/>
                <span>Ajouter un lien</span>
            </button>
        </>
    )
}

export default MultiLinkInputs
