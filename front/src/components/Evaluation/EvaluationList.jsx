import React from 'react'
import axios from 'axios'
import useInfiniteScroll from '../../Hooks/useInfiniteScroll'
import EvaluationItemSkeleton from './EvaluationItemSkeleton'
import EvaluationItem from './EvaluationItem'

const EvaluationList = ({ url,queryKey = ['evaluations'], scrollingElement }) => {
    const {
        data: evaluations,
        flatData: evaluationsFlat,
        error: evaluationsErr,
        hasNextPage: evaluationsNextPage,
        isFetching: evaluationsFetching,
        isFetchingNextPage: evaluationsFetchingNextPage,
        status: evaluationsLoadingStatus,
        refetch,
        refetchPage
    } = useInfiniteScroll({
        url,
        queryKey,
        ipp: 10,
        enabled: true,
        scrollingElement
        
    })


    return (
        <div>
            {
          (evaluationsFetching && !evaluationsFetchingNextPage) ? (
            [...new Array(10)].map((_,i)=><EvaluationItemSkeleton key={i}/>)
          ) : evaluationsErr ? (
            <p>Error: {evaluationsErr.message}</p>
          ) : (evaluations?.pages[0]?.data?.length > 0 ?
            <ul>
              {
                evaluations?.pages?.map((group, i) => (
                  <React.Fragment key={i}>
                    {group.data.map((e, i) => (
                        <EvaluationItem key={i} data={e}/>
                    ))}
                  </React.Fragment>
                ))
              }
              {evaluationsFetchingNextPage
                ? <>
                    <EvaluationItemSkeleton/>
                    <EvaluationItemSkeleton/>
                </>
                : evaluationsNextPage
                  ? ''
                  : ''}
            </ul>
            : <></>)
        }
        </div>
    )
}

export default EvaluationList
