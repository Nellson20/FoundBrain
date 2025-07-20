import React from "react";
import "./City.scss";
import Slider from "react-slick";
import { MapContainer, TileLayer, UseMap, Marker, Popup } from "react-leaflet";
import {
  Alarm,
  CaretRight,
  Cloud,
  CloudSleet,
  Diamond,
  Facebook,
  Gem,
  GeoAltFill,
  Globe,
  Heart,
  Instagram,
  Phone,
  Search,
  Shop,
  Speaker,
  X,
  XLg,
  Linkedin,
} from "react-bootstrap-icons";
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "../../components/Arrows/Arrows";
import { useRef, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { ChevronRight, ChevronLeft, GeoAlt } from "react-bootstrap-icons";
import { AlertLink, CloseButton } from "react-bootstrap";
import { useEffect } from "react";
import Rating from "react-rating";
import StickySideBar from "./../../components/StickySideBar/StickySideBar";

const AttractionSlider = () => {
  const attractionSlider = useRef();
  return (
    <div className="relative">
      <CustomNextArrow
        onClick={() => {
          attractionSlider.current.slickNext();
        }}
      />
      <CustomPrevArrow
        onClick={() => {
          attractionSlider.current.slickPrev();
        }}
      />
      <Slider
        {...{}}
        className="active-attraction-slider"
        ref={attractionSlider}
      >
        <div className="active-attraction-slide relative">
          <img src="/img/other/plage_3.jpg" className="absolute" />
        </div>
        <div className="active-attraction-slide relative">
          <img src="/img/other/tamatave_4.jpg" className="absolute" />
        </div>
        <div className="active-attraction-slide relative">
          <img src="/img/other/madagascar.jpg" className="absolute" />
        </div>
      </Slider>
    </div>
  );
};

const attractionData = [
  {
    image: "/img/other/entreprise.jpg",
    name: "Visite d'entreprise",
  },
  {
    image: "/img/other/musee.jpg",
    name: "Historiques • monuments",
  },
  {
    image: "/img/other/galerie.jpg",
    name: "Galeries d'art",
  },
  {
    image: "/img/other/festival.jpg",
    name: "Événements • Festivals",
  },
  {
    image: "/img/other/maki.jpg",
    name: "Parcs • Espaces verts",
  },
  {
    image: "/img/other/culture.jpg",
    name: "Culture",
  },
  {
    image: "/img/other/cuisine.jpg",
    name: "Cuisine locale",
  },
  {
    image: "/img/other/kayak.jpg",
    name: "Plein air",
  },
  {
    image: "/img/other/shopping.jpg",
    name: "Shopping",
  },
  {
    image: "/img/other/sport.jpg",
    name: "Sport",
  },
  {
    image: "/img/other/spa.jpg",
    name: "Bien-être • Détente",
  },

]

const Attraction = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='divertissementModal relative' onClick={() => {
        setOpen(true)
      }}>
        <img className='image-hover-scale' src={data.image} alt="" />
        <div className='divertissementText'>
          <p className='line-clamp-2'>{data.name}</p>
        </div>
      </div>

      <Modal open={open} className="attraction-modal">
        <div className="top flex justify-content-between align-items-center relative">
          <div className="logo-gate">
            <img src="/img/logo/GATEAFR.png" alt="" />
          </div>
          <nav className="attraction-modal-nav flex align-items-center absolute">
            <ul className="flex align-item-center gap-20">
              <li className="active">Tout</li>
              <li>Entreprise</li>
              <li>Musées</li>
              <li>Historique</li>
              <li>Culture</li>
              <li>Chateau</li>
            </ul>
          </nav>
          <div className="close-modal" onClick={() => setOpen(false)}>
            <XLg size={20} />
          </div>
        </div>

        <div className="body flex">
          <div className="left p-10">
            <div>
              <img src="/img/other/antananarivo.jpg" alt="" />
              <div className="text-img">
                <span>Analakely</span>
              </div>
            </div>
            <div>
              <img src="/img/other/baobab.jpg" alt="" />
              <div className="text-img">
                <span>Tsimbazaza</span>
              </div>
            </div>

            <div>
              <img src="/img/other/madagascar_antananarivo.jpg" alt="" />
              <div className="text-img">
                <span>Rova Manjakamiadana</span>
              </div>
            </div>
            <div>
              <img src="/img/other/maki.jpg" alt="" />
              <div className="text-img">
                <span>Tsimbazaza</span>
              </div>
            </div>
            <div>
              <img src="/img/other/maki_2.png" alt="" />
              <div className="text-img">
                <span>Tsimbazaza</span>
              </div>
            </div>
            <div>
              <img src="/img/other/nosybe.jpg" alt="" />
              <div className="text-img">
                <span>Tsimbazaza</span>
              </div>
            </div>
          </div>
          <div className="center flex">
            <div className="center-left">
              <StickySideBar top={70}>
                <AttractionSlider />
              </StickySideBar>
            </div>
            <div className="center-right">
              <div className="top flex ">
                <div className="top-left">
                  <h1>Musée de la pirate de Madagascar</h1>
                  <p>Traivasion</p>
                </div>
                <div className="top-right">
                  <Gem />
                </div>
              </div>

              <div className="body">
                <section className="attraction-description">
                  <p>
                    Learn about pirates and their particular way of life at
                    Pirate Museum of Antananarivo. Read stories, view
                    photographs, and listen to the myths of these fearless
                    people that once ruled the area. Inspect the modest array of
                    artifacts showcasing the pirates' weapons, treasures, and
                    tools used during raids. A few ship models recreate their
                    vessels, giving a sense of how massive and powerful they
                    were.
                  </p>
                </section>
                <section className="attraction-info">
                  <ul>
                    <li className="flex align-items-center gap-15">
                      <GeoAlt />
                      <span>103, rue de Liège, Antananarivo</span>
                    </li>
                    <li className="flex align-items-center gap-15">
                      <Phone />
                      <span>+261 20 22 625 27</span>
                    </li>
                    <li className="flex align-items-center gap-15">
                      <Globe />
                      <span>www.test.com</span>
                    </li>
                    <li className="flex align-items-center gap-15">
                      <Alarm />
                      <span>
                        Horraire <b>Jeudi</b>
                      </span>
                      <span>8:00 AM - 15:00 PM</span>
                    </li>
                  </ul>
                </section>

                <section className="attraction-tabs">
                  <div className="top flex align-items-center">
                    <ul className="flex align-items-center gap-15">
                      <li>Avis/Commentaires</li>
                      <li>Articles</li>
                    </ul>
                  </div>

                  <div className="body py-15">
                    <div className="attraction-notice">
                      <div className="top">
                        <div className="note flex gap-15">
                          <h1>3.0</h1>
                          <div className="gems">
                            <Rating
                              readonly
                              initialRating={3.5}
                              onChange={(value) => {}}
                              fractions={2}
                              emptySymbol={
                                <img
                                  src="/img/icons/diamond_grey.png"
                                  className="icon rating-diamond-img"
                                />
                              }
                              fullSymbol={
                                <img
                                  src="/img/icons/diamond.png"
                                  className="icon rating-diamond-img"
                                />
                              }
                            />
                            <p>237 evaluations</p>
                          </div>
                        </div>

                        <div className="evaluation-cart">
                          <ul>
                            <li className="flex gap-10 align-items-center">
                              <span>5 étoile</span>
                              <div className="evaluation-progres">
                                <div></div>
                              </div>
                              <span>18%</span>
                            </li>

                            <li className="flex gap-10 align-items-center">
                              <span>5 étoile</span>
                              <div className="evaluation-progres">
                                <div></div>
                              </div>
                              <span>18%</span>
                            </li>

                            <li className="flex gap-10 align-items-center">
                              <span>5 étoile</span>
                              <div className="evaluation-progres">
                                <div></div>
                              </div>
                              <span>18%</span>
                            </li>

                            <li className="flex gap-10 align-items-center">
                              <span>5 étoile</span>
                              <div className="evaluation-progres">
                                <div></div>
                              </div>
                              <span>18%</span>
                            </li>

                            <li className="flex gap-10 align-items-center">
                              <span>5 étoile</span>
                              <div className="evaluation-progres">
                                <div></div>
                              </div>
                              <span>18%</span>
                            </li>
                          </ul>
                        </div>

                        <div className="article-cart py-10">
                          <h1>Gourmand2021bis</h1>
                          <div className="article-item flex align-items-center gap-15 py-10">
                            <Rating
                              readonly
                              initialRating={3.5}
                              onChange={(value) => {}}
                              fractions={2}
                              emptySymbol={
                                <img
                                  src="/img/icons/diamond_grey.png"
                                  className="icon rating-diamond-img"
                                />
                              }
                              fullSymbol={
                                <img
                                  src="/img/icons/diamond.png"
                                  className="icon rating-diamond-img"
                                />
                              }
                            />
                            <span>August 23, 2023</span>
                          </div>
                          <div className="description-article">
                            <p>
                              Immense parc floral au cœur de la ville, avec des
                              plantes magnifiques et c’est l’endroit dans lequel
                              les familles jouent et viennent pique-niquer ! Des
                              groupes d’amis viennent chanter et jouer de la
                              musique. Plus que le zoo, c’est la joie de vivre
                              au sein de ce parc qui est magnifique !
                            </p>
                            <span>Avis complet</span>
                          </div>
                        </div>

                        <div className="article-cart py-10">
                          <h1>nadlotus</h1>
                          <div className="article-item flex align-items-center gap-15 py-10">
                            <Rating
                              readonly
                              initialRating={3.5}
                              onChange={(value) => {}}
                              fractions={2}
                              emptySymbol={
                                <img
                                  src="/img/icons/diamond_grey.png"
                                  className="icon rating-diamond-img"
                                />
                              }
                              fullSymbol={
                                <img
                                  src="/img/icons/diamond.png"
                                  className="icon rating-diamond-img"
                                />
                              }
                            />
                            <span>August 23, 2023</span>
                          </div>
                          <div className="description-article">
                            <p>
                              ILe guide ne parlait pas bien le français et ne
                              donnait pas suffisamment d’explication durant
                              notre visite. L’éclairage dans le vivarium était
                              défectueux. Pensez à prendre un anti-moustique.
                              Cependant très intéressant avec une faune et une
                              flore diversifiées. Une très belle expérience qui
                              permet une immersion!
                            </p>
                            <span>Avis complet</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="right">
            <StickySideBar top={65}>
              <div className="attraction-location-map">
                <MapContainer
                  center={[51.505, -0.09]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[51.505, -0.09]}></Marker>
                </MapContainer>
              </div>
            </StickySideBar>
          </div>
        </div>
      </Modal>
    </>
  );
};

