import React, { useState } from 'react'
import './CreatePostModal.scss'
import { X, PinAngle, BarChart, Lightbulb, People, TagFill, Image as ImageIcon, GeoAlt, Paperclip, ChevronDown } from 'react-bootstrap-icons'
import Avatar from '../Avatar/Avatar'
import { useSelector } from 'react-redux'

const CreatePostModal = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.user)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [content, setContent] = useState('')

  const categories = [
    { id: 'funding', label: 'Financement / Levée de fonds', icon: <PinAngle size={18} /> },
    { id: 'product', label: 'Produits / service', icon: <BarChart size={18} /> },
    { id: 'project', label: 'Projets à soutenir', icon: <Lightbulb size={18} /> },
    { id: 'partnership', label: 'Partenariats', icon: <People size={18} /> },
    { id: 'contest', label: 'Concours', icon: <TagFill size={18} /> }
  ]

  if (!open) return null

  return (
    <div className="create-post-modal-overlay" onClick={() => setOpen(false)}>
      <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="avatar-wrapper">
            <Avatar height={24} width={24} src={user?.activeProfilePicture?.fileUrl || user?.activeLogo?.fileUrl} />
            <div className="user-info">
              <div className="user-name-dropdown">
                <span>{user?.firstName || user?.name} {user?.lastName || ''}</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>

        <h2 className="modal-title">De quoi voulez vous parler ?</h2>

        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <textarea
          className="content-textarea"
          placeholder="Écrire une description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="attachments-section">
          <h3>Joindre</h3>
          <div className="attachment-buttons">
            <button className="attachment-btn">
              <ImageIcon size={20} />
              <span>Images/Videos</span>
            </button>
            <button className="attachment-btn">
              <GeoAlt size={20} />
              <span>Localisation</span>
            </button>
            <button className="attachment-btn">
              <Paperclip size={20} />
              <span>Fichier</span>
            </button>
          </div>
        </div>

        <button className="publish-btn">
          Publier
        </button>
      </div>
    </div>
  )
}

export default CreatePostModal
