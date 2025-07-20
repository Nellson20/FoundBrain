import React from 'react'
import './EvaluationItem.scss'
import Avatar from '../Avatar/Avatar'
import { Gem } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const EvaluationItem = ({data}) => {
  return (
    <div className='eval-item flex align-items-center gap-10 mb-5'>
      <div className="left relative">
        <Avatar src={data.author.activeProfilePicture?.fileUrl} height={40} width={40}/>
        <div className="badge">
            <Gem/>{data.note}
        </div>
      </div>
      <div className="right">
        <Link className="author">{(data.author.firstName || data.author.name)}{data.author.lastName ? ' '+data.author.lastName : ''}</Link>
      </div>
    </div>
  )
}

export default EvaluationItem
