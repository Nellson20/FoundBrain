import React from 'react'
import './Contact.scss'
import { Envelope, Facebook, PlusLg, Telephone, ThreeDots } from 'react-bootstrap-icons'

const Contact = () => {


    
    return (
        <>
            <section className='contacts'>
                <div className="flex align-items-center justify-content-between">
                    <h4>Contacts</h4>
                    <button className="btn btn-transparent"><PlusLg size={16} /></button>
                </div>
                <ul>
                    <li className='flex gap-10'>
                        <div className="ico"><Telephone /></div>
                        <div className='flex-grow-1 flex gap-10'>
                            <div className='flex-grow-1'>
                                <small>Telephone</small>
                                <p>+261 34 453 77</p>
                            </div>
                            <div>
                                <button className="btn btn-transparent"><ThreeDots size={16}/></button>
                            </div>
                        </div>
                    </li>
                    <li className='flex gap-10'>
                        <div className="ico"><Envelope /></div>
                        <div className='flex-grow-1 flex gap-10'>
                            <div className='flex-grow-1'>
                                <small>Email</small>
                                <p>example@mail.com</p>
                            </div>
                            <div>
                                <button className="btn btn-transparent"><ThreeDots size={16} /></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
            <hr />
            <section className='websites'>
                <div className="flex align-items-center justify-content-between">
                    <h4>Sites web et réseaux sociaux</h4>
                    <button className="btn btn-transparent"><PlusLg size={16} /></button>
                </div>

                <ul>
                    <li className='flex gap-10'>
                        <div className="ico"><Telephone /></div>
                        <div className='flex-grow-1 flex gap-10'>
                            <div className='flex-grow-1'>
                                <small>Lien site web</small>
                                <p>https://gatenew.africa</p>
                            </div>
                            <div>
                                <button className="btn btn-transparent"><ThreeDots size={16} /></button>
                            </div>
                        </div>
                    </li>
                    <li className='flex gap-10'>
                        <div className="ico"><Facebook /></div>
                        <div className='flex-grow-1 flex gap-10'>
                            <div className='flex-grow-1'>
                                <small>Facebook</small>
                                <p>Donnell Dev</p>
                            </div>
                            <div>
                                <button className="btn btn-transparent"><ThreeDots size={16} /></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Contact
