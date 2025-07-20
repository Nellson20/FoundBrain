import React, { useContext } from 'react'
import StickySideBar from '../../components/StickySideBar/StickySideBar'
import Timeline from '../../components/Timeline/Timeline'
import PlanSlider from '../../components/PlanSlider/PlanSlider'
import MediaContext from '../../context/MediaContext'
import { DESKTOP, TABLET } from '../../constants/MediaTypeConstants'

const ProfileActu = () => {
    const { deviceType } = useContext(MediaContext)
    return (
        <>
            {
                (deviceType === DESKTOP) &&
                <div className="left">
                    <StickySideBar top={68}>
                        <PlanSlider />
                    </StickySideBar>
                </div>
            }

            <div className="right flex-grow-1">
                <Timeline />
            </div>
        </>
    )
}

export default ProfileActu
