import React, { useContext } from 'react'
import { BriefcaseFill, ExclamationDiamondFill, FilePostFill, GeoAlt, HouseDoorFill, PencilSquare, PeopleFill, ThreeDots } from 'react-bootstrap-icons'
import { Outlet } from 'react-router-dom'
import Avatar from '../components/Avatar/Avatar'
import { Link } from 'react-router-dom'
import StickySidebar from '../components/StickySideBar/StickySideBar'
import DoNavLink from '../components/DoNavLink/DoNavLink'
import MediaContext from '../context/MediaContext'
import { DESKTOP } from '../constants/MediaTypeConstants'
const PageLayout = () => {
  const { deviceType } = useContext(MediaContext)
  return (
    <div className='portal-page'>
      <div className="top">
        <div className="cover-photo">

        </div>
        <div className="portal-info">

        </div>
        <div className="portalNav">
          
        </div>
      </div>





      {/* <div className='cover relative'>
        <img src="/img/entreprises/ent1.jpg" alt="" />
        <div className="gradient"></div>
      </div>
      <main className='flex gap-20'>
        <div className="left">
          <div className='top'>

            <div className='capt flex justify-content-center flex-column'>
              <div className="center flex justify-content-center relative">
                <div className="flag">
                  <img src="/img/flags/Flag_of_Madagascar.svg" alt="" />
                </div>
                <Avatar height={deviceType===DESKTOP ? 100 : 70} width={deviceType===DESKTOP ? 100 : 70} radius={5} />
                <button className='modif-btn'><PencilSquare /></button>
                <div className="btns flex gap-10">
                  <button className='contact-btn'>Prise de contact</button>
                  <button className='follow-btn btn-purple'>Suivre</button>
                  <button className='more-btn'><ThreeDots /></button>
                </div>
              </div>
              <div className="info relative">
                <div className="numbers absolute flex gap-15">
                  <span>
                    <h4>32</h4>
                    <span>Branches</span>
                  </span>
                  <span>
                    <h4>5</h4>
                    <span>Partenaires</span>
                  </span>
                  <span>
                    <h4>10</h4>
                    <span>Employés</span>
                  </span>
                </div>
                <h1 className='page-name'>Gate Company</h1>
                <span className="page-type">Entreprise</span>
                <br />
              </div>
            </div>
            <nav className='default-nav'>
              <ul className='flex align-items-center'>
                <li>
                  <DoNavLink to="accueil" activeClass='active'><HouseDoorFill size={20} /><span>Accueil</span></DoNavLink>
                </li>
                <li>
                  <DoNavLink to='a-propos' activeClass='active'><ExclamationDiamondFill size={18} stroke='3px' /><span>Apropos</span></DoNavLink>
                </li>
                <li>
                  <DoNavLink to='actualite' activeClass='active'>
                    <FilePostFill size={18} /><span>Actualité</span>
                  </DoNavLink>
                </li>
                <li><Link><BriefcaseFill size={20} /><span>Offre d'emplois</span></Link></li>
                <li><Link><PeopleFill size={20} /><span>Emloyés</span></Link></li>
              </ul>
            </nav>
          </div>
          <Outlet />
        </div>

        {
          deviceType === DESKTOP ?
            <div className="right">
              <StickySidebar top={70}>
                <div className="about-card p-15" style={{ width: '100%', maxWidth: '100%' }}>
                  <h4 className='flex align-items-center gap-5'><GeoAlt size={20} />Localisation</h4>
                  <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.5336493894574!2d47.53252567435297!3d-18.907759007290572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07d96ef044b85%3A0x1cb9f973401ca2a4!2sTsenagasy!5e0!3m2!1sfr!2smg!4v1686743681929!5m2!1sfr!2smg" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                  <hr />
                  <h4>Description</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione error aut nostrum iusto nisi officiis id. Cumque odio fugit cum</p>
                  <hr />
                  <h4>Contact rapide</h4>
                  <span>gatecompany@contact.mg</span>
                  <br />
                  <span>034 56 673 73 | 032 43 561 83</span>
                </div>
                <div className="same-domain-entreprises-list p-15">
                  <h4>Dans le même domaine</h4>
                  <ul>
                    <li className='flex gap-10'>
                      <Avatar />
                      <div className="info">
                        <h5>Emedia Madagascar</h5>
                        <span>Universite de l'art du numérique</span>
                      </div>
                    </li>
                    <li className='flex gap-10'>
                      <Avatar />
                      <div className="info">
                        <h5>Emedia Madagascar</h5>
                        <span>Universite de l'art du numérique</span>
                      </div>
                    </li>
                    <li className='flex gap-10'>
                      <Avatar />
                      <div className="info">
                        <h5>Emedia Madagascar</h5>
                        <span>Universite de l'art du numérique</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </StickySidebar>

            </div> : ""
        }
      </main> */}
    </div>
  )
}

export default PageLayout