const City = () => {
  const citySlider = useRef();
  const setting = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div id="city-page">
      <div className="city-slider relative">
        <Slider arrows={false} fade={true}>
          <div className="city-slider-container">
            <img src="/img/other/antananarivo.jpg" alt="image" />

            <div className="city-slider-text">
              <h1>Antananarivo</h1>
              {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit rem earum nesciunt dolorem aperiam consequatur numquam amet quaerat modi nihil....</p> */}
            </div>
          </div>
          <div className="city-slider-container">
            <img src="/img/other/madagascar_antananarivo.jpg" alt="" />
            <div className="city-slider-text">
              <h1>Antananarivo</h1>
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis consequuntur harum a, ratione ut quisquam maxime maiores assumenda nemo. Tempore.....</p> */}
            </div>
          </div>

          <div className="city-slider-container">
            <img src="/img/other/paysage_4.jpg" alt="image" />
            <div className="city-slider-text">
              <h1>Antananarivo</h1>
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores omnis facere autem aperiam dolor eaque soluta repellat neque natus eos?....</p> */}
            </div>
          </div>
        </Slider>
      </div>

      <div className="city-content">
        <div className="description ">
          <div className="description-text">
            <h1>À propos de cet endroit</h1>
            <p>
              Antananarivo ou Tananarive dans sa version francisée est la
              capitale économique et politique de Madagascar, de la province
              d'Antananarivo et de la région Analamanga. Ses habitants
              s'appellent les Antananariviens, ou Tananariviens. Sa population
              dépasse 1,6 millions d'habitants, et son agglomération approche
              les 3,6 millions d'habitants. La ville est divisée en six
              arrondissements et 192 fokontanyz.
            </p>
          </div>
          <div className="description-map">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}></Marker>
            </MapContainer>
          </div>
        </div>

        <div className="center-container">
          <div className="inscription">
            <div className="inscription-image relative">
              <div className="image">
                <img src="/img/other/vacances.jpg" alt="" />
              </div>
              <div className="inscription">
                <h1>GateAfri</h1>
                <p>
                  Inscrivez vous dès maintenant pour explorer un continent,ville
                  pour savoir les cultures des pays
                </p>

                <button className="btn-outline-white">S'incrire</button>
              </div>
            </div>
          </div>

          <div className="divertissement">
            <h1>Divertissement</h1>
            <div className="slider-divertissement relative">
              <Slider
                {...{
                  arrows: false,
                  dots: false,
                  infinite: false,
                  speed: 500,
                  slidesToShow: 7,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                      },
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                      },
                    },
                  ],
                }}
                className="sliderCarousel"
              >
                {attractionData.map((a, i) => (
                  <Attraction data={a} key={i} />
                ))}
              </Slider>
            </div>
          </div>

          <div className="hotels">
            <div className="header-hotels">
              <h1>Hotels</h1>
              <p>Voir plus</p>
            </div>

            <div className="slider-hotels relative">
              <Slider
                {...{
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
                        dots: false,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      },
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                      },
                    },
                  ],
                }}
                className="hotelsModal"
              >
                <div className="hotelsItem">
                  <div className="img">
                    <img
                      className="image-hover-scale"
                      src="/img/other/chambre_7.jpg"
                      alt=""
                    />
                  </div>
                  <div className="hoteltext">
                    <ul>
                      <li className="header">
                        <p>8.8/10 Execption (avis)</p>
                        <p>Hotel Carlton</p>
                      </li>
                      <li className="body">
                        <p>Anosy</p>
                        <p>400 000 MGA</p>
                        <p>Par nuit</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="hotelsItem">
                  <div className="img">
                    <img
                      className="image-hover-scale"
                      src="/img/other/chambre_1.jpg"
                      alt=""
                    />
                  </div>

                  <div className="hoteltext">
                    <ul>
                      <li className="header">
                        <p>8.8/10 Execption (avis)</p>
                        <p>Hotel Carlton</p>
                      </li>

                      <li className="body">
                        <p>Anosy</p>
                        <p>400 000 MGA</p>
                        <p>Par nuit</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="hotelsItem">
                  <div className="img">
                    <img
                      className="image-hover-scale"
                      src="/img/other/chambre_2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="hoteltext">
                    <ul>
                      <li className="header">
                        <p>8.8/10 Execption (avis)</p>
                        <p>Hotel Carlton</p>
                      </li>

                      <li className="body">
                        <p>Anosy</p>
                        <p>400 000 MGA</p>
                        <p>Par nuit</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="hotelsItem">
                  <div className="img">
                    <img
                      className="image-hover-scale"
                      src="/img/other/chambre_3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="hoteltext">
                    <ul>
                      <li className="header">
                        <p>8.8/10 Execption (avis)</p>
                        <p>Hotel Carlton</p>
                      </li>

                      <li className="body">
                        <p>Anosy</p>
                        <p>400 000 MGA</p>
                        <p>Par nuit</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="hotelsItem">
                  <div className="img">
                    <img
                      className="image-hover-scale"
                      src="/img/other/chambre_4.jpg"
                      alt=""
                    />
                  </div>
                  <div className="hoteltext">
                    <ul>
                      <li className="header">
                        <p>8.8/10 Execption (avis)</p>
                        <p>Hotel Carlton</p>
                      </li>

                      <li className="body">
                        <p>Anosy</p>
                        <p>400 000 MGA</p>
                        <p>Par nuit</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="hotelsItem">
                  <div className="img">
                    <img
                      className="image-hover-scale"
                      src="/img/other/chambre_5.jpg"
                      alt=""
                    />
                  </div>
                  <div className="hoteltext">
                    <ul>
                      <li className="header">
                        <p>8.8/10 Execption (avis)</p>
                        <p>Hotel Carlton</p>
                      </li>

                      <li className="body">
                        <p>Anosy</p>
                        <p>400 000 MGA</p>
                        <p>Par nuit</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="hotelsItem">
                  <div className="img">
                    <img
                      className="image-hover-scale"
                      src="/img/other/chambre_6.jpg"
                      alt=""
                    />
                  </div>
                  <div className="hoteltext">
                    <ul>
                      <li className="header">
                        <p>8.8/10 Execption (avis)</p>
                        <p>Hotel Carlton</p>
                      </li>

                      <li className="body">
                        <p>Anosy</p>
                        <p>
                          <b>400 000 MGA</b>
                        </p>
                        <p>Par nuit</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Slider>
            </div>
          </div>

          <div className="destination">
            <h1>Destination populaire et en vogue</h1>
            <div className="destination-caroseul relative">
              <Slider
                {...{
                  arrows: false,
                  dots: false,
                  infinite: false,
                  speed: 500,
                  slidesToShow: 5,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                      },
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      },
                    },
                  ],
                }}
                className="modalCaroseul"
              >
                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      className="image-hover-scale"
                      src="/img/other/market_analakely.jpg"
                      alt=""
                    />
                  </div>
                  <div className="destination-caroseul-text">
                    <p>Analakely</p>
                    <p>Tsena Analakely</p>
                  </div>
                </div>

                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      src="/img/other/hakanto.jpg"
                      className="image-hover-scale"
                      alt=""
                    />
                  </div>

                  <div className="destination-caroseul-text">
                    <p>Ankadibaoka</p>
                    <p>Hakanto</p>
                  </div>
                </div>

                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      src="/img/other/maki_2.png"
                      className="image-hover-scale"
                      alt=""
                    />
                  </div>

                  <div className="destination-caroseul-text">
                    <p>Parc national</p>
                    <p>Tsimbazaza</p>
                  </div>
                </div>

                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      src="/img/other/rovamanjakamiadana.jpg"
                      className="image-hover-scale"
                      alt=""
                    />
                  </div>

                  <div className="destination-caroseul-text">
                    <p>Andohalo</p>
                    <p>Rova Manjakamiadana</p>
                  </div>
                </div>

                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      src="/img/other/lac.jpg"
                      className="image-hover-scale"
                      alt=""
                    />
                  </div>
                  <div className="destination-caroseul-text">
                    <p>Itasy</p>
                    <p>Mantasoa</p>
                  </div>
                </div>

                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      src="/img/other/antananarivo.jpg"
                      className="image-hover-scale"
                      alt=""
                    />
                  </div>
                  <div className="destination-caroseul-text">
                    <p>Antaninarenina</p>
                    <p>Antanananarivo</p>
                  </div>
                </div>

                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      src="/img/other/plage.jpg"
                      className="image-hover-scale"
                      alt=""
                    />
                  </div>
                  <div className="destination-caroseul-text">
                    <p>Parc national</p>
                    <p>Tsimbazaza</p>
                  </div>
                </div>

                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      src="/img/other/plage.jpg"
                      className="image-hover-scale"
                      alt=""
                    />
                  </div>
                  <div className="destination-caroseul-text">
                    <p>Parc national</p>
                    <p>Tsimbazaza</p>
                  </div>
                </div>

                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      src="/img/other/plage.jpg"
                      className="image-hover-scale"
                      alt=""
                    />
                  </div>
                  <div className="destination-caroseul-text">
                    <p>Parc national</p>
                    <p>Tsimbazaza</p>
                  </div>
                </div>

                <div className="destination-caroseul-item">
                  <div className="img">
                    <img
                      src="/img/other/plage.jpg"
                      className="image-hover-scale"
                      alt=""
                    />
                  </div>
                  <div className="destination-caroseul-text">
                    <p>Parc national</p>
                    <p>Tsimbazaza</p>
                  </div>
                </div>
              </Slider>
            </div>
          </div>

          <div className="suggest">
            <div className="suggest-header">
              <div className="suggest-logo">
                <img src="/img/other/hotelLogo.jpg" alt="" />
              </div>
              <div className="suggest-title">
                <h1>Découvrée Hotel Tsingy</h1>
                <p>Découvre Hotel tsingy situe aux centre de la capital</p>
              </div>
            </div>
            <div className="suggest-image">
              <div className="item-image relative">
                <img
                  src="/img/other/morondava.jpg"
                  className="image-hover-scale"
                  alt=""
                />
                <div className="item-image-text">
                  <span>Piscine</span>
                </div>
              </div>

              <div className="item-image relative">
                <img
                  src="/img/other/chambre_1.jpg"
                  className="image-hover-scale"
                  alt=""
                />
                <div className="item-image-text">
                  <span>Chambre</span>
                </div>
              </div>

              <div className="item-image relative">
                <img
                  src="/img/other/fianarantsoa.jpg"
                  className="image-hover-scale"
                  alt=""
                />
                <div className="item-image-text">
                  <span>Hotel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div>
            <div className="logo-header">
              <img src="/img/logo/GATEAFR.png" alt="" />
            </div>

            <div className="footer-body">
              <div className="footer-content">
                <h4 className="py-5">
                  <b>Autres produits GateAfri</b>
                </h4>

                <ul className="flex gap-10">
                  <li>
                    <img src="/img/logo/gateNews.png" alt="" height={30} />
                  </li>
                  <li>
                    <img src="/img/logo/afrimuzlogo.png" alt="" height={30} />
                  </li>
                </ul>
              </div>

              <div className="footer-content">
                <h4 className="py-5">
                  <b>Destination</b>
                </h4>

                <ul>
                  <li>Cape Town : notre choix d’hôtels</li>
                  <li>Le Caire : notre choix d’hôtels</li>
                  <li>Le Cap : notre choix d’hôtels</li>
                  <li>Dakar : notre choix d’hôtels</li>
                  <li>Tunis : notre choix d’hôtels</li>
                  <li>Nairobi : notre choix d’hôtels</li>
                  <li>Dar es Salaam : notre choix d’hôtels</li>
                  <li>Antananarivo : notre choix d’hôtels</li>
                  <li>Accra : notre choix d’hôtels</li>
                  <li>Lagos : notre choix d’hôtels</li>
                  <li>Gaborone : notre choix d’hôtels</li>
                </ul>
              </div>

              <div className="footer-content">
                <h4 className="py-5">
                  <b>Pays et régions principaux</b>
                </h4>

                <ul>
                  <li>Afrique du Sud : notre choix d’hôtels</li>
                  <li>Maroc : notre choix d’hôtels</li>
                  <li>Égypte : notre choix d’hôtels</li>
                  <li>Île Maurice : notre choix d’hôtels</li>
                  <li>Sénégal : notre choix d’hôtels</li>
                  <li>Tunisie : notre choix d’hôtels</li>
                  <li>Kenya : notre choix d’hôtels</li>
                  <li>Tanzanie : notre choix d’hôtels</li>
                  <li>Madagascar : notre choix d’hôtels</li>
                  <li>Ghana : notre choix d’hôtels</li>
                  <li>Nigeria : notre choix d’hôtels</li>
                  <li>Botswana : notre choix d’hôtels</li>
                </ul>
              </div>

              <div className="footer-content">
                <h4 className="py-5">
                  <b>Politique de confidentialité</b>
                </h4>

                <ul>
                  <li>Conditions générales d'utilisation</li>
                  <li>Politique de remboursement</li>
                  <li>Politique de cookies</li>
                  <li>Politique de sécurité des données</li>
                </ul>
              </div>

              <div className='footer-content'>
                <h4 className='py-5'><b>Autres informations</b></h4>
                <ul>
                  <li>Qui sommes-nous ?</li>
                  <li>Emplois</li>
                  <li>Guides de voyage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default City;
