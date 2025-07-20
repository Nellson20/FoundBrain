import React from 'react'
import SortableList from '../SortableList/SortableList'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCompanies, getUserCompanies } from '../../api/company';
import Avatar from '../Avatar/Avatar';

const PortalList = ({activeUser=true}) => {
    const { user } = useSelector(store => store.user)
  return (
    <SortableList emptyPlaceholder={<div className='empty-placeholder flex flex-column align-items-center justify-content-center gap-10'>
      <h5>Aucun portail disponible</h5>
      <span>Veuillez créer votre premier portail pour promouvoir vos activités</span>
    </div>} query={(keyword) => activeUser ? getUserCompanies(user.id,keyword) : getCompanies({filters:keyword ? `name=${keyword}` : null})} mapping={
        (c) => (

          <Link to={`/portail/${c.id}`} className='flex gap-10 align-items-center'>
            <Avatar src={c.activeLogo ? c.activeLogo.fileUrl : null} /> <span>{c.name}</span>
          </Link>

        )} title={user ? 'Mes portails' : 'Populaires'} repoName='myPortalsRepo' />
  )
}

export default PortalList
