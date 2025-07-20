import React, { useRef, useState,useEffect } from 'react'
import './Survey.scss'
import { FileImageFill, Nut, Plus, PlusLg, Textarea, X, XLg } from 'react-bootstrap-icons'
import SurveyOption from './SurveyOption'

const Survey = ({ options = [{},{},{}], setOptions = () => { }, readOnly = false,onChange=()=>{} }) => {

    const [survey,setSurvey]=useState({
        title:'',
        options:[
            {},{}
        ]
    })
    
    const setSurveyOptions=(options)=>{
        setSurvey((prev)=>({...prev,options}))
    }
    const addSurveyOption = () => {
        setSurvey((prev)=>({...prev,options:[...survey.options, {title:''}]}))
    }
    const removeSurveyOption = (index) => {
        const options = survey.options.slice()
        setSurvey((prev)=>({...prev,options:options.filter((m, i) => i !== index)}))
    }
    useEffect(()=>{
        onChange(survey)
    },[survey])

    return (
        <div className='survey'>
            <textarea type="text" onChange={(e)=>{
                setSurvey((prev)=>({...prev,title:e.target.value}))
            }} className='survey-title' placeholder='Votre question/titre ?'></textarea>
            {
                survey.options.map((o, i) => (
                    <SurveyOption 
                        key={i}
                        index={i}
                        data={o}
                        surveyOptions={survey.options}
                        setSurveyOptions={setSurveyOptions}
                        removeSurveyOption={removeSurveyOption}
                    />
                ))
            }
            <div className="bottom flex justify-content-between">
                <button className="btn btn-purple" onClick={addSurveyOption}><PlusLg/> Ajouter une option</button>
                {/* <button className="btn btn-transparent"><Nut/></button> */}
            </div>
            <div className="limit-date mb-10">
                <label htmlFor="">Durée du sondage</label>
                <div className="flex gap-10">
                    <input type="date" placeholder='Début' className="inpt" />
                    <input type="date" placeholder='Fin du sondage' className="inpt" />
                </div>
            </div>
            
        </div>
    )
}

export default Survey
