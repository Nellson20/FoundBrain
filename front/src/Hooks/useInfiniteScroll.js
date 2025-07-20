import { useState, useEffect } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { usePaginated } from './queryHooks'

const useInfiniteScroll = ({
    url,
    queryKey = ['infiniteScroll'],
    queryString = null,
    ipp = 5,
    enabled,
    scrollingElement = document.getElementById('App'),
    scrollDirection = 'bottom',
    reverseData=false,
    staleTime,
    transformResult = (result) => {
        return { data: result['hydra:member'], totalItems: result['hydra:totalItems'], nextPage: result['hydra:view']['hydra:next'] ? parseInt(result['hydra:view']['hydra:next'].match(/page=(\d+)/)[0].split('=')[1]) : undefined }
    }
}) => {
    const fetchData = ({ pageParam = 1 }) => {
        return axios({
            url: `${url}?ipp=${ipp}&page=${pageParam}${queryString ? `&${queryString}` : ''}`,
            method: 'get',
            responseType: "json",
            headers: {
                'Accept': 'application/json+ld'
            },
            withCredentials: true
        }).then((res) => {
            console.log(res.data, 'useInfiniteScroll')
            return transformResult(res.data)
        })
    }

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        refetch,
        refetchPage,
    } = useInfiniteQuery({
        queryKey,
        queryFn: fetchData,
        getNextPageParam: (lastPage, pages) => lastPage.nextPage,
        enabled,
        staleTime
    })

    useEffect(() => {

        if (scrollingElement) {
            
            const onScroll = (e) => {
                if (!isFetchingNextPage && !isFetching) {
                    const { scrollHeight, scrollTop, clientHeight, scrollWidth, scrollLeft, clientWidth } = e.target
                    
                    switch (scrollDirection) {
                        case 'top':
                            if (scrollTop <= 20) {
                                fetchNextPage()
                            }
                            break
                        case 'bottom':
                            if (scrollHeight - scrollTop <= clientHeight + 10) {
                                fetchNextPage()
                            }
                            break
                        case 'left':
                            if (scrollLeft <= 20) {
                                fetchNextPage()
                            }
                            break
                        case 'right':
                            if (scrollWidth - scrollLeft <= clientWidth + 10) {
                                fetchNextPage()
                            }
                            break
                    }

                }
            }
            scrollingElement?.addEventListener('scroll', onScroll)

            return () => {
                scrollingElement?.removeEventListener('scroll', onScroll)
            }
        }

    }, [scrollingElement, isFetchingNextPage, isFetching])

    const {addItem,deleteItem,editItem}=usePaginated({queryKey,ipp})

    return {
        data,
        addItem,
        deleteItem,
        editItem,
        flatData: reverseData ? data?.pages?.map((group) => group).map((g) => g.data).flat().reverse() : data?.pages?.map((group) => group).map((g) => g.data).flat(),
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        refetch,
        refetchPage,
        addItem,deleteItem,editItem
    }
}

export default useInfiniteScroll
