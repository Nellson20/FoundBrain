import React, { useEffect } from 'react'
import './FundingCard.scss'
import { ChevronRight, GeoAlt } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import millify from 'millify'
import Slider from 'react-slick'


const FundingCard = ({ data = null }) => {
    const { title, collected, need, author, investPictures } = data;
    useEffect(() => {
        console.log(data, 'TMPDATA')
    }, [data])
    return (
        <div className="funding-card elevated-card p-10 mb-5">
            <div className="top flex gap-10">
                <div className="left flex-grow-1">
                    <div className="head flex justify-content-between">
                        {
                            author?.portalId && <h4>Société N&deg;{author?.portalId}</h4>
                        }
                        {
                            author?.country?.flag &&
                            <img className='fund-flag' src={author?.country.flag.fileUrl} alt="" width={30} />
                        }
                    </div>
                    {
                        author?.nifStat &&
                        <div>
                            <span className="stat">{author?.nifStat}/{author?.companyType.type}</span>
                        </div>
                    }
                    <div>
                        {
                            author?.domains?.length > 0 &&
                            <span className="domain">{
                                author?.domains?.map((d) => d.title).join(',')
                            }</span>
                        }
                    </div>
                    {
                        author?.country &&
                        <div>
                            <span className="orange-txt flex align-items-center"><GeoAlt /> {author?.country.name}</span>
                        </div>
                    }
                    <div>
                        {
                            title && <p className='funding-card-title'><strong>Titre</strong> : {title}</p>
                        }
                    </div>
                </div>
                <div className="invest-slider">
                    <Slider {...{
                        dots: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        arrows: false
                    }}>
                        {
                            investPictures?.length > 0 ?
                                investPictures.map((p, i) => (
                                    <div key={i} className="img">
                                        <img src={`${p.fileUrl}`} alt="" />
                                    </div>
                                )) :
                                <div className="img">
                                    <img src={`${process.env.REACT_APP_IMG_FOLDER + "other/SM-placeholder-150x150.png"}`} alt="" />
                                </div>
                        }
                    </Slider>

                </div>
            </div>
            <hr style={{ margin: '8px 0' }} />
            <div className="ca">
                <h5>Chiffre d'affaire</h5>
                <table>
                    <tr>
                        <td><strong>2022</strong></td>
                        <td>1 000 000 $</td>
                    </tr>
                    <tr>
                        <td><strong>2021</strong></td>
                        <td>700 000 $</td>
                    </tr>
                    <tr>
                        <td><strong>2020</strong></td>
                        <td>100 000 $</td>
                    </tr>
                </table>
            </div>

            <hr style={{ margin: '8px 0' }} />
            <div className="foot flex justify-content-between align-items-end gap-20">
                <div className="be flex flex-column flex-grow-1 gap-10">
                    {
                        need &&
                        <div className="flex align-items-center justify-content-between">
                            <h5>Besoin de l'entreprise</h5>
                            <span className='orange-txt'>{millify(parseInt(need?.value))} {need?.currency?.code} pour {Math.floor(Math.random() * (30 - 5 + 1)) + 5}%</span>
                        </div>
                    }
                    <div className="collected flex align-items-center gap-10">
                        <h5>Collecté</h5>
                        <div className="collect-progress flex-grow-1">
                            <div>
                                <div className="state">
                                    <div className="value">{millify(parseInt(need?.value / 2))}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link className='invest-plus-info flex align-items-center gap-5 btn btn-purple'>En savoir plus <ChevronRight /></Link>
            </div>
        </div>
    )
}

export default FundingCard
