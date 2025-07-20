import React, { useEffect } from 'react'
import { BusFront, Calendar, Camera, Camera2, CaretRight, CarFront, ChevronLeft, ChevronRight, CupStraw, DoorOpen, Gem, House, ImageFill, Info, InfoCircle, InfoSquareFill, PciCard, People, PostageFill, PostcardFill, Star, StarFill, ThermometerSnow, Tv, VolumeMuteFill, Wifi, Wifi1 } from 'react-bootstrap-icons'
import './HotelsReservation.scss'
import Rating from 'react-rating'
import { LuCalendarCog } from 'react-icons/lu'
import { MdEditNotifications, MdOutlineViewAgenda, MdViewAgenda } from 'react-icons/md'
import { GiAnimalSkull, GiBed, GiDogHouse, GiDoor, GiPositionMarker, GiSuitcase } from 'react-icons/gi'
import Slider from 'react-slick'
import { Image } from 'react-bootstrap'
import { ChevronDown } from 'react-bootstrap-icons'
import { MapContainer, TileLayer, UseMap, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getHotelDetails } from '../../api/hotel'
import { Link } from 'react-router-dom'
import TextViewMore from '../../components/TextViewMore/TextViewMore'
import StickySideBar from '../../components/StickySideBar/StickySideBar'

const AttractionReservation = ({ data }) => {






  return (

    <div className='caroseul-item'>
      <div className='img-caroseul'>
        <img src={data.img} alt="" />
      </div>

      <div className="caroseul-content">
        <div className="caroseul-title ">
          <h4 className='line-clamp-2'>{data.title}</h4>
        </div>

        <div className='caroseul-body'>
          <ul>
            <li >
              <div className="gems">
                <Rating
                  readonly
                  initialRating={3.5}
                  onChange={(value) => { }}
                  fractions={2}
                  emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                  fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                />
              </div>
              <div className="gems-avis">167 avis</div>
            </li>

            <li>
              <p>N° 2 sur 96 Hotel à Antanananrivo</p>
            </li>
            <li className='postion '>
              <div className='item-position'>
                <GiPositionMarker />
              </div>
              <div className='item-position'>
                2.4 Km
              </div>
            </li>
          </ul>
        </div>
        <div className='caroseul-body-item'>
          <p className='item'>100 $</p>
          <button>
            voir l'hotel
          </button>

        </div>
      </div>
    </div>
  )
}


const AvisCard = ({ data }) => {
  return (
    <div className="avis-card p-15">
      <div className='card-title flex gap-15 align-items-center'>
        <div className='avatar'>
          <img src={data.img} alt='' />
        </div>
        <div className='content-card'>
          <div className='content-card-title'>
            <p><b>{data.nom}</b> a écrit un avis (8 févr.)</p>
          </div>
          <div className='content-card-container'>
            <p>3 contributions • 1 vote utile</p>
          </div>
        </div>
      </div>
      <div className='content-body py-10'>
        <ul>
          <li className='py-5'>
            <Rating
              readonly
              initialRating={3.5}
              onChange={(value) => { }}
              fractions={2}
              emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
              fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
            />
          </li>
          <li className='py-5'>
            <h4><b>{data.title}</b></h4>
          </li>
          <li>{data.text}</li>
          <li className='flex align-items-center gap-5 py-5'><span style={{ textDecoration: 'underline' }}>Plus</span> <ChevronDown /></li>
        </ul>
      </div>
    </div>
  )
}

