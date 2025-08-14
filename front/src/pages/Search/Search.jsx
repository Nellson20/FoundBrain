import React, { useEffect, useState } from "react";
import "./Search.scss";
import Avatar from "../../components/Avatar/Avatar";
import StickySideBar from "../../components/StickySideBar/StickySideBar";
import {
  ArrowRight,
  ArrowRightShort,
  Award,
  CupHot,
  GeoAlt,
  Water,
  Wifi,
} from "react-bootstrap-icons";
import { useQuery } from "@tanstack/react-query";
import { getInvests } from "../../api/invest";
import Slider from "react-slick";
import GoodDealCard from "../../components/GoodDealCard/GoodDealCard";
import { useSearchParams } from "react-router-dom";
import { getCompanies } from "../../api/company";
import { Link } from "react-router-dom";
import FundingCard from "../../components/FundingCard/FundingCard";
import { getPosts } from "../../api/post";
import PortalsListSkeleton from "./PortalsListSkeleton";
import InvestListSkeleton from "./InvestListSkeleton";
import { Parser } from "html-to-react";
import PostsListSkeleton from "./PostsListSkeleton";
import PostCard from "../../components/PostCard/PostCard";
import ArtistsListSkeleton from "./ArtistsListSkeleton";
import MusiquesListSkeleton from "./MusiquesListSkeleton";
import VideoCard from "../../components/VideoCard/VideoCard";
import Rating from "react-rating";
import { getUsers } from "../../api/users";
import { useTranslation } from 'react-i18next'

