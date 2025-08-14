import React, { useState, useRef, useEffect } from 'react'
import './Searchbar.scss'
import { Search } from 'react-bootstrap-icons'
import useClickOutside from '../../Hooks/useClickOutside'
import useInfiniteScroll from '../../Hooks/useInfiniteScroll'
import CircleLoader from '../CircleLoader/CircleLoader'
import { useTranslation } from 'react-i18next';



const Searchbar = ({
  placeholder,
  expandable = false,
  suggestUrl = null,
  queryKey = [],
  suggest = false,
  isLoading = false,
  onChange = () => { },
  onSubmit = () => { },
  mapSuggests = () => { }
}) => {
  const { t } = useTranslation();

   const finalPlaceholder = placeholder ?? t('Rechercher sur GateAFRI')

  
  const [expand, setExpand] = useState(false)
  const [enableSuggest, setEnableSuggest] = useState(false)
  const [hasSuggests, setHasSuggests] = useState(false)
  const [keyword, setKeyword] = useState('')
  const suggestsList = useRef()

  const self = useRef()
  const inpt = useRef()
  useClickOutside(self, () => {
    setExpand(false)
  })
  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      onSubmit(e)
    }
  }

  const { data: results,
    flatData: resultsFlat,
    error: resultsErr,
    hasNextPage: resultsNextPage,
    isFetching: resultsFetching,
    isFetchingNextPage: resultsFetchingNextPage,
    status: resultsLoadingStatus,
    refetch,
    refetchPage
  } = useInfiniteScroll({
    scrollingElement: null,
    url: suggestUrl,
    queryString: `or[firstName]=${keyword}&or[lastName]=${keyword}`,
    ipp: 10,
    enabled: false,
    queryKey: [...queryKey, keyword]
  })

  useEffect(() => {
    if (keyword !== '' && suggest) {
      if (!enableSuggest) {
        setEnableSuggest(true)
      } else {
        refetch()
      }
    }
  }, [keyword])




  return (
    <div ref={self} onClick={() => {

      if (expandable && !expand) {
        setExpand(true)
        inpt.current?.focus()
      }
    }} className={`searchbar flex flex-column align-items-center${expandable ? ' expandable' : ''}${expand ? ' expanded' : ''}${results?.pages[0]?.totalItems > 0 ? ' has-suggests' : ''}`}>
      <div className="input flex align-items-center">
        <div className="icon-left"><Search /></div>
         <input
          onChange={(e) => {
            onChange(e.target.value)
            setKeyword(e.target.value)
          }}
          type="text"
          ref={inpt}
          placeholder={finalPlaceholder}
          onKeyUp={handleEnterKey}
        />
        {
          (resultsFetching || isLoading) &&
          <div className="spiner">
            <CircleLoader colors={null}/>
          </div>
        }

      </div>
      <div ref={suggestsList} className="suggests">
        {
          resultsFetching ? (
            <></>
          ) : resultsErr ? (
            <p>Error: {resultsErr.message}</p>
          ) : (results?.pages[0]?.data?.length > 0 ?
            <ul>
              {
                results?.pages?.map((group, i) => (
                  <React.Fragment key={i}>
                    {group.data.map((r, i) => (
                      <li key={i}>{mapSuggests(r)}</li>
                    ))}
                  </React.Fragment>
                ))
              }
              {resultsFetchingNextPage
                ? <h1>Loading</h1>
                : resultsNextPage
                  ? ''
                  : ''}
            </ul>
            : <></>)
        }
      </div>


    </div>
  )
}

export default Searchbar
