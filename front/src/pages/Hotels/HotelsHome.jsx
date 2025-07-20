import React from 'react'
import './HotelsHome.scss'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, People, Search } from 'react-bootstrap-icons'
import Slider from 'react-slick'
import Logo from '../../components/Logo/Logo'


const HotelsHome = () => {
    return (
        <div id='hotels-home'>

            <div id='top-banner' className="relative" style={{ background: 'url(/img/other/hotelbanner.jpg)' }}></div>
            <div className="page-content">
                <form className="hotel-searchbar flex">
                    <div className="keyword-inpt flex-grow-1">
                        <input type="text" placeholder='Rechercher un hotel ou une destination' />
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
                <section className="top-destinations-hotels">
                    <div className="top flex align-items-center justify-content-between">
                        <div className="lef">
                            <h1>Pour vous</h1>
                            <p>Trouver un plan d'hébergement pour les déstinations les plus populaires en Afrique</p>
                        </div>
                        <div className="right flex gap-5">
                            <div className="prev-slide">
                                <ChevronLeft />
                            </div>
                            <div className="next-slide">
                                <ChevronRight />
                            </div>
                        </div>
                    </div>
                    <Slider {
                        ...{
                            slidesToShow: 5,
                            slidesToScroll: 1,
                            responsive: [
                                {
                                  breakpoint: 1024,
                                  settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1
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
                                    slidesToShow: 2,
                                    slidesToScroll: 1
                                  }
                                }
                              ]
                        }
                    } className='top-destinations-hotels-slider'>
                        <div className="item relative">
                            <img src="/img/other/tana1.jpg" alt="" />
                            <div className="capt">
                                <h1>Antananarivo &#8226; Madagascar</h1>
                                <p>A partir de 100k MGA</p>
                            </div>
                        </div>
                        <div className="item relative">
                            <img src="/img/other/portlouis.jpg" alt="" />
                            <div className="capt">
                                <h1>Port Louis &#8226; Île Maurice</h1>
                                <p>A partir de 1M MGA</p>
                            </div>
                        </div>
                        <div className="item relative">
                            <img src="/img/other/egypt.jpg" alt="" />
                            <div className="capt">
                                <h1>Le caire &#8226; Egypte</h1>
                                <p>A partir de 100k MGA</p>
                            </div>
                        </div>
                        <div className="item relative">
                            <img src="/img/other/casablanca.jpg" alt="" />
                            <div className="capt">
                                <h1>Casablanca &#8226; Maroc</h1>
                                <p>A partir de 100k MGA</p>
                            </div>
                        </div>
                        <div className="item relative">
                            <img src="/img/other/accra.jpg" alt="" />
                            <div className="capt">
                                <h1>Accra &#8226; Ghana</h1>
                                <p>A partir de 100k MGA</p>
                            </div>
                        </div>
                    </Slider>
                </section>
                <section className='utils flex gap-15'>
                    <div className="business" style={{ background: 'url(/img/other/building.jpg)' }}>
                        <h3>Affaires</h3>
                        <p>Trouvez vos hotels dans les zones où il y a le plus d'oportunités d'affaire</p>
                        <button className="white-btn">Aller voir</button>
                    </div>
                    <div className="patrol">
                        <div className="flex gap-10">
                            <div>
                                <h3>Zones pétrolières</h3>
                                <p>Explorer les pays qui produisent le plus de pétrole en Afrique</p>
                            </div>
                            <img src="/img/other/petrole.jpg" alt="" />
                        </div>
                        <button className="btn btn-purple"><Search /></button>
                    </div>
                    <div className="register flex align-items-center">
                        <span>Inscrivez vous dès maintenant pour explorer un continent à fort potentiel</span>
                        <button className="btn-outilne-white">S'inscrire</button>
                    </div>
                </section>
                <section className="travel-packs-slider">
                    <div>
                        <div className="top flex align-items-center justify-content-between">
                            <div>
                                <h1>Packs</h1>
                                <p>Trovez facilement des pack tout en un pour un sejour complet et sans souci(hebergement, transport, excursion, etc.)</p>
                            </div>
                        </div>
                        <div className="travel-pack mt-15 flex gap-15">
                            <div className="left">
                                <div className="img relative">
                                    <img src="/img/other/dubai1.jpg" alt="" />
                                </div>
                                <div className="capt">
                                    <h2>Passez 4 nuits et 5 jours à Dubai</h2>
                                    <b>L'offre inclus :</b>
                                    <ul>
                                        <li>2 billets d'avions</li>
                                        <li>Hotel 4 étoiles</li>
                                        <li>Petits déjeuner</li>
                                        <li>Diners</li>
                                        <li>Assistance 24/7</li>
                                    </ul>
                                    <div className="flex">
                                        <button className="btn btn-orange">À partir de 8 000 000 MGA</button>
                                    </div>

                                </div>
                            </div>
                            <div className="right">
                                <div>
                                    <div className="img relative">
                                        <img src="/img/other/hoteldubai.jpg" alt="" />
                                    </div>
                                    <div className="capt">
                                        <h3>Hotel Sahara</h3>
                                        <p>L'hotel Sahara est très réputé dans la ville de Dubai</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="img relative">
                                        <img src="/img/other/visite.jpg" alt="" />
                                    </div>
                                    <div className="capt">
                                        <h3>Visite guidée de la ville de Dubai</h3>
                                        <p>Decouvrer la ville de Dubai dans toute sa splendeur en compagnie de nos guides très sociable et expérimentés</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="img relative">
                                        <img src="/img/other/safari.jpg" alt="" />
                                    </div>
                                    <div className="capt">
                                        <h3>Safari dans le désert</h3>
                                        <p>Ressenter la libreté en contemplant l'horison dans le vaste désert de Dubai</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="img relative">
                                        <img src="/img/other/diner.jpg" alt="" />
                                    </div>
                                    <div className="capt">
                                        <h3>Diner en croisière</h3>
                                        <p>Prener votre repas dans un endroit avec une vue de nuit magnifique</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="entreprises-visit-slider">
                    <div className="top flex justify-content-between">
                        <div>
                            <h3>Visite d'entreprise</h3>
                            <p>Trouvez plutôt vos hotels en fonction des entreprise qui vous intéressent et que vous aimeriez visiter</p>
                        </div>
                    </div>
                    <Slider {...{
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: false,
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
                                slidesToScroll: 1,
                              }
                            }
                          ]
                    }}>
                        <div className="entreprises-visit-slider-item">
                            <div className="cover">

                            </div>
                            <div className="capt">
                                <Logo width={35} height={35}/>
                                <h3>Gate Company intl</h3>
                                <p className='line-clamp-2'>Partez à la découverte d'une entreprises très prometteur et exerçant dans divers domaines et métiers d'avenir</p>
                            </div>
                        </div>
                        
                        <div className="entreprises-visit-slider-item">
                            <div className="cover">

                            </div>
                            <div className="capt">
                                <Logo width={35} height={35}/>
                                <h3>Gate Company intl</h3>
                                <p className='line-clamp-2'>Partez à la découverte d'une entreprises très prometteur et exerçant dans divers domaines et métiers d'avenir</p>
                            </div>
                        </div>
                        <div className="entreprises-visit-slider-item">
                            <div className="cover">

                            </div>
                            <div className="capt">
                                <Logo width={35} height={35}/>
                                <h3>Gate Company intl</h3>
                                <p className='line-clamp-2'>Partez à la découverte d'une entreprises très prometteur et exerçant dans divers domaines et métiers d'avenir</p>
                            </div>
                        </div>
                    </Slider>
                </section>
                <section className="beach-slider">
                    <h3>Plages populaires</h3>
                    <Slider {...{
                        slidesToScroll: 1,
                        slidesToShow: 8,
                        infinite: false,
                        arrows: false,
                        responsive: [
                            {
                              breakpoint: 1024,
                              settings: {
                                slidesToShow: 6,
                                slidesToScroll: 1
                              }
                            },
                            {
                              breakpoint: 600,
                              settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1
                              }
                            },
                            {
                              breakpoint: 480,
                              settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                              }
                            }
                          ]
                    }}>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/morondava.jpg" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Nosy Kely</h3>
                                <p>Morondava</p>
                            </div>
                        </div>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/dubaibeach.jpg" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Dubai beach</h3>
                                <p>Dubai</p>
                            </div>
                        </div>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/dianibeach.jpg" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Diani</h3>
                                <p>Kenya</p>
                            </div>
                        </div>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/mauricebeach.jpg" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Belle Mare</h3>
                                <p>Île Maurice</p>
                            </div>
                        </div>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/malawibeach.avif" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Cape Maclear</h3>
                                <p>Malawi</p>
                            </div>
                        </div>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/sierabeach.jpg" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Banana Island</h3>
                                <p>Sierra Leone</p>
                            </div>
                        </div>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/kenyabeach.jpg" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Lamu</h3>
                                <p>Kenya</p>
                            </div>
                        </div>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/seychellesbeach.jpg" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Anse Lazio</h3>
                                <p>Seychelles</p>
                            </div>
                        </div>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/morondava.jpg" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Nosy Kely</h3>
                                <p>Morondava</p>
                            </div>
                        </div>
                        <div className="beach-slider-item">
                            <div className="img">
                                <img src="/img/other/morondava.jpg" alt="" />
                            </div>
                            <div className="capt">
                                <h3>Nosy Kely</h3>
                                <p>Morondava</p>
                            </div>
                        </div>
                    </Slider>
                </section>
            </div>

        </div>
    )
}

export default HotelsHome
