import React from 'react'
import Avatar from '../../components/Avatar/Avatar'
import Logo from '../../components/Logo/Logo'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const PostNotificationContent = ({ data }) => {
  const { t } = useTranslation()

  return (
    <div className='flex gap-10'>
      {
        data.post.author.name
          ? <Logo height={50} width={50} src={data.post.author?.activeLogo?.fileUrl} />
          : <Avatar height={50} width={50} src={data.post.author?.activeProfilePicture?.fileUrl} />
      }
      <div>
        <Link to='/'>{t('DDDDD')}</Link>
        {/* <Link to={data.post.author.name ? `/portail/${data.post.author.id}` : `/profil/${data.post.author.id}`}>
            {data.post.author.name ? data.post.author.name : `${data.post.author.firstName} ${data.post.author.lastName}`}
          </Link> */}
        <span>{t('a publié un post lié aux domaines qui vous intéressent')}</span>
        <b></b>
        <small>{t("A l'instant")}</small>
      </div>
    </div>
  )
}

export default PostNotificationContent
