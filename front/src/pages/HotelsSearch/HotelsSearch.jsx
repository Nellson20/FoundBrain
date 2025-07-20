import React from 'react'
import './HotelsSearch.scss'
import { ArrowRight, ArrowUp, ChevronCompactDown, ChevronCompactUp, ChevronDown, ChevronLeft, ChevronRight, People, Search, Wifi, X } from 'react-bootstrap-icons'
import { MapContainer, TileLayer, UseMap, Marker, Popup } from "react-leaflet";
import Rating from 'react-rating';
import { FaHotel, FaLocationArrow } from "react-icons/fa6";
import { IoIosCafe } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import StickySideBar from '../../components/StickySideBar/StickySideBar';
import { useState } from 'react';
import { useEffect } from 'react';


const NavbarPrice = ({ setOpen }) => {
  const [boxShadow, setBoxShadow] = useState(false);
  useEffect(() => {

    const onScroll = () => {
      scollingElem.scrollTop >= 192 ?
        setBoxShadow(true) : setBoxShadow(false)
    }
    const scollingElem = document.getElementById('App');
    scollingElem?.addEventListener('scroll', onScroll)

    const handleResize = () => {
      const largeur = window.innerWidth;
      const hauteur = window.innerHeight;
      // console.log('Nouvelle taille de l\'écran - Largeur :', largeur, ', Hauteur :', hauteur);
      if (largeur <= 1200) {
        setOpen(true)
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      scollingElem.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize);

    }
  }
    , [])
  return (
    <div className="hotel-search-price">
      <div className={`hotel-search-price-content ${boxShadow ? ' active' : ''}`}>
        <div className='hotel-search-item'>
          <div className='hotel-price'>
            <span><b>Prix : </b> par nuit</span>
            <div className='hotel-price-content'>
              <span>1$ - 500$</span>
              <ChevronCompactDown />
            </div>
          </div>
        </div>

        <div className='hotel-search-item'>
          <div className='hotel-price'>
            <span><b>Filtres : </b></span>
            <div className='hotel-price-content'>
              <span>Choisir</span>
              <ChevronCompactDown />
            </div>
          </div>
        </div>

        <div className='hotel-search-item'>
          <div className='hotel-price'>
            <span><b>Avis :</b></span>
            <div className='hotel-price-content'>
              <span>Tout</span>
              <ChevronCompactDown />
            </div>
          </div>
        </div>

        <div className='hotel-search-item'>
          <div className='hotel-price'>
            <span><b>Hebergement</b></span>
            <div className='hotel-price-content'>
              <span>Choisir</span>
              <ChevronCompactDown />
            </div>
          </div>
        </div>
        <div className='hotel-search-item'>
          <div className='hotel-price'>
            <span><b>Emplacement</b></span>
            <div className='hotel-price-content'>
              <span>Centre ville</span>
              <ChevronCompactDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const HotelsSearch = () => {
  const [open, setOpen] = useState(false)


  return (
    <div id='HotelsSearch'>
      <div id='top-bannerSearch' className="relative" style={{ background: 'url(/img/other/hotelbanner.jpg)' }}></div>
      <div className='search' >

        <div className='search-page-input'>
          <form className="hotel-searchbar flex">
            <div className="keyword-inpt flex-grow-1">
              <input type="text" placeholder='Antanananarivo destination' />
            </div>
            <div className="date-inpt flex align-items-center">
              <div className='flex align-items-center'><span>Sam. 30 jan.</span> <ArrowRight /> <span>Jeu. 12 fev.</span><ChevronDown /></div>
            </div>
            <div className="include-inpt flex align-items-center">
              <div className='flex align-items-center gap-5'><People /> <span>Adultes</span><span>Chambres</span><ChevronDown /></div>
            </div>
            <div className="search-btn">
              <button className="btn btn-purple"><Search /></button>
            </div>
          </form>

          <NavbarPrice setOpen={setOpen} />
        </div>

        <div className="contents">

          <div className={`content-search ${open ? ' hide' : ''}`}>

            <div className="content-left">
              <div className="content-title">
                <h3>Antananarivo ,hotels disponible</h3>
                <div className='content-suggest-search'>
                  <div className="content-item-search relative">
                    <img className="image-hover-scale" src='/img/other/montagne.jpg' alt='' />
                    <div className="content-item-search-text">
                      <span>Séjour 5 étoile</span>
                    </div>
                  </div>

                  <div className="content-item-search relative">
                    <img className="image-hover-scale" src='/img/other/amsterdam.jpg' alt='' />
                    <div className="content-item-search-text">
                      <span>Séjours haut de gamme</span>
                    </div>
                  </div>

                  <div className="content-item-search relative">
                    <img className="image-hover-scale" src='/img/other/voyage.jpg' alt='' />
                    <div className="content-item-search-text">
                      <span>Expériences de voyage exceptionnelles</span>
                    </div>
                  </div>

                  <div className="content-item-search relative">
                    <img src='/img/other/wifi.webp' className="image-hover-scale" alt='' />
                    <div className="content-item-search-text">
                      <span>Wi-Fi gratuis</span>
                    </div>
                  </div>

                  <div className="content-item-search relative">
                    <img src='/img/other/chambre_luxe.jpg' className="image-hover-scale" alt='' />
                    <div className="content-item-search-text">
                      <span>Note des voyageurs: trés bon</span>
                    </div>
                  </div>

                  <div className="content-item-search relative">
                    <img src='/img/other/chambre_luxe_2.jpg' className="image-hover-scale" alt='' />
                    <div className="content-item-search-text">
                      <span>Séjours de luxe</span>
                    </div>
                  </div>

                </div>

                {open && (

                  <div className='open-map-btn relative'>
                    <img src='/img/other/plan.jpeg' alt='' />
                    <div className='text-map flex gap-5' onClick={() => setOpen(false)}>
                      <FaLocationArrow />
                      <span>Plan</span>
                    </div>
                  </div>
                )
                }


                <div className='content-title-item'>

                  <div className="content-title-item-left">
                    <p>Nous avons trouvé <b>49 </b>hôtels sur <b>272</b> sites</p>
                  </div>


                  <div className="content-title-item-right">
                    <span><b>Trier par</b></span>
                    <div className='suggest flex'>
                      <span>Nos suggestion</span>
                      <ChevronCompactDown />
                    </div>
                  </div>

                </div>
              </div>

              <div className='hotel-search-results'>
                <div className="hotel-search-results-item flex">
                  <div className='img relative'>
                    <img src='/img/other/chambre_0.jpg' alt='' />
                    <div className='img-text'>
                    </div>
                  </div>
                  <div className='caption'>
                    <h4 className='flex gap-5 align-items-center'><FaHotel />Hotel Radison</h4>
                    <p>Antananarivo</p>
                    <div className='gems flex'>
                      <Rating
                        readonly
                        initialRating={3.5}
                        onChange={(value) => { }}
                        fractions={2}
                        emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                        fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                      />
                      <p>160 avis</p>
                    </div>
                    <p><b>125 000 MGA</b></p>
                    <div className="item">
                      <ul className='flex '>
                        <li className='flex'>
                          <b><IoIosCafe /></b>
                          <span>Petit-déjeuner</span>
                        </li>
                        <li className='flex'>
                          <Wifi />
                          <span>Wifi</span>
                        </li>
                        <li className='flex'>
                          <IoFastFoodOutline />
                          <span>Cuisine</span>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>

                <div className="hotel-search-results-item flex">
                  <div className='img relative'>
                    <img src='/img/other/chambre_1.jpg' alt='' />
                    <div className='img-text'>

                    </div>
                  </div>
                  <div className='caption'>
                    <h4 className='flex gap-5 align-items-center'><FaHotel />Hotel Colbert</h4>
                    <p>Antananarivo</p>
                    <div className='gems flex'>
                      <Rating
                        readonly
                        initialRating={3.5}
                        onChange={(value) => { }}
                        fractions={2}
                        emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                        fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                      />
                      <p>160 avis</p>
                    </div>
                    <p><b>125 000 MGA</b></p>
                    <div className="item">
                      <ul className='flex '>
                        <li className='flex'>
                          <b><IoIosCafe /></b>
                          <span>Petit-déjeuner</span>
                        </li>
                        <li className='flex'>
                          <Wifi />
                          <span>Wifi</span>
                        </li>
                        <li className='flex'>
                          <IoFastFoodOutline />
                          <span>Cuisine</span>
                        </li>

                      </ul>
                    </div>
                  </div>

                </div>

                <div className="hotel-search-results-item flex">
                  <div className='img relative'>
                    <img src='/img/other/chambre_2.jpg' alt='' />
                    <div className='img-text'>

                    </div>
                  </div>
                  <div className='caption'>
                    <h4 className='flex gap-5 align-items-center'><FaHotel />Carlton</h4>
                    <p>Antananarivo</p>
                    <div className='gems flex'>
                      <Rating
                        readonly
                        initialRating={3.5}
                        onChange={(value) => { }}
                        fractions={2}
                        emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                        fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                      />
                      <p>160 avis</p>
                    </div>
                    <p><b>125 000 MGA</b></p>
                    <div className="item">
                      <ul className='flex '>
                        <li className='flex'>
                          <b><IoIosCafe /></b>
                          <span>Petit-déjeuner</span>
                        </li>
                        <li className='flex'>
                          <Wifi />
                          <span>Wifi</span>
                        </li>
                        <li className='flex'>
                          <IoFastFoodOutline />
                          <span>Cuisine</span>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>


                <div className="hotel-search-results-item flex">
                  <div className='img relative'>
                    <img src='/img/other/chambre_3.jpg' alt='' />
                    <div className='img-text'>
                    </div>
                  </div>
                  <div className='caption'>
                    <h4 className='flex gap-5 align-items-center'><FaHotel />NovoHotel</h4>
                    <p>Antananarivo</p>
                    <div className='gems flex'>
                      <Rating
                        readonly
                        initialRating={3.5}
                        onChange={(value) => { }}
                        fractions={2}
                        emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                        fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                      />
                      <p>160 avis</p>
                    </div>
                    <p><b>125 000 MGA</b></p>
                    <div className="item">
                      <ul className='flex '>
                        <li className='flex'>
                          <b><IoIosCafe /></b>
                          <span>Petit-déjeuner</span>
                        </li>
                        <li className='flex'>
                          <Wifi />
                          <span>Wifi</span>
                        </li>
                        <li className='flex'>
                          <IoFastFoodOutline />
                          <span>Cuisine</span>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>

                <div className="hotel-search-results-item flex">
                  <div className='img relative'>
                    <img src='/img/other/chambre_4.jpg' alt='' />
                    <div className='img-text'>

                    </div>
                  </div>
                  <div className='caption'>
                    <h4 className='flex gap-5 align-items-center'><FaHotel />Hotel Androhy</h4>
                    <p>Antananarivo</p>
                    <div className='gems flex'>
                      <Rating
                        readonly
                        initialRating={3.5}
                        onChange={(value) => { }}
                        fractions={2}
                        emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                        fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                      />
                      <p>160 avis</p>
                    </div>
                    <p><b>125 000 MGA</b></p>
                    <div className="item">
                      <ul className='flex '>
                        <li className='flex'>
                          <b><IoIosCafe /></b>
                          <span>Petit-déjeuner</span>
                        </li>
                        <li className='flex'>
                          <Wifi />
                          <span>Wifi</span>
                        </li>
                        <li className='flex'>
                          <IoFastFoodOutline />
                          <span>Cuisine</span>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>


                <div className="hotel-search-results-item flex">
                  <div className='img relative'>
                    <img src='/img/other/chambre_5.jpg' alt='' />
                    <div className='img-text'>

                    </div>
                  </div>
                  <div className='caption'>
                    <h4 className='flex gap-5 align-items-center'><FaHotel />Hotels</h4>
                    <p>Antananarivo</p>
                    <div className='gems flex'>
                      <Rating
                        readonly
                        initialRating={3.5}
                        onChange={(value) => { }}
                        fractions={2}
                        emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                        fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                      />
                      <p>160 avis</p>
                    </div>
                    <p><b>125 000 MGA</b></p>
                    <div className="item">
                      <ul className='flex '>
                        <li className='flex'>
                          <b><IoIosCafe /></b>
                          <span>Petit-déjeuner</span>
                        </li>
                        <li className='flex'>
                          <Wifi />
                          <span>Wifi</span>
                        </li>
                        <li className='flex'>
                          <IoFastFoodOutline />
                          <span>Cuisine</span>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>


              </div>

            </div>


            <div className={`content-right${open ? ' hide' : ''}`}>
              <StickySideBar top={75}>
                <div className="close flex align-items-center justify-content-center">
                  <X size={40} onClick={() => setOpen(true)} />
                </div>
                <MapContainer
                  center={[51.505, -0.09]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className='map'
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[51.505, -0.09]}></Marker>
                </MapContainer>
              </StickySideBar>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default HotelsSearch