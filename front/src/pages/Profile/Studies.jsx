import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet, Plus, PlusLg, ThreeDots } from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'
import { useTranslation } from 'react-i18next'

const Studies = () => {
    const { t } = useTranslation()

    return (
        <>
            <section className="studies">
                <div className="flex justify-content-between align-items-center">
                    <h4>{t("My studies")}</h4>
                    <div className="btn add-study-btn flex align-items-center gap-10">
                        <button className='btn btn-transparent'>
                            <PlusLg /> <span>{t("Add a Study/Training")}</span>
                        </button>
                    </div>
                </div>
                <ul className="studies-list mt-10">
                    <li className='flex align-items-center gap-5'>
                        <Avatar width={40} height={40} />
                        <div className="right flex justify-content-between flex-grow-1">
                            <div className="info">
                                <h3 className='ellipsis-text'>
                                  {t("FullStack Developer at")} <Link>{t("GateCompany")}</Link>
                                </h3>
                                <small className='ellipsis-text'>
                                  {t("from Dec 20, 2021 to present")}
                                </small>
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
                                <h3 className='ellipsis-text'>
                                  {t("FullStack Developer at")} <Link>{t("GateCompany")}</Link>
                                </h3>
                                <small className='ellipsis-text'>
                                  {t("from Dec 20, 2021 to present")}
                                </small>
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
                    <h4>{t("My jobs")}</h4>
                    <div className="btn add-study-btn flex align-items-center gap-10">
                        <button className='btn btn-transparent'>
                            <PlusLg /> <span>{t("Add a Job")}</span>
                        </button>
                    </div>
                </div>
                <ul id="studies-list" className="studies-list mt-15">
                    <li className='flex align-items-center gap-5'>
                        <Avatar width={40} height={40} />
                        <div className="right flex justify-content-between flex-grow-1">
                            <div className="info">
                                <h3 className='ellipsis-text'>
                                  {t("FullStack Developer at")} <Link>{t("GateCompany")}</Link>
                                </h3>
                                <small className='ellipsis-text'>
                                  {t("from Dec 20, 2021 to present")}
                                </small>
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
                                <h3 className='ellipsis-text'>
                                  {t("FullStack Developer at")} <Link>{t("GateCompany")}</Link>
                                </h3>
                                <small className='ellipsis-text'>
                                  {t("from Dec 20, 2021 to present")}
                                </small>
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