const HotelsReservation = () => {

  //get hotel details
  const { hotelId } = useParams()

  const {
    data: hotelDetails,
    error: hotelDetailsErr,
    isLoading: hotelDetailsLoading
  } = useQuery({
    queryKey: ['hotelDetails', hotelId],
    queryFn: () => getHotelDetails(hotelId)
  })



  useEffect(() => {
    console.log(hotelDetails, 'HOTELDETAILS')
  }, [hotelDetails])

  const dataReservation = [
    {
      img: '/img/other/portlouis.jpg',
      title: 'Hotel Radison'
    },
    {
      img: '/img/other/fianarantsoa.jpg',
      title: 'Hotel Fianarantsoa'
    },
    {
      img: '/img/other/vacances.jpg',
      title: 'Hotel Nosy Be'
    },
    {
      img: '/img/other/hoteldubai.jpg',
      title: 'Hotel dubai'
    },
    {
      img: '/img/other/hoteldubai.jpg',
      title: 'Hotel dubai'
    }

  ]

  const procheData = [
    {
      img: '/img/other/hotelbanner.jpg',
      title: 'Hotel Radison'
    },
    {
      img: '/img/other/hakanto.jpg',
      title: 'Hotel Kanto'
    },
    {
      img: '/img/other/accra.jpg',
      title: 'Hotel Antanananarivo'
    },
    {
      img: '/img/other/dianibeach.jpg',
      title: 'Hotel Beach'
    },
    {
      img: '/img/other/casablanca.jpg',
      title: 'Hotel casablanca'
    }

  ]

  const avisData = [
    {
      nom: 'Dominique',
      img: '/img/other/2.webp',
      title: 'Mon hotel préfere',
      text: 'Le service, les repas du petit-déjeuner, déjeuner et dîner aux deux restaurants sont excellent. La chambre est très bien équipée avec des matériaux hauts de gamme. Le personnel est d’une gentillesse très positive. C’était je crois ma 15eme visite depuis l’ouverture. De mieux en mieux'
    },
    {
      nom: 'Donnel',
      img: '/img/other/avatar.jpg',
      title: 'Incroyable',
      text: "Quel incroyable hôtel Tout était parfait, le confort du lit, la vue sur le petit lac et la ville, la salle de sport tout équipée et la piscine sur le toit ! Le restaurant est très raffiné, nous nous sommes régalés Et que dire du petit déjeuner ?? Le meilleur que nous n'ayons jamais vu !!! Il y a tout, vraiment tout c'était dingue"
    },
    {
      nom: 'Antema Nirina',
      img: '/img/other/avatar_3.png',
      title: 'Superbe expérience !',
      text: "Accueil chaleureux et nuit exceptionnel au sein de votre établissement. Très satisfaite. La chambre est bien équipée et nous avions été accueilli par quelques douceurs. Le personnel est aux petits soins"
    },
    {
      nom: 'Ny aina',
      img: '/img/other/avatar_2.png',
      title: 'Unforgettable Luxury: Radisson Blu Madagascar',
      text: "Accueil chaleureux et nuit exceptionnel au sein de votre établissement. Très satisfaite. La chambre est bien équipée et nous avions été accueilli par quelques douceurs. Le personnel est aux petits soinsTout d'abord, le personnel du Radisson Blu, en particulier Fandresena, Myriane et Miorakanto, mérite les plus grands éloges. Leur dévouement inébranlable pour assurer le confort et la satisfaction des clients comme moi était vraiment remarquable. L'attention aux détails et la gentillesse de Fandresena ont rendu chaque interaction un plaisir."
    },
    {
      nom: 'Gate Tech',
      img: '/img/other/avatar_4.jpg',
      title: 'Erreur de facturation',
      text: "Erreur de facturation reconnue au départ de l'hôtel. La comptabilité étant fermée, on me promet une régularisation ultérieure. Depuis, plus aucune nouvelle, aucune réponse à mes mails. Le prix est élevé, ce type de gestion est inadmissible pour un hôtel de ce standing."
    }
  ]

  return (
    <div id="hotelsReservation">
      <div className="nav">
      </div>
      <div className='hotels-container'>
        <div>
          <div className="hotels-header">
            {/* <div className="hotels-nav">
              <ChevronLeft />
              <span>Retour</span>
            </div> */}
            {
              hotelDetails?.pictures?.length > 0 &&
              <>
                <div className="body-hotels">
                  <div className='item-a'>
                    <img className="image-hover-scale" src={hotelDetails?.pictures[0].fileUrl} />
                  </div>
                  <div className='item-b relative'>
                    <img className="image-hover-scale" src={hotelDetails?.pictures[1].fileUrl} />
                    <div className='text'>
                      <Camera />
                      <span>Voir les (400)</span>
                    </div>
                  </div>
                  <div className='item-c'>
                    <img className="image-hover-scale" src={hotelDetails?.pictures[2].fileUrl} />
                  </div>
                  <div className='item-d'>
                    <img className="image-hover-scale" src={hotelDetails?.pictures[3].fileUrl} />
                  </div>
                  <div className='item-e'>
                    <img className="image-hover-scale" src={hotelDetails?.pictures[4].fileUrl} />
                  </div>
                </div>
                <div className='body-hotels-slider'>
                  <div className='text-body'>
                    <ImageFill color='white' />
                    <span>4</span>
                  </div>
                  <Slider {...{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    infinite: true,
                    autoplay: true,
                    speed: 500,
                    arrows: false
                  }}>
                    <div className="body-item-hotels">
                      <img src='/img/other/chambre_5.jpg' alt='' />
                    </div>
                    <div className="body-item-hotels">
                      <img src='/img/other/chambre_3.jpg' alt='' />
                    </div>
                    <div className="body-item-hotels">
                      <img src='/img/other/chambre_4.jpg' alt='' />
                    </div>
                  </Slider>
                </div>
              </>

            }



          </div>

          <div className="hotel-content">
            <div className="description-hotel">
              <div className='hotel-name mt-10'>
                <div className="hotel-stars flex orange-txt">
                  {
                    [...new Array(hotelDetails?.rating)].map((r, i) => <StarFill key={i} size={13} />)
                  }
                </div>
                <h1>{hotelDetails?.name}</h1>
                <span className='txt-2'>{hotelDetails?.address}</span>
              </div>

              <div className="description-body">
                <div className="description-left">
                  <div className="description-left-title">
                    <div className="hotel-evaluations">
                      <div className='top flex gap-10 mb-15 align-items-center'>
                        <div className='hotel-global-note'>
                          <span className='block'>4.5</span>
                        </div>
                        <div>
                          <span><b>Excellent</b></span>
                          <div className='gems flex gap-10 align-items-center'>
                            <Rating
                              readonly
                              initialRating={3.5}
                              onChange={(value) => { }}
                              fractions={2}
                              emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                              fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                            />
                            <span className='txt-2'>160 avis</span>
                          </div>
                        </div>
                      </div>
                      <div className='item-gems'>
                        {/* <ul>
                          <li>
                            <Rating
                              className='rating-1'
                              readonly
                              initialRating={3.5}
                              onChange={(value) => { }}
                              fractions={2}
                              emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                              fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                            />
                            <span className='txt-2'>Emplacement</span>
                          </li>
                          <li>
                            <Rating
                              className='rating-1'
                              readonly
                              initialRating={3.5}
                              onChange={(value) => { }}
                              fractions={2}
                              emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                              fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                            />
                            <span className='txt-2'>Propreté</span>
                          </li>
                          <li>
                            <Rating
                              className='rating-1'
                              readonly
                              initialRating={3.5}
                              onChange={(value) => { }}
                              fractions={2}
                              emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                              fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                            />
                            <span className='txt-2'>Service</span>
                          </li>
                          <li>
                            <Rating
                              className='rating-1'
                              readonly
                              initialRating={3.5}
                              onChange={(value) => { }}
                              fractions={2}
                              emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                              fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                            />
                            <span className='txt-2'>Rapport qualité / prix</span>
                          </li>

                </ul>*/}
                      </div>
                    </div>
                    <section className='mb-15'>
                      <h2 className='mb-10' style={{ fontSize: '16px' }}>À propos de {hotelDetails?.name}</h2>
                      <TextViewMore limiteMot={20}>{hotelDetails?.description}</TextViewMore>
                    </section>
                    <hr />
                    <section>
                      <h2 className='mb-10' style={{ fontSize: '16px' }}>Equipements de l'établissement</h2>

                      <div className="equipments-grid">
                        {
                          (hotelDetails?.equipments.length > 0) &&
                          hotelDetails?.equipments.slice(0, 6).map((e, i) => (
                            <div key={i} className="flex align-items-center">
                              <div className="ico">
                                <LuCalendarCog />
                              </div>
                              <span className='txt-2'>{e.equipmentTitle}</span>
                            </div>
                          ))
                        }



                        {/* <div className="description-item">
  <BusFront />
  <span>Transfert aéroport</span>
</div>

<div className="description-item">
  <Wifi />
  <span>Wi-Fi haut débit gratuit</span>
</div>

<div className="description-item">
  <CupStraw />
  <span>Bar/lounge</span>
</div>


<div className="description-item">
  <GiDogHouse />
  <span>Animaux domestiques autorisés</span>
</div>


<div className="description-item">
  <GiSuitcase />
  <span>Centre d'affaires avec accès Internet</span>
</div> */}
                      </div>


                      <div className='flex align-items-center orange-txt py-10'><span>Voir tous les équipements</span><ChevronRight /></div>
                    </section>



                    <section>
                      <h2 className='mb-10' style={{ fontSize: '16px' }}>Services dans l'établissement</h2>

                      <div className="equipments-grid">
                        {
                          (hotelDetails?.serviceHotels.length > 0) &&
                          hotelDetails?.serviceHotels?.slice(0, 6).map((s, i) => (
                            <div key={i} className="flex align-items-center">
                              <div className="ico">
                                <LuCalendarCog />
                              </div>
                              <span className='txt-2'>{s.serviceTitle}</span>
                            </div>
                          ))
                        }

                        {/* <div className='flex align-items-center'>
                        <DoorOpen />
                        <span>Rideaux occulantes</span>
                      </div>

                      <div className='flex align-items-center'>
                        <VolumeMuteFill />
                        <span>Chambres insonorisées</span>
                      </div>

                      <div className='flex align-items-center'>
                        <ThermometerSnow />
                        <span>Climatisation</span>
                      </div>

                      <div className='flex align-items-center'>
                        <Tv />
                        <span>TV par câble/satellite</span>
                      </div> */}

                      </div>
                      <div className='flex align-items-center orange-txt py-10'><span>Voir tous les services</span><ChevronRight /></div>
                    </section>
                    <hr />
                    <div className='description-categorie'>

                      <div className="description-categorie-title">
                        <h2 className='mb-10' style={{ fontSize: '16px' }}>Bon à savoir</h2>
                      </div>

                      <div className="descirption-categorie-container">
                        <ul className='hotel-other-infos'>
                          <li className='hotel-category'>
                            <h3>Categorie</h3>
                            {
                              [...new Array(hotelDetails?.rating)].map((r, i) => <Star key={i} />)
                            }
                          </li>

                          <li className='hotel-style'>
                            <h4>Style d'hotel</h4>
                            <p>Vue sur la ville</p>
                            <p>Affaires</p>
                          </li>
                          <li className='hotel-langs'>
                            <h4>Langues parlées</h4>
                            <p>
                              {
                                hotelDetails?.languages.map((l, i) => l.language).join(',')
                              }
                            </p>
                          </li>
                          {
                            hotelDetails?.parking &&
                            <li className='hotel-parking'>
                              <h4>Parking</h4>
                              <ul>
                                <li><b>Emplacement:</b> {hotelDetails?.parking?.locationParking}</li>
                                <li><b>Type:</b> {hotelDetails?.parking?.parkingType}</li>
                              </ul>
                            </li>
                          }

                        </ul>

                      </div>

                    </div>

                  </div>

                </div>
                <div className="description-right">
                  <StickySideBar top={100}>
                    <aside className='hotel-aside'>
                      <h3 className='mb-10'>Réservez dès maintenant</h3>
                      <span className='txt-3'>À partir de</span>
                      <strong className='price'>100 000 MGA</strong>
                      <span className='txt-3'>par adulte</span>
                      <Link className='btn btn-purple block mt-10'>Réserver</Link>
                    </aside>
                  </StickySideBar>

                </div>
              </div>
            </div>

            <div className='connexion flex align-items-center justify-content-between p-15 gap-15'>
              <div className="connexion-svg flex-2 flex gap-10">
                <MdEditNotifications size={20} />
                <p>Inscrivez vous dès maintenant pour reserver un hébergement ou gérer votre hotel.</p>
              </div>
              <Link className='btn btn-purple' to='/inscription'>S'inscrire</Link>
            </div>

            <div className="description-search">

              <div className='description-search-title p-15'>
                <h4>Choisissez votre unité d'hebergement</h4>
              </div>

              <div className="search-container">

                <div className='search-container-item'>
                  <div className='search-left'>
                    <p><Calendar /></p>
                  </div>
                  <div className='search-right'>
                    <p>Arrive</p>
                    <p>22 Févr...</p>
                  </div>
                </div>

                <div className='search-container-item'>
                  <div className='search-left'>
                    <p><Calendar /></p>
                  </div>
                  <div className='search-right'>
                    <p>Départ</p>
                    <p>23 Févr...</p>
                  </div>
                </div>

                <div className='search-container-item-right'>
                  <div className='search-left'>
                    <p><Calendar /></p>

                  </div>
                  <div className='search-right'>
                    <p>Voyageurs</p>
                    <p>1 chambre, 2 pers</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="gride-card">
              <div className="gride-card-item ">
                <div className='caroseul relative'>
                  <div className='slider'>
                    <Slider {...{
                      arrows: false,
                      dots: false,
                      infinite: false,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    }}
                    >
                      <div>
                        <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/de/2c/6e/tamboho-suites.jpg?w=300&h=-1&s=1" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                    </Slider>
                  </div>

                  <div className="caroseul-titre flex">
                    <Camera2 /><span>4</span>
                  </div>

                </div>

                <div className='caroseul-content'>

                  <div className='caroseul-header'>

                    <div className="caroseul-title">
                      <h4>Nest Rom</h4>
                      <p>9,2/10 Superbe</p>
                    </div>

                    <div className="caroseul-body">

                      <ul>
                        <li>
                          <House />
                          <span> Vue sur la ville</span>
                        </li>

                        <li>
                          <People />
                          <span> 2 personne</span>
                        </li>

                        <li>
                          <GiBed />
                          <span>1 lit double</span>
                        </li>

                        <li>
                          <Wifi1 />
                          <span>Accèes Wi-Fi gratuis</span>
                        </li>

                        <li>
                          <CaretRight />
                          <span>14 m</span>
                        </li>
                      </ul>

                      <p>Plus de détails</p>
                    </div>

                  </div>

                  <div className="caroseul-body-2">

                    <div className='caroseul-body-title'>
                      <h4>Polique d'annulation</h4>
                      <p>Plus de détail sur toutles les options</p>
                    </div>

                    <div className='caroseul-content-2'>

                      <ul>
                        <li>
                          <input type="radio" />
                          <p>Non remboursable</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>Entièrement remboursable avant le 16 févr.</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>
                            Entièrement remboursable avant le 22 févr.</p>
                          <p>+18 $</p>
                        </li>
                      </ul>
                      <div className='button m-5'>
                        <button className='btn-outline-light'>Reserver</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="gride-card-item ">

                <div className='caroseul relative'>
                  <div className='slider'>
                    <Slider {...{
                      arrows: false,
                      dots: false,
                      infinite: false,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }}
                    >
                      <div>
                        <img src="/img/other/chambre_6.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                    </Slider>
                  </div>

                  <div className="caroseul-titre flex">
                    <Camera2 /><span>4</span>
                  </div>

                </div>

                <div className='caroseul-content'>

                  <div className='caroseul-header'>

                    <div className="caroseul-title">
                      <h4>Nest Rom</h4>
                      <p>9,2/10 Superbe</p>
                    </div>

                    <div className="caroseul-body">

                      <ul>
                        <li>
                          <House />
                          <span> Vue sur la ville</span>
                        </li>

                        <li>
                          <People />
                          <span> 2 personne</span>
                        </li>

                        <li>
                          <GiBed />
                          <span>1 lit double</span>
                        </li>

                        <li>
                          <Wifi1 />
                          <span>Accèes Wi-Fi gratuis</span>
                        </li>

                        <li>
                          <CaretRight />
                          <span>14 m</span>
                        </li>
                      </ul>

                      <p>Plus de détails</p>
                    </div>

                  </div>

                  <div className="caroseul-body-2">

                    <div className='caroseul-body-title'>
                      <h4>Polique d'annulation</h4>
                      <p>Plus de détail sur toutles les options</p>
                    </div>

                    <div className='caroseul-content-2'>

                      <ul>
                        <li>
                          <input type="radio" />
                          <p>Non remboursable</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>Entièrement remboursable avant le 16 févr.</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>
                            Entièrement remboursable avant le 22 févr.</p>
                          <p>+18 $</p>
                        </li>
                      </ul>
                      <div className='button m-5'>
                        <button className='btn-outline-light'>Reserver</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>              <div className="gride-card-item ">

                <div className='caroseul relative'>
                  <div className='slider'>
                    <Slider {...{
                      arrows: false,
                      dots: false,
                      infinite: false,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }}
                    >
                      <div>
                        <img src="/img/other/chambre_1.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                    </Slider>
                  </div>

                  <div className="caroseul-titre flex">
                    <Camera2 /><span>4</span>
                  </div>

                </div>

                <div className='caroseul-content'>

                  <div className='caroseul-header'>

                    <div className="caroseul-title">
                      <h4>Nest Rom</h4>
                      <p>9,2/10 Superbe</p>
                    </div>

                    <div className="caroseul-body">

                      <ul>
                        <li>
                          <House />
                          <span> Vue sur la ville</span>
                        </li>

                        <li>
                          <People />
                          <span> 2 personne</span>
                        </li>

                        <li>
                          <GiBed />
                          <span>1 lit double</span>
                        </li>

                        <li>
                          <Wifi1 />
                          <span>Accèes Wi-Fi gratuis</span>
                        </li>

                        <li>
                          <CaretRight />
                          <span>14 m</span>
                        </li>
                      </ul>

                      <p>Plus de détails</p>
                    </div>

                  </div>

                  <div className="caroseul-body-2">

                    <div className='caroseul-body-title'>
                      <h4>Polique d'annulation</h4>
                      <p>Plus de détail sur toutles les options</p>
                    </div>

                    <div className='caroseul-content-2'>

                      <ul>
                        <li>
                          <input type="radio" />
                          <p>Non remboursable</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>Entièrement remboursable avant le 16 févr.</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>
                            Entièrement remboursable avant le 22 févr.</p>
                          <p>+18 $</p>
                        </li>
                      </ul>
                      <div className='button m-5'>
                        <button className='btn-outline-light'>Reserver</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gride-card-item ">
                <div className='caroseul relative'>
                  <div className='slider'>
                    <Slider {...{
                      arrows: false,
                      dots: false,
                      infinite: false,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }}
                    >
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                    </Slider>
                  </div>
                  <div className="caroseul-titre flex">
                    <Camera2 /><span>4</span>
                  </div>
                </div>
                <div className='caroseul-content'>
                  <div className='caroseul-header'>
                    <div className="caroseul-title">
                      <h4>Nest Rom</h4>
                      <p>9,2/10 Superbe</p>
                    </div>
                    <div className="caroseul-body">
                      <ul>
                        <li>
                          <House />
                          <span> Vue sur la ville</span>
                        </li>
                        <li>
                          <People />
                          <span> 2 personne</span>
                        </li>
                        <li>
                          <GiBed />
                          <span>1 lit double</span>
                        </li>
                        <li>
                          <Wifi1 />
                          <span>Accèes Wi-Fi gratuis</span>
                        </li>
                        <li>
                          <CaretRight />
                          <span>14 m</span>
                        </li>
                      </ul>
                      <p>Plus de détails</p>
                    </div>
                  </div>
                  <div className="caroseul-body-2">
                    <div className='caroseul-body-title'>
                      <h4>Polique d'annulation</h4>
                      <p>Plus de détail sur toutles les options</p>
                    </div>
                    <div className='caroseul-content-2'>
                      <ul>
                        <li>
                          <input type="radio" />
                          <p>Non remboursable</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>Entièrement remboursable avant le 16 févr.</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>
                            Entièrement remboursable avant le 22 févr.</p>
                          <p>+18 $</p>
                        </li>
                      </ul>
                      <div className='button m-5'>
                        <button className='btn-outline-light'>Reserver</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gride-card-item ">
                <div className='caroseul relative'>
                  <div className='slider'>
                    <Slider {...{
                      arrows: false,
                      dots: false,
                      infinite: false,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }}
                    >
                      <div>
                        <img src="/img/other/chambre_2.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                      <div>
                        <img src="/img/other/chambre_7.jpg" alt="" />
                      </div>
                    </Slider>
                  </div>

                  <div className="caroseul-titre flex">
                    <Camera2 /><span>4</span>
                  </div>
                </div>
                <div className='caroseul-content'>
                  <div className='caroseul-header'>
                    <div className="caroseul-title">
                      <h4>Nest Rom</h4>
                      <p>9,2/10 Superbe</p>
                    </div>
                    <div className="caroseul-body">
                      <ul>
                        <li>
                          <House />
                          <span> Vue sur la ville</span>
                        </li>
                        <li>
                          <People />
                          <span> 2 personne</span>
                        </li>

                        <li>
                          <GiBed />
                          <span>1 lit double</span>
                        </li>

                        <li>
                          <Wifi1 />
                          <span>Accèes Wi-Fi gratuis</span>
                        </li>

                        <li>
                          <CaretRight />
                          <span>14 m</span>
                        </li>
                      </ul>

                      <p>Plus de détails</p>
                    </div>

                  </div>

                  <div className="caroseul-body-2">

                    <div className='caroseul-body-title'>
                      <h4>Polique d'annulation</h4>
                      <p>Plus de détail sur toutles les options</p>
                    </div>

                    <div className='caroseul-content-2'>

                      <ul>
                        <li>
                          <input type="radio" />
                          <p>Non remboursable</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>Entièrement remboursable avant le 16 févr.</p>
                          <p>+0 $</p>
                        </li>
                        <li>
                          <input type="radio" />
                          <p>
                            Entièrement remboursable avant le 22 févr.</p>
                          <p>+18 $</p>
                        </li>
                      </ul>
                      <div className='button m-5'>
                        <button className='btn-outline-light'>Reserver</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="other-card">
              <div className="title-other">
                <h4>Vous pourriez aussi aimer…</h4>
              </div>
              <div className="caroseul-slider">
                <Slider {...{
                  arrows: false,
                  dots: false,
                  infinite: false,
                  speed: 500,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
                }}>
                  {dataReservation.map((a, i) => (
                    <AttractionReservation data={a} key={i} />
                  ))}
                </Slider>
              </div>
            </div>

            <div className='postion-hotels'>

              <div className="position-title py-10">
                <h4>Emplacement</h4>
              </div>

              {
                hotelDetails?.position &&
                <div className="map-hotels">
                  <MapContainer center={[hotelDetails?.position.lat, hotelDetails?.position.lng]} zoom={7}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[hotelDetails?.position.lat, hotelDetails?.position.lng]}>
                    </Marker>
                  </MapContainer>
                </div>
              }

              <div className='hotels-description flex   p-10 gap-10'>
                <div className='hotels-item flex align-items-center gap-10  flex-1'>
                  <div className="hotels-note">
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>42</span>
                  </div>
                  <div className='hotels-item-content'>
                    <p style={{ fontWeight: 'bold' }}>Voiture recommander</p>
                    <p>Note : 42 sur 100</p>
                  </div>
                </div>

                <div className='hotels-item flex align-items-center gap-10 flex-1'>
                  <div className="hotels-note">
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>12</span>
                  </div>
                  <div className='hotels-item-content'>
                    <p style={{ fontWeight: 'bold' }}>restaurants</p>
                    <p>à 1 km</p>
                  </div>
                </div>

                <div className='hotels-item flex align-items-center gap-10 flex-1'>
                  <div className="hotels-note">
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>0</span>
                  </div>
                  <div className='hotels-item-content'>
                    <p style={{ fontWeight: 'bold' }}>Attraction</p>
                    <p>à 1 KM </p>
                  </div>
                </div>
              </div>

              <div className='hotels-content flex  gap-10 p-10'>
                <div className='hotels-content-item flex-1'>
                  <div className='position-hotels flex align-items-center gap-10 py-5'>
                    <div className='svg-hotels'><PostcardFill /></div>
                    <div className='hotels-title'>
                      <p>Zone Tana waterFront Ambodivona Antananarivo 101 Madagascar
                      </p>
                    </div>
                  </div>
                  <div className='acces py-5'>
                    <h4>Accès</h4>
                  </div>
                  <ul>
                    <li className='flex gap-10 align-items-center py-5'>
                      <div className='svg-item'><CarFront /></div>
                      <div className='text-item'><p>Antanananrivo Airport</p></div>
                    </li>
                    <li className='flex gap-10 align-items-center py-5'>
                      <div className='svg-item'><CarFront /></div>
                      <div className='text-item'><p>Voiture de location</p></div>
                    </li>

                  </ul>
                  <div className='footer'>
                    <p>Voir tous les hotels a proximité</p>
                  </div>
                </div>
                <div className='hotels-content-item flex-2'>
                  <div className='hotels-title'>
                    <h4>Restaurant proches</h4>
                  </div>
                  <div className='hotels-restaurant'>
                    <ul>
                      <li>
                        <p>Marais Resautaurant</p>
                        <div className='gems-restaurant flex align-items-center py-5 gap-5'>
                          <Rating
                            readonly
                            initialRating={3.5}
                            onChange={(value) => { }}
                            fractions={2}
                            emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                            fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                          />
                          <p>57 avis</p>
                        </div>
                      </li>
                      <li>
                        <p>Resto Gasy</p>
                        <div className='gems-restaurant flex align-items-center py-5 gap-5'>
                          <Rating
                            readonly
                            initialRating={3.5}
                            onChange={(value) => { }}
                            fractions={2}
                            emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                            fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                          />
                          <p>57 avis</p>
                        </div>
                      </li>
                      <li>
                        <p>Restaurant Le Complexe</p>
                        <div className='gems-restaurant flex align-items-center py-5 gap-5'>
                          <Rating
                            readonly
                            initialRating={3.5}
                            onChange={(value) => { }}
                            fractions={2}
                            emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                            fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                          />
                          <p>57 avis</p>
                        </div>
                      </li>
                      <li>
                        <p>Hotel Restaurant Tamboho</p>
                        <div className='gems-restaurant flex align-items-center py-5 gap-5'>
                          <Rating
                            readonly
                            initialRating={3.5}
                            onChange={(value) => { }}
                            fractions={2}
                            emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                            fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                          />
                          <p>57 avis</p>
                        </div>

                      </li>

                    </ul>
                    <div className='footer'>
                      <p>Voir tous les restaurants à proximité</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <div className="proche-card">
              <div className="other-card">
                <div className="title-other flex justify-content-between aligin-items-center">
                  <h4>Établissements les plus réservés à Antananarivo</h4>
                  <p style={{
                    cursor: 'pointer'
                  }}>Tout Afficher</p>
                </div>
                <div className="caroseul-slider">
                  <Slider {...{
                    arrows: false,
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 1,
                          infinite: false,
                          dots: false
                        }
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1,
                        }
                      },
                      {
                        breakpoint: 480,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1
                        }
                      }
                    ]
                  }}>
                    {procheData.map((a, i) => (
                      <AttractionReservation data={a} key={i} />
                    ))}
                  </Slider>
                </div>
              </div>
            </div>


            <div className="grid-avis-content">
              <h4 className='px-15 pb-5'>Avis utilisateur</h4>
              <div className='grid-avis'>
                {avisData.map((a, i) => (
                  <AvisCard data={a} key={i} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HotelsReservation