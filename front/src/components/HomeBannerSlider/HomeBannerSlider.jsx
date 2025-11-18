import React, { useEffect, useState } from 'react'
import './HomeBannerSlider.scss'
import Slider from 'react-slick';
import GoodDealCard from '../GoodDealCard/GoodDealCard';
import { ChevronLeft, ChevronRight, PlusLg } from 'react-bootstrap-icons';
import { useQuery } from '@tanstack/react-query';
import { getInvests } from '../../api/invest';
import GoodDealCardSkeleton from '../GoodDealCard/GoodDealCardSkeleton';
import { Link } from 'react-router-dom';
import RequireAuthOnClick from '../RequireAuthOnclick/RequireAuthOnClick';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
const HomeBannerSlider = () => {
     const { t } = useTranslation();
    const self = useRef();
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(true);

    const {
        isLoading: investsLoading,
        error: getInvestError,
        data: invests
    } = useQuery({
        queryKey:['repoInvests'],
        queryFn:() => getInvests({ ipp: 10 })
    })

    console.log(invests, 'invests')


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        beforeChange: (current, next) => {
            setCanGoBack(next > 0);
        },
        afterChange: (current) => {
            const slider = self.current;
            if (slider) {
                const totalSlides = slider.props.children.length;
                setCanGoForward(current < totalSlides - 1);
            }
        }
    };
    return (
        <div className='home-banner-slider'>
            <div>
                <div className="home-banner-top flex align-items-center justify-content-between">
                    {/* <div className='heading'>
                        <h1>{t('Les bonnes Affaires')}</h1>
                    </div> */}
                    {/* <div className="flex align-items-center gap-10">
                        <button className="floating-btn" onClick={self.current?.slickPrev}><ChevronLeft size={21} /></button>
                        <button className="floating-btn" onClick={self.current?.slickNext}><ChevronRight size={21} /></button>
                    </div> */}
                </div>
                {
                    investsLoading ?
                        <Slider {...settings}>
                            {
                                [...new Array(7)].map((d, i) => <div key={i} style={{ width: 230, aspectRatio: 1 }}>
                                    <GoodDealCardSkeleton/>
                                </div>)
                            }
                        </Slider>
                        :
                        <Slider ref={self} {...settings}>
                            {
                                [
                                    <RequireAuthOnClick key={'/investissements/nouveau'}>
                                        <Link to="/investissements/nouveau" className='add-invest' style={{ width: 230, aspectRatio: 1, display: 'block' }}>
                                            <div>
                                                <div>
                                                    <div className="ico"><PlusLg size={22} /></div>
                                                    <span>{t('Créer un Investissement')}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </RequireAuthOnClick>
                                    , ...(invests ? invests?.map((d, i) => <div key={i} style={{ width: 230, aspectRatio: 1 }}>
                                        <GoodDealCard data={d} />
                                    </div>) : [])
                                ]
                            }
                        </Slider>
                }
                {canGoBack && (
                    <button
                        className="floating-btn prev-btn"
                        onClick={() => self.current?.slickPrev()}
                        >
                        <ChevronLeft size={21} />
                    </button>
                )}
                {canGoForward && (
                    <button
                        className="floating-btn next-btn"
                        onClick={() => self.current?.slickNext()}
                        >
                        <ChevronRight size={21} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default HomeBannerSlider
