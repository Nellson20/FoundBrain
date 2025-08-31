import React from 'react'
import './JobDetails.scss'
import Avatar from '../Avatar/Avatar'
import millify from 'millify'
import { ChevronRight } from 'react-bootstrap-icons'
import Rating from 'react-rating'
import { generateHtml } from 'bbcode-compiler'
import { Parser } from 'html-to-react'

import parser from '../../tags/Tags'
import { useContext } from 'react'
import CurrencyContext from '../../context/CurrencyContext'
import { convertCurrency } from '../../utils/currencyUtils'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { useAmounts, useFromTo } from '../../Hooks/currencyHooks'
import { useTranslation } from 'react-i18next';


const JobDetails = ({ data: { title, author, Domaine, summary, description, xp, salary, grade, type } }) => {
  const { t } = useTranslation();
  const { currency } = useContext(CurrencyContext)
  const htmlToJsx = new Parser()
  const {from,to}=useFromTo(salary?.currency.code)
  return (
    <div className="job-details">
      <div className="cover relative">
        <img src="/img/entreprises/vy.jpg" className='absolute' alt="" />
      </div>
      <Logo src={(author && author?.activeLogo) ? author?.activeLogo.fileUrl : null} height={50} width={50}/>
      <div className="job-detail-sticky-top flex justify-content-between align-items-end gap-10">
        <div>
          {
            title && <h1 className='job-title'>{title}</h1>
          }
          <p className='job-location flex gap-5 align-items-center'><b className='purple-txt text-ellipsis'>{author?.name}</b> <span className="job-company-eval block">
            <Rating
              readonly
              initialRating={3.5}
              className='portal-note'
              fractions={2}
              emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
              fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
            />
          </span><span className='text-ellipsis'>| {author?.adress}</span></p>
        </div>
        <Link to={author?.name ? `/portail/${author?.id}` : `/profil/${author?.id}`} className="btn btn-outline-purple">{t('Consulter')} <ChevronRight /></Link>
      </div>
      <div className="job-requirements flex justify-content-between">
        {
          xp && <div className='flex flex-column'>
            <span>{t('EXPERIENCE')}</span>
            <b>{xp}</b>
          </div>
        }
        {
          grade &&
          <div className='flex flex-column'>
            <span>{t('GRADE')}</span>
            <b>{grade?.title}</b>
          </div>
        }
        {
          type &&
          <div className='flex flex-column'>
            <span>{t('TYPE')}</span>
            <b>{type?.title}</b>
          </div>
        }
        <div className='flex flex-column'>
          {
            (salary && ((!isNaN(salary?.min) && !isNaN(salary?.max) && salary?.min > 0 && salary?.max > 0) || (!isNaN(salary?.amount) && salary?.amount > 0))) &&
            <>
              <span>{t('SALAIRE')}</span>
              {
                (from && to) ?
                <b>{(salary?.min && salary?.max) ? millify(convertCurrency(salary?.min, from, to)) + "-" + millify(convertCurrency(salary?.max, from, to)) : millify(convertCurrency(salary.amount, from, to))} {currency?.code}</b>
                :
                <b>{(salary?.min && salary?.max) ? millify(salary?.min) + "-" + millify(salary?.max) : millify(salary.amount)} {salary?.currency?.code}</b>
              }

            </>
          }
        </div>
      </div>
      <hr />
      <div className="role">

        {
          summary &&
          <>
            <h4>{t('Résumé du poste')}</h4>
            <p>{summary}</p>
          </>
        }
      </div>


      {
        t('description') &&
        <div className="role">
          <h4>{t('Description détaillé du poste')}</h4>
          <p className='inset-list'>{htmlToJsx.parse(description)}</p>
        </div>
      }

      {/* <div className="role">
        <h4>Missions et responsabilites</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ipsum, praesentium fugiat illo, quod veniam repellendus voluptatem aut sapiente veritatis, necessitatibus aliquid reiciendis consequuntur. Dolor consequuntur quos ipsam laudantium eveniet?</p>
      </div>
      <div className="role">
        <h4>Qualification requises</h4>
        <ul>
          <li>Bacc+3 ou Master en Informatique ou domaine eqivatent</li>
          <li>Au moins 2ans d'éxperience en PHP,SYMFONY,LARAVEL</li>
          <li>Connaissance des outils de design(Figma,Photoshop,etc...)</li>
          <li>Bonne connaissance du DevOps et VPS</li>
          <li>Apte a travailler en equipe</li>
          <li>Dynamique,curieux et autonome</li>
          <li>Concevoir et maintenir les sites de nos collaborateurs</li>
        </ul>
      </div> */}
    </div>
  )
}

export default JobDetails
