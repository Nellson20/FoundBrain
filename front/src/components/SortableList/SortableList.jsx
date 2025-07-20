import React,{useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import Searchbar from '../Searchbar/Searchbar'
import { Link } from 'react-router-dom'
import './SortableList.scss'
import { useState } from 'react'
import SortableListSkeleton from './SortableListSkeleton'
import axios from 'axios'

const SortableList = ({ title, repoName = 'repo', query, mapping = (elem) => elem,allowSearch=true,emptyPlaceholder='',className=null }) => {

    const [keyword,setKeyword]=useState(null)
    const { data, error, isLoading,refetch,isRefetching } = useQuery({
        queryKey:[repoName,keyword],
        queryFn:() => query(keyword)})
    
    const [comp,setComp]=useState([])
    // axios({
    //     url: `${process.env.REACT_APP_API_DOMAIN}/companies?ipp=2`,
    //     method: 'get',
    //     withCredentials: true,
    //     responseType:"json",
    //     headers: {
    //         'Accept': 'application/json+ld'
    //     }
    // }).then((res) => console.log(res, 'COMPS'));

    useEffect(()=>{
        refetch()
    },[keyword])
    return (
        <div className={`sortable-list${className ? ' '+className : ''}`}>
            <div className="flex align-items-center justify-content-between relative">
                <h3 className='text-ellipsis'>{title}</h3>
                {
                    allowSearch && <Searchbar isLoading={isLoading} expandable onChange={(value)=>{
                        setKeyword(value)
                    }} />
                }
            </div>
            {
                (isLoading) ?
                    <SortableListSkeleton/>
                :
                <ul>

                {
                    data?.length > 0 ? data?.map((elem,i) => (
                        <li key={i}>
                            {
                                mapping(elem)
                            }
                        </li>
                    )) : emptyPlaceholder
                }
            </ul>
            }
        </div>
    )
}

export default SortableList
