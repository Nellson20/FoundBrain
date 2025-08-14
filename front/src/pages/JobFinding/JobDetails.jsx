import React, { useContext } from "react"
import './JobDetails.scss'
import { Save, Folder } from 'react-bootstrap-icons'
import Logo from "../../components/Logo/Logo"
import { useQuery } from "@tanstack/react-query"
import { getJobOffer } from "../../api/job"
import { useParams } from "react-router-dom"
import NotFound from "../Eroors/NotFound"
import { Parser } from 'html-to-react'
import millify from 'millify'
import CurrencyContext from '../../context/CurrencyContext'
import { convertCurrency } from '../../utils/currencyUtils'
import StickySideBar from "../../components/StickySideBar/StickySideBar"
import { useTranslation } from 'react-i18next'

const JobDetails = () => {
    const { t } = useTranslation()
    const { jobOfferId } = useParams()
    const htmlToJsx = new Parser()
    const { currency, currenciesBaseUSD } = useContext(CurrencyContext)

    const {
        status,
        fetchStatus,
        isLoading: jobOfferLoading,
        data: jobOffer,
    } = useQuery({
        queryKey: ['repojobOffer', jobOfferId],
        queryFn: () => getJobOffer(jobOfferId)
    })

    const [from, to] = [currenciesBaseUSD[jobOffer?.salary?.currency?.code], currenciesBaseUSD[currency?.code]]

    return (
        <main id="job-detail">
            <div className="container">
                {
                    jobOfferLoading ?
                        <h1>{t("Loading")}</h1> :
                        !jobOffer ?
                            (!jobOffer && !jobOfferLoading) && <NotFound /> :
                            <>
                                <div className="cover-image">

                                </div>

                                <div className="main-content">

                                    <div>
                                        <Logo width={60} height={60} />
                                        <h1>{t(jobOffer.title)}</h1>
                                        <h5 className="purple-txt">{t(jobOffer.author.name)}</h5>
                                        <div className="location-date-actions flex justify-content-between align-items-center">
                                            <div>
                                                <span>{t(jobOffer.author.adress)}</span>
                                                <span> - </span>
                                                <span>{t("Date")}</span>
                                            </div>
                                            <div className="flex align-items-center">
                                                <button className="btn btn-transparent">
                                                    <Save size={20} className="mr-10" />
                                                    {t("Sauvegarder")}
                                                </button>
                                                <button className="btn btn-purple ml-10">{t("Postuler")}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-content-between">
                                    <div className="flex flex-column flex-2 gap-5">
                                        <div className="card about-job">
                                            <div>
                                                {
                                                    jobOffer.summary &&
                                                    <>
                                                        <h4>{t("Résumé du poste")}</h4>
                                                        <p>{t(jobOffer.summary)}</p>
                                                    </>
                                                }
                                            </div>
                                            <div className="mt-20">
                                                {
                                                    jobOffer.description &&
                                                    <div className="role">
                                                        <h4>{t("Description détaillé du poste")}</h4>
                                                        <p className="inset-list">{htmlToJsx.parse(jobOffer.description)}</p>
                                                    </div>
                                                }
                                            </div>
                                            <div className="mt-20">
                                                <h4>{t("Skills :")}</h4>
                                                <div className="flex align-items-center mt-10">
                                                    <span className="skill">{t("Lorem.")}</span>
                                                    <span className="skill">{t("Lorem.")}</span>
                                                    <span className="skill">{t("Lorem.")}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card about-company">
                                            <h3 className="mb-15">{t("A propos du société")}</h3>
                                            <div>
                                                <div className="flex align-items-center">
                                                    <div className="p-30">
                                                        <div className="company-image">
                                                            <img src="/img/test/image_test.jpg" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="mb-5">{t("Nom du société")}</h4>
                                                        <span className="text-grey"> {t("1,000,000 followers")}</span>
                                                    </div>
                                                </div>
                                                <p>
                                                    {t("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quo at repellendus perferendis soluta, debitis enim provident natus! Rerum nihil, id a beatae similique ratione fuga facilis dolor reprehenderit, odit, quos laudantium quae sequi dicta soluta autem. Tempora dolorum necessitatibus, ipsam laudantium vel veniam aliquid, quisquam perferendis, quibusdam nulla cum.")}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex flex-column flex-1 gap-10">
                                        <StickySideBar bottom={5}>
                                            <div className="card job-specific mb-5">
                                                {
                                                    (jobOffer.salary && ((!isNaN(jobOffer.salary?.min) && !isNaN(jobOffer.salary?.max) && jobOffer.salary?.min > 0 && jobOffer.salary?.max > 0) || (!isNaN(jobOffer.salary?.amount) && jobOffer.salary?.amount > 0))) &&

                                                    (from && to) ?
                                                        <b>{(jobOffer.salary?.min && jobOffer.salary?.max) ? millify(convertCurrency(jobOffer.salary?.min, from, to)) + "-" + millify(convertCurrency(jobOffer.salary?.max, from, to)) : millify(convertCurrency(jobOffer.salary.amount, from, to))} {currency?.code}</b>
                                                        :
                                                        <b>{(jobOffer.salary?.min && jobOffer.salary?.max) ? millify(jobOffer.salary?.min) + "-" + millify(jobOffer.salary?.max) : millify(jobOffer.salary.amount)} {jobOffer.salary?.currency?.code}</b>

                                                }
                                                <span className="block mt-10">{t("Salaire à peu pres")}</span>
                                                <div>
                                                    <div className="flex align-items-center mt-20">
                                                        <div className="flex px-20 align-items-center">
                                                            <Folder size={15} />
                                                        </div>
                                                        <div>
                                                            <h4>{t("Lorem ipsum dolor sit amet.")}</h4>
                                                            <p className="text-grey">{t("Lorem ipsum dolor sit amet, ")}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex align-items-center mt-20">
                                                        <div className="flex px-20 align-items-center">
                                                            <Folder size={15} />
                                                        </div>
                                                        <div>
                                                            <h4>{t("Lorem ipsum dolor sit amet.")}</h4>
                                                            <p className="text-grey">{t("Lorem ipsum dolor sit amet, ")}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex align-items-center mt-20">
                                                        <div className="flex px-20 align-items-center">
                                                            <Folder size={15} />
                                                        </div>
                                                        <div>
                                                            <h4>{t("Lorem ipsum dolor sit amet.")}</h4>
                                                            <p className="text-grey">{t("Lorem ipsum dolor sit amet, ")}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex align-items-center mt-20">
                                                        <div className="flex px-20 align-items-center">
                                                            <Folder size={15} />
                                                        </div>
                                                        <div>
                                                            <h4>{t("Lorem ipsum dolor sit amet.")}</h4>
                                                            <p className="text-grey">{t("Lorem ipsum dolor sit amet, ")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-20 text-grey">{t("Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, quibusdam!")}</p>
                                            </div>

                                            <div className="card lastest-job">
                                                <h3>{t("Postes récentes")}</h3>
                                                <span className="block mt-10">{t("90 postes")}</span>
                                                <div className="items mt-5">
                                                    <div className="item mt-20">
                                                        <h4 className="mb-5">{t("Nom emploi Lorem, ipsum.")}</h4>
                                                        <div className="flex align-items-center text-grey">
                                                            <div className="company-image mr-10 ">
                                                                <img src="/img/test/image_test.jpg" />
                                                            </div>
                                                            <span className="block">{t("Nom company")}</span>
                                                            <span className="block mx-5">•</span>
                                                            <span className="block">{t("Emplacement")}</span>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-20">
                                                        <h4 className="mb-5">{t("Nom emploi Lorem, ipsum.")}</h4>
                                                        <div className="flex align-items-center text-grey">
                                                            <div className="company-image mr-10 ">
                                                                <img src="/img/test/image_test.jpg" />
                                                            </div>
                                                            <span className="block">{t("Nom company")}</span>
                                                            <span className="block mx-5">•</span>
                                                            <span className="block">{t("Emplacement")}</span>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-20">
                                                        <h4 className="mb-5">{t("Nom emploi Lorem, ipsum.")}</h4>
                                                        <div className="flex align-items-center text-grey">
                                                            <div className="company-image mr-10 ">
                                                                <img src="/img/test/image_test.jpg" />
                                                            </div>
                                                            <span className="block">{t("Nom company")}</span>
                                                            <span className="block mx-5">•</span>
                                                            <span className="block">{t("Emplacement")}</span>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-20">
                                                        <h4 className="mb-5">{t("Nom emploi Lorem, ipsum.")}</h4>
                                                        <div className="flex align-items-center text-grey">
                                                            <div className="company-image mr-10 ">
                                                                <img src="/img/test/image_test.jpg" />
                                                            </div>
                                                            <span className="block">{t("Nom company")}</span>
                                                            <span className="block mx-5">•</span>
                                                            <span className="block">{t("Emplacement")}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-content-center">
                                                    <button className="btn btn-transparent btn-see-all">{t("Voir tous les postes sur cet société")}</button>
                                                </div>
                                            </div>
                                        </StickySideBar>
                                    </div>
                                </div>
                            </>
                }
            </div>
        </main>
    )
}

export default JobDetails;
