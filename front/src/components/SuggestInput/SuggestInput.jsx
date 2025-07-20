import React, { useEffect, useState, useRef } from 'react'
import './SuggestInput.scss'
import { useQuery } from '@tanstack/react-query'
import useClickOutside from '../../Hooks/useClickOutside'
import NavigableList from '../NavigableList/NavigableList'

const SuggestInput = ({ placeholder = null, repoName = 'repoSuggest', query = () => { }, mapping = (elem) => elem.title, searchProperty = 'name', onChange = () => { } }) => {
  const [keyword, setKeyword] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const [activeIndex, setActiveIndex] = useState({
    key: -1,
    value: null
  })

  const { data, error, isLoadnig, refetch } = useQuery({
    queryKey: [repoName, keyword],
    queryFn: () => query(keyword),
    enabled: false
  })
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
  const self = useRef()
  useClickOutside(self, () => {
    setCollapsed(false)
  })
  useEffect(() => {
    if (keyword && keyword.length > 0) {
      refetch()
      setCollapsed(true)
    }

  }, [keyword])
  useEffect(() => {
    if (activeIndex.key > -1) {
      onChange(activeIndex.value)
    } else {
      onChange(keyword)
    }
  }, [keyword, activeIndex])

  return (
    <div className='suggest-inpt' ref={self}>
      <input type="text" onChange={(e) => {
        setKeyword(e.target.value)
        setActiveIndex(-1)
      }} value={activeIndex.key > -1 ? activeIndex.value : keyword} placeholder={placeholder || ''} className='inpt' />
      {
        (collapsed && keyword && keyword.length > 0 && data && data.length > 0) ?
          <NavigableList onChange={(index) => setActiveIndex(prev => ({ ...prev, key: index }))} onclickItem={() => { setCollapsed(false) }}>
            <ul className='suggest-list'>

              {data.map((d, i) => {
                // Trouver l'index de la correspondance pour mettre en gras les caractères suivants
                const startIndex = d[searchProperty].toLowerCase().indexOf(keyword.toLowerCase());
                if (activeIndex.key === i && activeIndex.value !== d[searchProperty]) {
                  setActiveIndex(prev => ({ ...prev, value: d[searchProperty] }));
                }
                return (
                  <li key={i}>
                    {startIndex !== -1 ? (
                      mapping({ ...d, [searchProperty]: renderBoldText(d[searchProperty], startIndex, keyword.length) })
                    ) : (
                      mapping({ ...d, [searchProperty]: d[searchProperty] })
                    )}
                  </li>
                );
              })}
            </ul>
          </NavigableList>

          : ''
      }

    </div>
  )
}

export default SuggestInput
