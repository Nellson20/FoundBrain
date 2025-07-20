import React, { useRef } from 'react'
import { FileImageFill, XLg } from 'react-bootstrap-icons'

const SurveyOption = ({ data, surveyOptions = [], setSurveyOptions = () => { }, removeSurveyOption = () => { }, index }) => {
    const editOption = (index, newValue) => {
        const opts = surveyOptions.slice()
        opts[index].title = newValue
        setSurveyOptions(opts)
    }
    return (
        <div className="survey-option flex gap-10 align-items-center">
            <input type="text"  className="inpt" onChange={(e) => {
                editOption(index, e.target.value)
            }} value={data.title} placeholder={`Option ${index + 1}`} />
            {
                index > 1 && <div className="remove" onClick={() => { removeSurveyOption(index) }}><XLg size={14} /></div>
            }
        </div>
    )
}

export default SurveyOption
