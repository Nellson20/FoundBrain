import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet, Plus, PlusLg, ThreeDots } from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'

const Studies = () => {
    return (
        <>
            <section className="studies">
                <div className="flex justify-content-between align-items-center">
                    <h4>Mes études</h4>
                    <div className="btn add-study-btn flex align-items-center gap-10"><button className='btn btn-transparent'><PlusLg /> <span>Ajouter une Étude/Formation</span></button></div>
                </div>
                <ul className="studies-list mt-10">
                    <li className='flex align-items-center gap-5'>
                        <Avatar width={40} height={40} />
                        <div className="right flex justify-content-between flex-grow-1">
                            <div className="info">
                                <h3 className='ellipsis-text'>Developpeur FullStack chez <Link>GateCompany</Link></h3>
                                <small className='ellipsis-text'>du 20 Dec 2021 jusqu'à aujourd'hui</small>
                            </div>
                            <div className="btns">
                                <button className="btn btn-transparent"><ThreeDots size={16} /></button>
                            </div>
                        </div>
                    </li>
                    <li className='flex align-items-center gap-5'>
                        <Avatar width={40} height={40} />
                        <div className="right flex justify-content-between flex-grow-1">
                            <div className="info">
                                <h3 className='ellipsis-text'>Developpeur FullStack chez <Link>GateCompany</Link></h3>
                                <small className='ellipsis-text'>du 20 Dec 2021 jusqu'à aujourd'hui</small>
                            </div>
                            <div className="btns">
                                <button className="btn btn-transparent"><ThreeDots size={16} /></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
            <hr />
            <section className="jobs mb-15">
                <div className="flex justify-content-between align-items-center">
                    <h4>Mes emplois</h4>
                    <div className="btn add-study-btn flex align-items-center gap-10"><button className='btn btn-transparent'><PlusLg /> <span>Ajouter un Emplois</span></button></div>
                </div>
                <ul id="studies-list" className="studies-list mt-15">
                    <li className='flex align-items-center gap-5'>
                        <Avatar width={40} height={40} />
                        <div className="right flex justify-content-between flex-grow-1">
                            <div className="info">
                                <h3 className='ellipsis-text'>Developpeur FullStack chez <Link>GateCompany</Link></h3>
                                <small className='ellipsis-text'>du 20 Dec 2021 jusqu'à aujourd'hui</small>
                            </div>
                            <div className="btns">
                                <button className="btn btn-transparent"><ThreeDots size={16} /></button>
                            </div>
                        </div>
                    </li>
                    <li className='flex align-items-center gap-5'>
                        <Avatar width={40} height={40} />
                        <div className="right flex justify-content-between flex-grow-1">
                            <div className="info">
                                <h3 className='ellipsis-text'>Developpeur FullStack chez <Link>GateCompany</Link></h3>
                                <small className='ellipsis-text'>du 20 Dec 2021 jusqu'à aujourd'hui</small>
                            </div>
                            <div className="btns">
                                <button className="btn btn-transparent"><ThreeDots size={16} /></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Studies
