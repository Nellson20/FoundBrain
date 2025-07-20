import React, { useContext, useEffect, useState } from 'react'
import './JobCard.scss'
import Avatar from '../Avatar/Avatar'
import { Eye } from 'react-bootstrap-icons'
import moment from '../../moment'
import { Link } from 'react-router-dom'
import millify from 'millify'
import Rating from 'react-rating'
import { Parser } from 'html-to-react'
import { useCurrencyConverter, useFromTo } from '../../Hooks/currencyHooks'
import CurrencyContext from '../../context/CurrencyContext'
import { convertCurrency } from '../../utils/currencyUtils'

const JobCard = ({handleShow, active = false, data: { id, title, author, domaine, summary, description, createdAt, xp, salary } }) => {
    const { currency } = useContext(CurrencyContext)
    const {from,to}=useFromTo(salary?.currency.code)
    const htmlToJsx = new Parser()
    return (
        <div className={`job-card${active ? ' active-job' : ''}`}>
            <div className="top">
                <div className='flex gap-10'>
                    <Avatar src={author.activeLogo ? author.activeLogo.fileUrl : null} width={45} height={45} />
                    <div className="job-info">
                        <Link to={`../emplois/${id}`}><h2>{title}</h2></Link>
                        <span className='flex align-items-center column-gap-5'><span className='purple-txt'>{author.name}</span>
                            <span className="job-company-eval">
                                <Rating
                                    readonly
                                    initialRating={3.5}
                                    className='portal-note'
                                    fractions={2}
                                    emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                                    fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                                />
                            </span>| {author.adress}</span>
                        <div className="jobcard-important-list">
                            {
                                xp && <span>{xp}</span>
                            }

                        </div>
                        <small>{moment(createdAt).fromNow()}</small>
                    </div>
                </div>
                {
                    salary && 
                    (from && to) ?
                    <h5>{(salary.min && salary.max) ? millify(convertCurrency(salary.min,from,to)) + "-" + millify(convertCurrency(salary.max,from,to)) : millify(convertCurrency(salary.amount,from,to))} {currency.code}</h5>
                    :
                    <h5>{(salary.min && salary.max) ? millify(salary.min) + "-" + millify(salary.max) : millify(salary.amount)} {salary.currency.code}</h5>

                }
            </div>
            <div>
                <p className="description">{htmlToJsx.parse(summary || description)}</p>
                <div className="bottom flex gap-10">
                    <button className="btn-transparent orange-txt">Postuler</button>
                    <Link to={`details`} className="btn-transparent"><Eye /> Détails</Link>
                </div>
            </div>
        </div>
    )
}

export default JobCard
