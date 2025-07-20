import React,{useRef,useEffect} from 'react'
import './Cv.css'
import Avatar from '../../components/Avatar/Avatar'
import { Envelope, Briefcase, Telephone } from 'react-bootstrap-icons'
const Cv = ({data}) => {
    const description = useRef()
    useEffect(()=>{
        if(description){
            console.log('lele',data.personnalInfo.description)
            description.current.innerHTML=data.description
        }
    },[data.description])
    return (
        <div className='cv-page'>
            <div className="left">
                <div className="left"></div>
                <div className="center">
                    <div className="cv default">
                        <div className="left">
                            <Avatar online={false} height={70} width={70} />
                            <h1 className='name'>{data.personnalInfo.firstName} {data.personnalInfo.lastName}</h1>
                            <h4 className='job'>{data.personnalInfo.speciality}</h4>
                            <div className="skills">
                                <span>ReactJS</span>
                                <span>NestJS</span>
                                <span>GraphQL</span>
                            </div>
                            <div className="other-infos flex flex-column gap-20">
                                <div className='flex flex-column align-items-center'>
                                    <Envelope />
                                    <span>{data.personnalInfo.email}</span>
                                </div>
                                <div className='flex flex-column align-items-center'>
                                    <Briefcase />
                                    <span>Teletravail</span>
                                </div>
                                <div className='flex flex-column align-items-center'>
                                    <Telephone />
                                    <span>{data.personnalInfo.telephone}</span>
                                </div>
                            </div>
                            <button className="btn-orange">Telecharger le CV</button>

                        </div>
                        <div className="content">
                            <div className="description">
                                <h4>A propos de moi</h4>
                                <div ref={description}></div>
                            </div>
                            <div className="experiences">
                                <h4>Experience Professionnelles</h4>
                                <div className="exp">
                                    <div className="top">
                                        <h5>Developpeur NodeJS NestJS GraphQL</h5>
                                        <small><b className='orange-txt'>Solana</b> | Jan 2018 - Dec 2022</small>
                                    </div>
                                    <ul>
                                        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit </li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Solu</li>
                                        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit </li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Solu</li>
                                        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit </li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Solu</li>
                                    </ul>
                                </div>
                                <div className="exp">
                                    <div className="top">
                                        <h5>Developpeur NodeJS NestJS GraphQL</h5>
                                        <small><b className='orange-txt'>Vivana</b> | Dec 2016</small>
                                    </div>
                                    <ul>
                                        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit </li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Solu</li>
                                        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit </li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Solu</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="education">
                                <h4>Education</h4>
                                <div className="ed">
                                    <h5>Universite UST-IO</h5>
                                    <span>Liscence en Informatique et AI</span>
                                    <br />
                                    <small>avrl 2018 - avrl 2020</small>
                                </div>
                                <div className="ed">
                                    <h5>Universite Emedia</h5>
                                    <span>Liscence en Nouvelles Technologies de l'information</span>
                                    <br />
                                    <small>avrl 2018 - avrl 2020</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cv
