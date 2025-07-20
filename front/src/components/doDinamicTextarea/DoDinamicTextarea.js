import React, { useRef, useState, useEffect, useContext } from 'react'
import './DoDinamicTextarea.scss'

import Avatar from '../Avatar/Avatar'
import { SendFill } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'

const DoDinamicTextarea = ({ avatar = true, prevContent, next, medias = null, placeholder, onKeyup = () => { }, autoFocus = false, getValue = () => { }, emptied = false, setEmptied = () => { } }) => {
  const { user } = useSelector(store => store.user)
  const prev = useRef()
  const text = useRef()
  const [textInitialHeight, setTextInitialHeight] = useState(null);
  const [empty, setEmpty] = useState(true)
  const doDinamicTextarea = useRef()

  useEffect(() => {
    if (emptied) {
      setEmpty(true)
      doDinamicTextarea.current.style.justifyContent = 'flex-end'
      if (prev.current) prev.current.style.order = 0;
      text.current.innerHTML = ''
      text.current.style.width = "auto"
    }
    setEmptied(false)
  }, [emptied])

  const onChangeHandler = (e) => {



    if (e.target.innerText.length >= 1) {
      if (prev.current) {
        doDinamicTextarea.current.style.justifyContent = 'space-between'
      } else {
        doDinamicTextarea.current.style.justifyContent = 'flex-end'
      }

      text.current.style.width = "100%";
      if (prev.current) prev.current.style.order = 2;
      setEmpty(false)

    } else {
      setEmpty(true)
      doDinamicTextarea.current.style.justifyContent = 'flex-end'
      if (prev.current) prev.current.style.order = 0;
      e.target.innerHTML = '';
      text.current.style.width = "auto"
    }
    onKeyup(e)
  }
  const enterHandler = (e) => {
    if (e.keyCode === 13) {
      e.target.innerHTML = '';
      setEmpty(true)
      doDinamicTextarea.current.style.justifyContent = 'flex-end'
      if (prev.current) prev.current.style.order = 0;
      text.current.style.width = "initial"
    }
  }
  useEffect(() => {
    if (autoFocus) text.current.focus();
    text.current.style.minHeight = text.current.offsetHeight + 'px'
    text.current.addEventListener('paste', (e) => {
      let paste = (e.clipboardData || window.clipboardData).getData('text');
      const selection = window.getSelection();
      if (!selection.rangeCount) return false;
      selection.deleteFromDocument();
      selection.getRangeAt(0).insertNode(document.createTextNode(paste));
      e.preventDefault();
    })
  }, [])

  return (
    <div ref={doDinamicTextarea} className={`do-dinamic-textarea do-dinamic-textarea-light`}>
      {
        medias &&
        <div className='inpt-medias' style={{ width: '100%' }}>
          {
            medias
          }
        </div>
      }
      {
        (prevContent || avatar || (avatar && !empty)) &&
        <div className="inpt-prev" ref={prev}>
          {
            prevContent && prevContent
          }
          {
            avatar && <Avatar height={24} width={24} src={user?.activeProfilePicture && user?.activeProfilePicture?.fileUrl} style={{ marginRight: '8px', alignSelf: 'flex-end' }} />
          }

          {/* {
            (avatar && !empty) && <span className={`commenter-name name-medium light-txt-color-1`}>DonnellSon</span>
          } */}
        </div>
      }

      <div
        style={{ marginBottom: !empty ? '12px' : 0 }}
        className={`text light-txt-color-2`}
        ref={text}
        data-placeholder={placeholder || "Ecrire un commentaire"}
        contentEditable={true}
        onKeyDown={
          (e) => {
          }
        } onKeyUp={(e) => {
          onChangeHandler(e)
          getValue(e.target.innerHTML)
        }}
      >
      </div>
      <div className="inpt-next" style={{ justifySelf: 'flex-end !important' }}>
        {
          next
        }

      </div>

    </div>
  )
}

export default DoDinamicTextarea