const Search = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams();
  const htmlToJsx = new Parser();
  const [filters, setFilters] = useState({
    companies: {
      name: null,
      description: null,
    },
    invests: {
      "company.name": null,
    },
    posts: {
      "orAuthorProperties[company.name]": null,
      "orAuthorProperties[company.description]": null,
      "orAuthorProperties[user.firstName]": null,
      "orAuthorProperties[user.lastName]": null,
    },
  });

  useEffect(() => {
    let k = searchParams.get("k");
    setFilters({
      companies: {
        name: k,
      },
      invests: {
        "company.name": k,
      },
      posts: {
        "or[content]": k
      },
      users: {
        "or[firstName]": k,
        "or[lastName]": k
      }
    });
  }, [searchParams.get("k")]);

  function objToQueryString(obj, parentKey = null) {
    let queryString = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        let encodedKey = parentKey
          ? `${parentKey}.${encodeURIComponent(key)}`
          : encodeURIComponent(key);

        if (typeof value === "object" && value !== null) {
          // If the value is an object or array, recursively convert it
          queryString.push(objToQueryString(value, encodedKey));
        } else if (value !== undefined) {
          // If the value is not undefined, add it to the query string
          queryString.push(`${encodedKey}=${encodeURIComponent(value)}`);
        }
      }
    }

    return queryString.join("&");
  }

  //searchPortals
  const {
    isLoading: portalsLoading,
    error: portalsError,
    data: portals,
  } = useQuery({
    queryKey: ["repoCompanies", filters.companies],
    queryFn: () =>
      getCompanies({ filters: objToQueryString(filters.companies) })
  });

  //searchInvests
  const {
    isLoading: investsLoading,
    error: getInvestError,
    data: invests,
  } = useQuery({
    queryKey: ["repoInvests", filters.invests],
    queryFn: () =>
      getInvests({ filters: objToQueryString(filters.invests) })
  });

  //searchUsers
  const {
    isLoading: usersLoading,
    error: usersError,
    data: users,
  } = useQuery({
    queryKey: ["repoUsers", filters.users],
    queryFn: () =>
      getUsers({ filters: objToQueryString(filters.users) })
  });

  const {
    isLoading: postsLoading,
    error: postsError,
    data: posts,
  } = useQuery({
    queryKey: ["repoSearchPosts", filters.posts],
    queryFn: () =>
      getPosts({ filters: decodeURI(objToQueryString(filters.posts)) })
  });

  useEffect(() => {
    console.log(posts, "pOSTSsearch");
  }, [posts]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    variableWidth: true,
    arrows: false,
  };
  const videosData = [
    {
      img: "/img/video/smaven.PNG",
      title: "SMAVEN - Mahery aligny",
      duration: "03:40",
      user: {
        name: "Hira Gasy",
      },
    },
    {
      img: "/img/video/ckicky.PNG",
      title: "CKICKY - Tsy ahefa",
      duration: "04:00",
      user: {
        name: "Gasitera",
      },
    },
    {
      img: "/img/video/rimka.PNG",
      title: "RIM KA - Lasako",
      duration: "04:20",
      user: {
        name: "DagoZik",
      },
    },
    {
      img: "/img/video/lion.PNG",
      title: "LION HILL - Atovo tonga agny",
      duration: "03:10",
      user: {
        name: "DagoZik",
      },
    },
    {
      img: "/img/video/tsota.PNG",
      title: "TSOTA - Adolatsento",
      duration: "04:20",
      user: {
        name: "DagoZik",
      },
    },
  ];
  const attractionsData = [
    {
      URLImage: "/img/other/rovamanjakamiadana.jpg",
      name: "Rova Manjakamiadana blabalblablalalablbl",
      location: "Antananarivo",
      nbVote: 58,
      type: "Monument",
    },
    {
      URLImage: "/img/other/baobab.webp",
      name: "Allée des Baobab",
      location: "Morondava",
      nbVote: 512,
      type: "Parc",
    },
    {
      URLImage: "/img/other/festival.jpg",
      name: "Tomorrowland",
      location: "Kenya",
      nbVote: 1903,
      type: "Festival",
    },
    {
      URLImage: "/img/other/galerie.jpg",
      name: "Is'Art Galerie",
      location: "Botswana",
      nbVote: 23,
      type: "Galerie d'art",
    },
    {
      URLImage: "/img/other/kayak.jpg",
      name: "Kayak Africa",
      location: "Island",
      nbVote: 695,
      type: "Plei air",
    },
    {
      URLImage: "/img/other/market_analakely.jpg",
      name: "Analakely Market",
      location: "Antanarivo",
      nbVote: 489,
      type: "Marché",
    },
    {
      URLImage: "/img/other/sport.jpg",
      name: "Foot Salle",
      location: "Antananarivo",
      nbVote: 489,
      type: "Sport",
    },
  ];
  return (
    <div id="search-page">
      <div className="left">
        <StickySideBar top={63}>
          <div className="search-nav">
            <h2>{t('100 Resultats pour "{{search}}"', { search: searchParams.get("k") })}</h2>
              <ul>
                <li>
                  <Link className="active">{t("Entreprises")}</Link>
                </li>
                <li>
                  <Link>{t("Investissements")}</Link>
                </li>
                <li>
                  <Link>{t("Personnes")}</Link>
                </li>
                <li>
                  <Link>{t("Actualités")}</Link>
                </li>
                <li>
                  <Link>{t("Artistes")}</Link>
                </li>
                <li>
                  <Link>{t("Musiques")}</Link>
                </li>
                <li>
                  <Link>{t("Hôtels")}</Link>
                </li>
                <li>
                  <Link>{t("Attractions")}</Link>
                </li>
              </ul>
          </div>
        </StickySideBar>
      </div>
      <div className="center">
    {
      (!portalsLoading && portals.length > 0) &&
      <div className="portals-results">
        {portalsLoading ? (
          <PortalsListSkeleton />
        ) : (
          <>
            <div className="top">
              <h2>{t("Entreprises")}</h2>
            </div>
            <ul className="body">
              {portals &&
                portals.map((p, i) => (
                  <li key={i} className="flex">
                    <div className="left">
                      <Avatar
                        src={p.activeLogo?.fileUrl}
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="center">
                      <h1 className="portal-name">
                        <Link to={`/portail/${p.id}`}>{p.name}</Link>
                      </h1>
                      <span className="portal-domains">
                        {p.domains.map((d) => d.title).join(",")}
                      </span>
                      <small>{htmlToJsx.parse(p.description)}</small>
                    </div>
                    <div className="right flex gap-10">
                      <button className="btn-purple">{t("Contacter")}</button>
                    </div>
                  </li>
                ))}
            </ul>
            <div className="footer">
              <button className="btn btn-transparent">{t("Voir plus")}</button>
            </div>
          </>
        )}
      </div>        
      }


        {
          (users && users?.length > 0) &&
          (
            <div className="persons-results ">
              <div className="top">
                <h2>{t("Personnes")}</h2>
              </div>
              <div className="persons-results-list flex flex-column">
                {
                  users?.map((u, i) => (
                    <Link key={i} to={`/profil/${u.id}`} className="person flex justify-content-between align-items-center ">
                      <div className="flex align-items-center gap-10">
                        <Avatar src={u.activeProfilePicture?.fileUrl} width={45} height={45} />
                        <div className="info flex flex-column gap-5">
                          <h3>{u.firstName} {u.lastName}</h3>
                          {
                            u.job &&
                            <p>{u.job}</p>
                          }
                        </div>
                      </div>
                      <div className="right flex gap-10">
                        <buttton className="btn-purple">{t("Contacter")}</buttton>
                        <buttton className="btn-outline-yellow">{t("Recruter")}</buttton>
                      </div>
                    </Link>
                  ))
                }


              </div>
            </div>
          )
        }

        {investsLoading ? (
          <InvestListSkeleton />
        ) : (
         invests.length > 0 && (
          <div className="invests-results">
            <div className="top">
              <h2>{t("Investissements")}</h2>
            </div>

            {invests?.reverse().map((d, i) => (
              <FundingCard key={i} data={d} />
            ))}
            <div className="bottom">
              <b>
                {t('Voir plus d\'investissements liés à "{searchParams.get(\\"k\\")}"')}
              </b>
              <div className="arrow">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
          )
        )}
        {postsLoading ? (
          <PostsListSkeleton />
        ) : posts?.length > 0 && (
          <div className="actualites-results">
            <>
              <div className="top flex align-items-center">
                <h2>{t("Actualités")}</h2>
              </div>
              <div className="posts-results-list flex flex-column gap-10">
                {posts?.map((p, i) => (
                  <PostCard key={i} data={p} onDelete={() => { }} />
                ))}
              </div>
              <div className="footer flex align-items-center justify-content-center">
                <Link className="flex align-items-center gap-5 purple-txt">
                  <span>{t("Voir plus")}</span>
                  <ArrowRightShort size={28} />
                </Link>
              </div>
            </>
          </div>
        )}

        <div className="artists-results">
          <div className="top">
            <h2>{t("Artistes")}</h2>
          </div>
          <div className="artists-results-slider">
            <Slider {...settings}>
              <div className="artists-results-slide relative">
                <div className="flag-avatar">
                  <Avatar width={100} height={100} src="/img/artists/5.png" />
                  <img src="/img/flags/Flag_of_Madagascar.svg" />
                </div>
                <h1>Rema</h1>
              </div>
              <div className="artists-results-slide relative">
                <div className="flag-avatar">
                  <Avatar width={100} height={100} src="/img/artists/3.png" />
                  <img src="/img/flags/Flag_of_Madagascar.svg" />
                </div>
                <h1>Smaven</h1>
              </div>
              <div className="artists-results-slide relative">
                <div className="flag-avatar">
                  <Avatar width={100} height={100} src="/img/artists/2.png" />
                  <img src="/img/flags/Flag_of_Madagascar.svg" />
                </div>
                <h1>Rim Ka</h1>
              </div>
              <div className="artists-results-slide relative">
                <div className="flag-avatar">
                  <Avatar width={100} height={100} src="/img/artists/1.png" />
                  <img src="/img/flags/Flag_of_Madagascar.svg" />
                </div>
                <h1>Rema-En live</h1>
              </div>
            </Slider>
          </div>
          <div className="footer">
            <button className="btn btn-transparent">{t("Voir plus")}</button>
          </div>
        </div>

        <div className="musiques-results">
          <div className="top">
            <h2>{t("Musiques")}</h2>
          </div>
          <div className="musiques-results-list flex flex-column gap-15">
            {videosData.map((videoData, i) => (
              <div key={i} className="musique">
                <div className="video flex gap-10">
                  <div className="poster relative">
                    <img
                      src={videoData?.img}
                      alt=""
                      style={{ width: "100%", height: "100%", borderRadius: 5 }}
                    />
                    <div className="length">{videoData?.duration}</div>
                  </div>
                  <div className="capt">
                    <h1 className="text-ellipsis">
                      <Link to="/video/play">{videoData.title}</Link>
                    </h1>
                    <small>
                      <span>200k vues</span> | <span>il y a 3 mois</span>
                    </small>
                    <Link
                      to="/profil"
                      className="artist-info flex align-items-center gap-10 "
                    >
                      <Avatar />
                      <div className="artist-name">{videoData?.user?.name}</div>
                    </Link>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Aliquam, libero aperiam deleniti neque, minus sint
                      temporibus, ad soluta magnam inventore dolore ex rerum cum
                      numquam? Inventore consectetur ullam eius culpa!
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="footer">
            <button className="btn btn-transparent">Voir plus</button>
          </div>
        </div>

        <div className="hotels-results">
          <div className="top">
            <h2>Hôtels</h2>
          </div>
          <div className="hotels-results-list flex flex-column gap-10">
            <div className="hotel flex">
              <div className="hotel-image">
                <Slider
                  {...{
                    dots: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    arrows: false,
                    autoplaySpeed: 5000,
                  }}
                >
                  <img src="/img/other/chambre_2.jpg" alt="" />
                  <img src="/img/other/chambre_luxe_2.jpg" alt="" />
                  <img src="/img/other/restaurant.jpg" alt="" />
                </Slider>
              </div>
              <div className="hotel-detail flex flex-column justify-content-between">
                <div className="top">
                  <span>Hôte professionnel</span>
                  <h3>Le Grand Mellis Hôtel & Spa</h3>
                  <span className="flex align-items-center gap-5">
                    <GeoAlt /> Antananarivo
                  </span>
                  <div className="flex">
                    <div className="flex gap-15">
                      <small className="flex align-items-center gap-5 py-5">
                        <CupHot />
                        Petit déjeuner
                      </small>
                      <small className="flex align-items-center gap-5">
                        <Wifi />
                        Wi-Fi inclus
                      </small>
                      <small className="flex align-items-center gap-5">
                        <Water />
                        Piscine
                      </small>
                    </div>
                  </div>
                </div>
                <div className="bottom flex justify-content-between align-items-end">
                  <div className="left ">
                    <div className="cumule flex align-items-center gap-5">
                      <Award size={18} className="icon" />
                      <p>Cumulez des vignettes</p>
                    </div>
                    <div className="avis flex align-items-center gap-5">
                      <div className="note">5.6</div>7 avis
                    </div>
                  </div>
                  <div className="right flex align-items-end flex-column">
                    {/* <div className="reduction"> */}
                    <div className="reduction">-28 %</div>
                    <div className="prix flex gap-5 py-5">
                      <p>129 €</p>
                      <h4>93 €</h4>
                    </div>
                    {/* </div> */}
                    <small>pour 2 nuits</small>
                    {/* <p>47 € par nuit</p> */}
                    <small>taxes et frais compris</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="hotel flex">
              <div className="hotel-image">
                <Slider
                  {...{
                    dots: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    arrows: false,
                    autoplaySpeed: 5000,
                  }}
                >
                  <img src="/img/other/chambre_1.jpg" alt="" />
                  <img src="/img/other/vacances.jpg" alt="" />
                  <img src="/img/other/chambre_luxe.jpg" alt="" />
                </Slider>
              </div>
              <div className="hotel-detail flex flex-column justify-content-between">
                <div className="top">
                  <span>{t("Hôte professionnel")}</span>
                  <h3>Le Grand Mellis Hôtel & Spa</h3>
                  <span className="flex align-items-center gap-5">
                    <GeoAlt />
                    {t("Antananarivo")}
                  </span>
                  <div className="flex">
                    <div className="flex gap-15">
                      <small className="flex align-items-center gap-5 py-5">
                        <CupHot />
                        {t("Petit déjeuner")}
                      </small>
                      <small className="flex align-items-center gap-5">
                        <Wifi />
                        {t("Wi-Fi inclus")}
                      </small>
                      <small className="flex align-items-center gap-5">
                        <Water />
                        {t("Piscine")}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="bottom flex justify-content-between align-items-end">
                  <div className="left ">
                    <div className="cumule flex align-items-center gap-5">
                      <Award size={18} className="icon" />
                      <p>{t("Cumulez des vignettes")}</p>
                    </div>
                    <div className="avis flex align-items-center gap-5">
                      <div className="note">5.6</div>
                      {t("7 avis")}
                    </div>
                  </div>
                  <div className="right flex align-items-end flex-column">
                    <div className="reduction">-28 %</div>
                    <div className="prix flex gap-5 py-5">
                      <p>129 €</p>
                      <h4>93 €</h4>
                    </div>
                    <small>{t("pour 2 nuits")}</small>
                    <small>{t("taxes et frais compris")}</small>
                  </div>
                </div>
                </div>
                </div>
                </div>
                <div className="footer">
                <button className="btn btn-transparent">{t("Voir plus")}</button>
                </div>
                </div>
                <div className="attractions-results">
                <div className="top">
                  <h2>{t("Attractions")}</h2>
                </div>
                <div className="attractions-results-list mt-10">
                  <Slider {...settings}>
                    {attractionsData.map((a, i) => (
                      <div className="attraction" key={i}>
                        <div className="attraction-image">
                          <img src={a.URLImage} alt={a.name} />
                        </div>
                        <div className="attraction-text">
                          <h3>{a.name}</h3>
                          <span className="location flex align-items-center gap-5">
                            <GeoAlt /> {a.location}
                          </span>
                          <p>{a.type}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="footer">
                  <button className="btn btn-transparent">{t("Voir plus")}</button>
                  </div>
                  </div>
                </div>

      <div className="right"> 
      <StickySideBar top={63}>
        <div className="suggest-search-invest">
          <h2>
            {t("Where to invest in")} <br />
            {t("Africa ?")}
          </h2>
          <span>
            {t("Find safe investments to invest quickly and easily in a continent with great potential.")}
          </span>
          <img src="/img/other/afrique2.png" alt="" />
          <Link to="/investissements" className="btn btn-gradient">
            {t("Start")}
          </Link>
        </div>
        <div className="square-ad">
          <img src="/img/ads/ad1.png" alt="" />
        </div>
      </StickySideBar>
    </div>
    </div>
  );
};

export default Search;
