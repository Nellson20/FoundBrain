import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './ProfilePictureSelectorModal.scss'
import { ArrowClockwise, ArrowCounterclockwise, XLg, ZoomIn, ZoomOut } from 'react-bootstrap-icons'
import Modal from '../Modal/Modal'
import CheckBox from '../CheckBox/CheckBox'
import axios from 'axios'
import CircleLoader from '../CircleLoader/CircleLoader'
import Cookies from 'js-cookie'
import AvatarEditor from 'react-avatar-editor'
import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'
import ThemeContext, { DARK } from '../../context/ThemeContext'


const ProfilePictureSelectorModal = ({ open = true, file, onChanged = () => { } }) => {
    const [isOpen, setIsOpen] = useState(open)
    const [isUploading, setIsUploading] = useState(false)
    const [editorParent, setEditorParent] = useState(null)
    const [editor, setEditor] = useState()
    const [zoom, setZoom] = useState(1.2)
    const [rotation, setRotation] = useState(0)
    const { theme } = useContext(ThemeContext)
    useEffect(() => {
        setIsOpen(true)
    }, [file])


    const uploadProfilePicture = () => {
        if (editor) {
            fetch(editor.getImage().toDataURL())
                .then(res => res.blob())
                .then(blob => {
                    const finalFile = new File([blob], `${file.name}`, { type: blob.type });
                    let postFormData = new FormData()
                    if (finalFile) {
                        postFormData.append('file', finalFile)
                        setIsUploading(true)
                        axios({
                            method: 'post',
                            url: `${process.env.REACT_APP_API_DOMAIN}/profile_pictures`,
                            withCredentials: true,
                            data: postFormData
                        }).then((res) => {
                            console.log(res);
                            setIsUploading(false)
                        }).catch((err) => {
                            setIsUploading(false)
                            console.log(err.response);

                        })
                    }
                });
        }



    }


    if (file) {
        return (
            <Modal className='profile-picture-selector-modal' open={isOpen} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div>
                    <div className="top flex align-items-center justify-content-center">
                        <h3>Changer ma photo de profil</h3>
                        <div className="close-modal" onClick={() => setIsOpen(false)}>
                            <XLg />
                        </div>
                    </div>
                    <div className="body" ref={setEditorParent}>
                        <AvatarEditor
                            ref={setEditor}
                            scale={zoom}
                            rotate={rotation}
                            borderRadius={100}
                            image={`${URL.createObjectURL(file)}`}
                            style={{ width: "100%", height: "100%" }}
                            border={[
                                (editorParent?.offsetWidth - (editorParent?.offsetHeight + 50)) / 2,
                                40
                            ]}
                            color={theme === DARK ? [0, 0, 0, 0.6] : [255, 255, 255, 0.6]}
                        />

                    </div>
                    <div className="bottom">
                        <Tabs navRight={<button onClick={uploadProfilePicture} className="btn btn-purple">{
                            isUploading ? <CircleLoader /> : 'Enregistrer'
                        }</button>}>
                            <Tab title={
                                <span>
                                    <ZoomIn size={18} />
                                    <p>Zoom</p>
                                </span>
                            }>
                                <div className="flex align-items-center gap-15">
                                    <span><ZoomOut /></span>
                                    <input className='image-zoom-range' min={1} max={50} type="range" value={zoom} onChange={(e) => setZoom(e.target.value)} />
                                    <span><ZoomIn /></span>
                                </div>
                            </Tab>
                            <Tab title={
                                <span>
                                    <ArrowClockwise size={18} />
                                    <p>Rotaion</p>
                                </span>
                            }>
                                <div className="flex align-items-center gap-15">
                                    <span><ArrowCounterclockwise /></span>
                                    <input className='image-zoom-range' min={-360} max={360} value={rotation} type="range" onChange={(e) => setRotation(e.target.value)} />
                                    <span><ArrowClockwise /></span>
                                </div>

                            </Tab>
                        </Tabs>
                    </div>

                </div>
            </Modal>
        )
    }
}

export default ProfilePictureSelectorModal
