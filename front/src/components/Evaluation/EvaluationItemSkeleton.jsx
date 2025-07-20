import React from 'react'
import './EvaluationItemSkeleton.scss'
import { getRandomNumber } from '../../functions'
import Skeleton from '../Skeleton/Skeleton'

const EvaluationItemSkeleton = () => {
  return (
    <div className='evaluation-list-skeleton flex gap-10 mb-15 align-items-center'>
      <Skeleton radius="50%" height={40} width={40}/>
      <Skeleton radius={2} height={10} width={getRandomNumber(60,200)}/>
    </div>
  )
}

export default EvaluationItemSkeleton
