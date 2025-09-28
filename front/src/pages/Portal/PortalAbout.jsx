import React from 'react'
import './PortalAbout.css'
import { ArrowRight } from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'
import Slider from 'react-slick'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Parser } from 'html-to-react'
import { useTranslation } from 'react-i18next'

const PageAbout = () => {
    const { t } = useTranslation()
    const { company } = useOutletContext()
    const htmlToJsx = new Parser()
    return (
        <div className='page-about'>
            <div className="ent-details elevated-card p-15 mt-15 pt-0">
                <div className="heading2">
                    <h3>{t("Details de l'entreprise")}</h3>
                </div>
                <h5 className='mb-10'>{t("Description")}</h5>
                {htmlToJsx.parse(company?.description)}
                <hr />
                <h5 className='mb-10'>{t("Contacts")}</h5>
                <div className='mb-10'>
                    <h6 className='mb-5'>{t("Adress Email")}</h6>
                    <span>{company?.email}</span>
                </div>
                <h6 className='mb-5'>{t("Telephone")}</h6>
                <span>034 63 431 14 | 032 45 324 14</span>
                <hr />
                <h5 className='mb-10'>{t("Autres")}</h5>
                <div className="mb-10">
                    <h6 className='mb-5'>{t("Domaines")}</h6>
                    <span>{company?.domains.map((d) => d.title).join(',')}</span>
                </div>
                <div className="mb-10">
                    <h6 className='mb-5'>{t("Pays")}</h6>
                    <span>{company?.country.name}</span>
                </div>
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.5336493894574!2d47.53252567435297!3d-18.907759007290572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07d96ef044b85%3A0x1cb9f973401ca2a4!2sTsenagasy!5e0!3m2!1sfr!2smg!4v1686743681929!5m2!1sfr!2smg"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <hr />
                <h5 className='mb-10'>{t("Juridique")}</h5>
                <h6 className='mb-5'>NIF/STAT</h6>
                <span>{company?.nifStat}</span>
                <Link to={`https://${company?.webSite}`} className="btn-outline-purple mt-15">
                    {t("Visiter le site Web")} <ArrowRight />
                </Link>
            </div>
            <div className="ceo elevated-card mt-15 p-15 pt-0">
                <div className="heading2">
                    <h3>{t("Dirigeants")}</h3>
                </div>
                <Slider
                    {...{
                        dots: false,
                        arrows: false,
                        speed: 500,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }}
                >
                    <div className="dirigeant flex flex-column align-items-center gap-5">
                        <Avatar height={50} width={50} />
                        <h5 className='text-ellipsis'>Rojo Andrianasolo</h5>
                        <span>CEO</span>
                    </div>
                    <div className="dirigeant flex flex-column align-items-center gap-5">
                        <Avatar height={50} width={50} />
                        <h5 className='text-ellipsis'>Claudio Andrianasolo</h5>
                        <span>DG</span>
                    </div>
                </Slider>
            </div>
            <div className="projects elevated-card mt-15">
                <div className="heading2 border-bottom-light-grey px-15">
                    <h3>{t("Projets")}</h3>
                </div>
                <nav>
                    <ul className='after-nav flex align-items-center'>
                        <li className='active'>{t("Numérique")}</li>
                        <li>{t("Construction")}</li>
                        <li>{t("Education")}</li>
                    </ul>
                </nav>
                <div className="body"></div>
            </div>
            <div className="events elevated-card mt-15">
                <div className="heading2 border-bottom-light-grey px-15">
                    <h3>{t("Evenements")}</h3>
                </div>
                <nav>
                    <ul className='after-nav flex align-items-center'>
                        <li className='active'>{t("Animations")}</li>
                        <li>{t("Conferences")}</li>
                        <li>{t("Sallons")}</li>
                    </ul>
                </nav>
                <div className="body"></div>
            </div>
            <div className="products-and-services elevated-card mt-15">
                <div className="heading2 border-bottom-light-grey px-15">
                    <h3>{t("Produits et services")}</h3>
                </div>
                <nav>
                    <ul className='after-nav flex align-items-center'>
                        <li className='active'>{t("Produits")}</li>
                        <li>{t("Services")}</li>
                    </ul>
                </nav>
                <div className="body"></div>
            </div>
        </div>
    )
}

export default PageAbout
