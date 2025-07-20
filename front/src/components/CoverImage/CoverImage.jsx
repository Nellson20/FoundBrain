import React, { useRef } from 'react'
import './CoverImage.scss'

import { addCoverPhoto } from '../../api/coverPhoto'
import CircleLoader from '../CircleLoader/CircleLoader'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { PencilSquare } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'

const CoverImage = ({ user }) => {
    const { userId } = useParams()
    const { user: currentUser } = useSelector(store => store.user)
    const queryClient = useQueryClient()
    const tmpCoverPhotoInpt = useRef()
    const {
        mutate: coverPhotoMutate,
        error: coverPhotoMutateErr,
        isPending: coverPhotoMutateLoading } = useMutation({
            mutationFn: addCoverPhoto,
            onSuccess: (activeCoverImage) => {
                queryClient.setQueryData(['repoProfile', userId], (profile) => {
                    return { ...profile, activeCoverImage }
                })
            },
            onError:(err)=>{
                console.log(err.response,'COVER ERR')
            }
        })
    return (
        <div className='cover-image relative'>
            {
                user.activeCoverImage &&
                <img src={user.activeCoverImage?.fileUrl} alt="" className="absolute" />
            }
            {
                (currentUser && currentUser.id === userId) ?
                    <>
                        <input ref={tmpCoverPhotoInpt} type="file" onChange={
                            (e) => {
                                coverPhotoMutate(e.target.files[0])
                            }
                        } style={{ display: 'none' }} />
                        <button className="" onClick={
                            () => {
                                tmpCoverPhotoInpt.current?.click()
                            }
                        }>{
                                coverPhotoMutateLoading ?
                                    <CircleLoader /> :
                                    <><PencilSquare /> Modifier la bannière</>
                            }</button>
                    </> : ''
            }
        </div>
    )
}

export default CoverImage
