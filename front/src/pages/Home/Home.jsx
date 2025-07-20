import React, { useContext, useState, useEffect, useMemo } from 'react'
import './Home.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeBannerSlider from '../../components/HomeBannerSlider/HomeBannerSlider';
import WelcomeBanner from '../../components/WelcomeBanner/WelcomeBanner';
import { Briefcase, PlayFill, Tag, ChevronRight, ChevronLeft, Check2, ArrowRight, BuildingFill, Building, Megaphone } from 'react-bootstrap-icons';
import Avatar from '../../components/Avatar/Avatar';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import StickySideBar from '../../components/StickySideBar/StickySideBar';
import MediaContext from '../../context/MediaContext';
import { DESKTOP, SMARTPHONE, TABLET } from '../../constants/MediaTypeConstants';
import axios from 'axios';
import { Parser } from "html-to-react";

import PlanSlider from '../../components/PlanSlider/PlanSlider';
import Timeline from '../../components/Timeline/Timeline';
import { useQuery } from '@tanstack/react-query';
import { getCompanies } from '../../api/company';

import PortalList from '../../components/PortalList/PortalList';
import { useSelector } from 'react-redux';
import CurrencyContext from '../../context/CurrencyContext';
import { convertCurrency } from '../../utils/currencyUtils';
import RequireAuthOnClick from '../../components/RequireAuthOnclick/RequireAuthOnClick';

const Home = () => {
  const { user } = useSelector(store => store.user)
  const { deviceType } = useContext(MediaContext)
  const htmlToJsx = new Parser();
  const { data: companies, error: companiesGetError } = useQuery({
    queryKey: ['repoCompanies'],
    queryFn: getCompanies
  })
  const { data: latestNews, error: latestNewsError } = useQuery({
    queryKey: ['repoGateNews'],
    queryFn: () => {
      return axios({
        url: `${process.env.REACT_APP_GATENEWS_LAST_POSTS_URL}`,
        method: 'get'
      }).then((res) => res.data)
    }
  })

  useEffect(() => {
    console.log(latestNews, 'NEWS')
  }, [latestNews])
  const news=useMemo(()=>{
    return latestNews?.splice(0, 3)
  },[latestNews])


  return (
    <div className='home-page'>
      <WelcomeBanner />
      <HomeBannerSlider />
      <main className="flex gap-20">
        {
          deviceType === DESKTOP ? <div className="left">
            <ul className='left-menu'>

              <li>
                <Link><div className="ico">
                  <Building size={18} />
                </div>
                  <span className='text-ellipsis flex-grow-1'>Collectes de Dons</span></Link>
              </li>
              <li>
                <RequireAuthOnClick>
                  <Link to='/contacts'>
                    <div className="ico"><Briefcase size={18} /></div><span className='text-ellipsis flex-grow-1'>Mes contacts</span>
                  </Link>
                </RequireAuthOnClick>
              </li>
              <li>
                <Link>
                  <div className="ico"><Megaphone size={18} /></div><span className='text-ellipsis flex-grow-1'>Promotions</span>
                </Link>
              </li>
            </ul>
            <hr style={{ margin: '20px 10px' }} />

            <PortalList activeUser={user ? true : false} />

          </div> : ""
        }
        <div className="center">
          <Timeline />
        </div>
        {
          ((deviceType === DESKTOP) || (deviceType === TABLET)) ? <div className="right">
            <StickySideBar top={73} className='flex flex-column gap-15'>
              {
                latestNews &&
                <div className="top-news">
                  <h4>GateNews</h4>
                  <h5 className='line-clamp-2'>{news[0]?.title}</h5>
                  <div className="news-slider flex gap-5">
                  {
                    news.map((n, i) => (
                      <Link to={n.url} target='_blank' key={i} className="slide light-on-hover pointer">
                        <img src={n.photoUrl} alt="" />
                      </Link>
                    ))
                  }
                  </div>
                  <div className="flex align-items-center justify-content-between py-5">
                    <div className='flex align-items-center gap-5'>
                      <Avatar height={25} width={25} />
                      <span>MarieClaire</span>
                    </div>
                    <Link to='https://gatenews.africa' className='flex align-items-center'>Voir plus<ChevronRight /></Link>
                  </div>
                </div>
              }
              <div className="top-videos">
                <h4>Videos populaires en Afrique</h4>
                <div className="popular-videos-slide-card">
                  <div className="top p-10">
                    <small>Afrimuz.com</small>
                    <br />
                    <b>"Gims en live" : En live show case à Madagascar...</b>
                  </div>
                  <div className="slider relative">
                    <div className="slider-prev-btn"><ChevronLeft size={30} /></div>
                    <div className="slider-next-btn"><ChevronRight size={30} /></div>
                    <Slider {...{
                      dots: false,
                      arrows: false,
                      infinite: true,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      autoplay: true
                    }}>
                      <div className='slide'>
                        <img src="/img/video/gims.jpeg" alt="" />
                        <div className="list">1/2</div>
                        <span className="paly-video-btn block">
                          <PlayFill size={20} />
                        </span>
                      </div>
                      <div className='slide'>
                        <img src="/img/video/gims.jpeg" alt="" />
                        <div className="list">1/2</div>
                        <span className="paly-video-btn block">
                          <PlayFill size={20} />
                        </span>
                      </div>
                      <div className='slide'>
                        <img src="/img/video/gims.jpeg" alt="" />
                        <div className="list">1/2</div>
                        <span className="paly-video-btn block">
                          <PlayFill size={20} />
                        </span>
                      </div>
                      <div className='slide'>
                        <img src="/img/video/gims.jpeg" alt="" />
                        <div className="list">1/2</div>
                        <span className="paly-video-btn block">
                          <PlayFill size={20} />
                        </span>
                      </div>
                      <div className='slide'>
                        <img src="/img/video/gims.jpeg" alt="" />
                        <div className="list">1/2</div>
                        <span className="paly-video-btn block">
                          <PlayFill size={20} />
                        </span>
                      </div>
                      <div className='slide'>
                        <img src="/img/video/gims.jpeg" alt="" />
                        <div className="list">1/2</div>
                        <span className="paly-video-btn block">
                          <PlayFill size={20} />
                        </span>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
              <PlanSlider />
            </StickySideBar>
          </div> : ""
        }
      </main >
    </div >
  )
}

export default Home
