import React, { useEffect, useRef, useState } from 'react'
import './SuggestInput.scss'
import useClickOutside from '../../Hooks/useClickOutside'
import NavigableList from './NavigableList/NavigableList'
import { Link } from 'react-router-dom'
import { usePopper } from 'react-popper'
import { createPopper, hide } from '@popperjs/core';

const SuggestInput = ({ placeholder = "", defaultSuggestion = [], defaultSelected = [], toValue = (elem) => elem, query = null, comparisonElement = (elem) => elem, mapping = (elem) => elem, onChange = () => { } }) => {
    const [keyword, setKeyword] = useState("")
    const [tmpKeyword, setTmpKeyword] = useState(null)
    const [selected, setSelected] = useState(defaultSelected)
    const [index, setIndex] = useState(-1)
    const [suggestList, setSuggestList] = useState(defaultSuggestion)
    const [shownSuggest, setShownSuggest] = useState(false)
    const suggestRef = useRef()
    const eventTarget = useRef()
    const tooltipRef = useRef()

    /*tooltip*/
    const { styles, attributes, update } = usePopper(tooltipRef.current, suggestRef.current, {
        placement: "bottom-start",
    });

    useEffect(() => {
        if (selected.length > 0) {
            setShownSuggest(true)
        } else {
            setShownSuggest(false)
        }
    }, [selected.length])
    useEffect(() => {
        if (typeof update === "function") {
            update()
        }
    }, [shownSuggest])

    const renderBoldText = (name, startIndex, length) => {
        const before = name.substring(0, startIndex);
        const bold = name.substring(startIndex, startIndex + length);
        const after = name.substring(startIndex + length);
        return (
            <span>
                {before}<strong>{bold}</strong>{after}
            </span>
        );
    };
    const searchOnSuggestList = (keyword) => {
        return (suggestList.length > 0) ? suggestList.filter(obj => comparisonElement(obj).toLowerCase().startsWith(keyword.toLowerCase())) : []
    }
    useClickOutside(suggestRef, () => {
        setSelected([])
    })
    useEffect(() => {
        if (keyword.length > 0) {
            setSelected(searchOnSuggestList(keyword))
        } else {
            setSelected([])
            eventTarget.current.focus()
        }
    }, [keyword])

    return (
        <div className='do-suggest-inpt relative'>
            <div ref={tooltipRef} className='relative'>
                <input ref={eventTarget} type="text" onChange={(e) => {
                    setKeyword(e.target.value)
                    setTmpKeyword(null)
                }} value={tmpKeyword ?? keyword} className="inpt relative" placeholder={placeholder} />
            </div>

            <div  className={`suggest-list-parent${shownSuggest ? " shown" : ""}`} ref={suggestRef} style={styles.popper} {...attributes.popper}>
                <NavigableList className={`suggest-list`} eventTarget={eventTarget.current} onSelect={(index) => {
                    setTmpKeyword(toValue(selected[index]))
                }} onEnter={(index) => {
                    onChange(index > -1 ? selected[index] : keyword, index)
                    setIndex(index)
                    setSelected([])
                    setKeyword("")
                    setTmpKeyword(null)
                }}>
                    {
                        selected.map((s, i) => (<Link onClick={() => {
                            onChange(i > -1 ? s : keyword, i)
                            setSelected([])
                            setKeyword("")
                            setTmpKeyword(null)
                        }} key={i}>{renderBoldText(mapping(s), 0, keyword.length)}</Link>))
                    }
                </NavigableList>
            </div>

        </div >
    )
}

export default SuggestInput
