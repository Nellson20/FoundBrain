import React from 'react'
import './Slider.scss'
import { useRef } from 'react';
import Slider from 'react-slick';
import { CustomNextArrow, CustomPrevArrow } from '../Arrows/Arrows';
import Rating from 'react-rating';

export const CitySlider = ({ titleSlider }) => {

  const citySlide = useRef();
  const settings = {
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,

  };

  return (
    <>
      <CustomNextArrow onClick={citySlide.current?.slickNext} />
      <CustomPrevArrow onClick={citySlide.current?.slickPrev} />
      <Slider ref={citySlide} {...settings}>
        <div className="city-slide-item">
          <img src="/img/other/baobab.webp" alt="image" />

          <div className="city-slide-container">
            <h1>Antananarivo</h1>
            <p>Analakely</p>
          </div>

        </div>
      </Slider>
    </>
  )
}

export const CountrySlider = ({ titleSlider }) => {

  const countrySlide = useRef();
  const settings = {
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,

  };

  return (
    <>
      <CustomNextArrow onClick={countrySlide.current?.slickNext} />
      <CustomPrevArrow onClick={countrySlide.current?.slickPrev} />

      <Slider ref={countrySlide} {...settings}>
        {titleSlider?.map((data, i) => (
          <div className="country-slide-item" key={i}>
            <img src={data.image} alt="image" style={{background:'red',display:'block !important'}}/>
            {/* <div className="country-slide-container" >
              <h1>{data.contains}</h1>

              <div className='country-rating'>
                <Rating
                  onChange={(value) => { }}
                  fractions={2}
                  initialRating={3}
                  readonly
                  emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                  fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                />
              </div>

            </div> */}
          </div>
        ))}
      </Slider>
    </>
  )
}


export const CarreSlider = ({ donneSlider }) => {
  const devertisementSlide = useRef()

  const settingsDivertisement = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive:[
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <>
      <CustomNextArrow onClick={devertisementSlide.current?.slickNext} />
      <CustomPrevArrow onClick={devertisementSlide.current?.slickPrev} />

      <Slider ref={devertisementSlide} {...settingsDivertisement} >
        {
          donneSlider?.map((data, i) => (
            <div className="divertisement-item-caroseul" key={i}>
              <img src={data.image} alt="image" />
              <div className="divertisement-item-text">
                <h1>{data.Title}</h1>
                <p>
                  <span class="custom-bullet">&#8226;</span> {data.data1}
                  <span class="custom-bullet">&#8226;</span> {data.data2}
                </p>
              </div>
            </div>
          ))}
      </Slider>
    </>
  )
}