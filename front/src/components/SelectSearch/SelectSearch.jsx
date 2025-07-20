import React from 'react'
import './SelectSearch.scss'
import Searchbar from '../Searchbar/Searchbar'
import DropDown from '../DropDown/DropDown'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaretDown, CaretDownFill } from 'react-bootstrap-icons'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { filtersToURL } from '../../functions'
import CircleLoader from '../CircleLoader/CircleLoader'
import NavigableList from '../Input/NavigableList/NavigableList'

const SelectSearch = ({
    className = null,
    searchBar = true,
    defaultValues = [],
    defaultValueIndex = null,
    placeholder = 'Choisir une option',
    searchPlaceholder = 'Rechercher',
    searchFields = ['title'],
    value = null,
    readOnly = false,
    toPlaceholder = (elem) => elem.title,
    repoName = 'repoOptions',
    exclude = [],
    query = null,
    mapping = (elem) => <Link>{elem.title}</Link>,
    objectMapping = (elem) => elem,
    onChange = () => { } }) => {
    const [defaultValue, setDefaultValue] = useState(placeholder)
    const [filters, setFilters] = useState({})
    const [keyword, setKeyword] = useState('')
    const [selected, setSelected] = useState(null)
    const [opened,setOpened]=useState(false)
    const { data: optionsList, error: optionsListErr, isLoading: getOptionsListLoading, refetch, isRefetching } = useQuery({
        queryKey: [repoName],
        queryFn: () => query(filtersToURL(filters)),
        enabled: query ? true : false
    })


    useEffect(() => {
        if (searchFields?.length > 0) {
            const newFilters = { ...filters }
            searchFields.forEach((sf) => {
                newFilters[sf] = keyword
            })
            setFilters(newFilters)
        }
    }, [keyword])

    useEffect(() => {
        refetch()
    }, [filters])


    useEffect(() => {
        if (optionsList && !selected && defaultValueIndex !== null && !defaultValue && !value && optionsList[defaultValueIndex]) {
            setSelected(objectMapping(optionsList[defaultValueIndex]))
        }
    }, [optionsList])

    useEffect(() => {
        onChange(selected)
    }, [selected])



    return (
        <div className={`select-search flex-grow-1${className ? ' ' + className : ''}`}>
            <DropDown togglable={!readOnly} opened={opened} setOpened={setOpened} className='fake-select'>
                <div className='fake-input'>
                    <div type="text" className="inpt">
                        {
                            defaultValueIndex !== null && !defaultValue && !value ?
                                getOptionsListLoading ? <CircleLoader colors={null} /> : (optionsList[defaultValueIndex] ? objectMapping(optionsList[defaultValueIndex]).title : (value ?? defaultValue))
                                : (value ?? defaultValue)
                        }
                        {/* {((defaultValueIndex && getOptionsListLoading) ? <CircleLoader colors={null} /> : optionsList && optionsList[defaultValueIndex].title)
                            ?? value ?? defaultValue} */}
                    </div>
                    <div className="chevron">
                        <CaretDownFill size={13} />
                    </div>
                </div>
                <div className="select-search-dropdown-menu">
                    {
                        searchBar &&
                        <Searchbar isLoading={getOptionsListLoading || isRefetching} onChange={(val) => setKeyword(val)} placeholder={searchPlaceholder} />
                    }
                    <NavigableList className="select-search-list">
                    {
                            (optionsList && query ? optionsList : defaultValues)?.map((opt) => objectMapping(opt)).filter((d) => !exclude.find((s) => s?.value === d?.value)).map((o, i) => <div key={i} onClick={(e) => {
                                setDefaultValue(toPlaceholder(o))
                                setSelected(o)
                                setOpened(false)
                            }}>{mapping(o)}</div>)
                        }
                    </NavigableList>
                    
                </div>
            </DropDown>

        </div>
    )
}

export default SelectSearch
