import React from 'react'
import JobFindingSearchBar from '../components/JobFindingSearchbar/JobFindingSearchbar'
import { Outlet } from 'react-router-dom'
const JobFindingLayout = () => {
  return (
    <>
        <Outlet/>
    </>
  )
}

export default JobFindingLayout
