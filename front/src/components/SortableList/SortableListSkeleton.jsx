import React from 'react'
import { getRandomNumber } from '../../functions'
import Skeleton from '../Skeleton/Skeleton'

const SortableListSkeleton = () => {
  return (
    <>
        <Skeleton className='sortable-list-skeleton' height={10} width={`${getRandomNumber(20,90)}%`} radius={2}/>
        <Skeleton className='sortable-list-skeleton' height={10} width={`${getRandomNumber(20,90)}%`} radius={2}/>
        <Skeleton className='sortable-list-skeleton' height={10} width={`${getRandomNumber(20,90)}%`} radius={2}/>
    </>
  )
}

export default SortableListSkeleton
