import React, { useContext } from "react";
import Avatar from "../../components/Avatar/Avatar";
import "./PortalHome.scss";
import { Link, useOutletContext, useParams } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseFill,
  ExclamationDiamondFill,
  FilePostFill,
  GeoAlt,
  GraphUpArrow,
  ChevronLeft,
  ChevronRight,
  HouseDoor,
  HouseDoorFill,
  PencilSquare,
  PeopleFill,
  ThreeDots,
  Plus,
  PlusLg,
  PersonCircle,
  GeoAltFill,
  Briefcase,
} from "react-bootstrap-icons";
import PostCard from "../../components/PostCard/PostCard";
import StickySidebar from "../../components/StickySideBar/StickySideBar";
import LastPosts from "../../components/LastPosts/LastPosts";
import Slider from "react-slick";
import MediaContext from "../../context/MediaContext";
import { Parser } from "html-to-react";
import useInfiniteScroll from "../../Hooks/useInfiniteScroll";
import Logo from "../../components/Logo/Logo";
import Skeleton from "../../components/Skeleton/Skeleton";
import { } from "react-bootstrap-icons";
import YearlyStatsChart from "../../components/YearlyStatsChart/YearlyStatsChart";

const PageHome = () => {
  const { deviceType } = useContext(MediaContext);
  const { portalId } = useParams();
  const { company } = useOutletContext();
  const htmlToJsx = new Parser();
  const yearlyData = [6, 7, 6, 5.6, 6.5];

  /**
   * Get portal jobs
   */
  const {
    data: jobOfferList,
    flatData: jobOfferListFlat,
    error,
    hasNextPage: jobListNextPage,
    isFetching: jobListFetching,
    isFetchingNextPage: jobListFetchingNextPage,
    status: jobsLoadingStatus,
    refetch,
    refetchPage,
  } = useInfiniteScroll({
    url: `${process.env.REACT_APP_API_DOMAIN}/authors/${portalId}/job_offers`,
    ipp: 10,
    queryKey: ["jobOffers", portalId],
    queryString: "groups[]=job_offers_read",
    transformResult: (result) => {
      return {
        data: result["hydra:member"],
        nextPage: result["hydra:view"]["hydra:next"]
          ? parseInt(
            result["hydra:view"]["hydra:next"]
              .match(/page=(\d+)/)[0]
              .split("=")[1]
          )
          : undefined,
      };
    },
  });

  return (
    <>
      <div className="entreprise-resume elevated-card mt-15">
        <div className="px-15">
          <div className="heading2">
            <h3>Resumé de l'entreprise</h3>
          </div>
          <div className="portal-summary">
            {htmlToJsx.parse(company?.description)}
            <Link>En savoir plus</Link>
          </div>
        </div>
        <div className="util-infos p-15">
          <h5>Chiffre d'affaire des 3 dernieres annees</h5>
          <div className="ca-slider flex mt-15 gap-15">
            <div className="radius-5 flex-1 flex flex-column gap-5 p-10">
              <GraphUpArrow size={20} />
              <span className="orange-txt">2022</span>
              <b>200 000 000 MGA</b>
            </div>
            <div className="radius-5 flex-1 flex flex-column gap-5 p-10">
              <GraphUpArrow size={20} />
              <span className="orange-txt">2021</span>
              <b>180 000 000 MGA</b>
            </div>
            <div className="radius-5 flex-1 flex flex-column gap-5 p-10">
              <GraphUpArrow size={20} />
              <span className="orange-txt">2020</span>
              <b>100 000 000 MGA</b>
            </div>
          </div>
        </div>
        <div className="px-15 pb-15">
          <button className="btn-outline-purple">
            Details <ArrowRight />
          </button>
        </div>
      </div>
      <div className="offers elevated-card mt-15 p-15">
        <div className="heading2 justify-content-between">
          <h3>Dernières offres d'emplois</h3>
          <div className="flex gap-10 px-15">
            <button className="floating-btn">
              <ChevronLeft size={18} />
            </button>
            <button className="floating-btn">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <Slider
          {...{
            dots: false,
            arrows: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: false,
          }}
        >
          {(jobListFetching && !jobListFetchingNextPage)
            ? [...new Array(8)].map((_, i) => (
              <div
                key={i}
                className="offer flex flex-column align-items-center gap-5"
                style={{ width: 200, height: 100 }}
              >
                <Skeleton width={80} height={10} />
                <Skeleton width={100} height={10} />
                <Skeleton width={40} height={6} />
              </div>
            ))
            : jobOfferListFlat?.map((j, i) => (
              <div
                key={i}
                className="offer flex flex-column align-items-center gap-5"
                style={{ width: 200, height: 100 }}
              >
                <Logo
                  src={j.author.activeLogo?.fileUrl}
                  width={40}
                  height={40}
                />
                <h5 className="line-clamp-2 text-center">{j.title}</h5>
                <span>{j.type.title}</span>
              </div>
            ))}
          {jobListFetchingNextPage
            ? [...new Array(2)].map((_,i) => <h1 key={i}>Job</h1>)
            : ""}

          <Link
            to="/emplois/nouveau"
            className="offer create-job-link flex flex-column align-items-center justify-content-center gap-5"
            style={{ width: 200 }}
          >
            <span className="flex flex-column align-items-center">
              <PlusLg size={25} />
              <h5 className="text-center line-clamp-2">
                Créer une offre d'emplois
              </h5>
            </span>
          </Link>
        </Slider>
        <button className="btn-outline-purple mt-15">
          Voir plus <ArrowRight />
        </button>
      </div>
      {/* <LastPosts /> */}
      <div className="apercu-de-lentreprise elevated-card mt-15 py-15">
        <div className="heading2 justify-content-between px-15">
          <h3>Apercu de L'Entreprise</h3>
        </div>
        <div className="chart" x>
          <p className="px-15 mb-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum,
            necessitatibus! A in nam excepturi officia sequi harum, numquam cum
            voluptatibus sunt tempore accusantium veritatis magnam iusto at
            consectetur vel tempora?
          </p>
          <YearlyStatsChart data={yearlyData} />
        </div>
      </div>
      <div className="partenaires elevated-card mt-15 p-15">
        <div className="heading2 justify-content-between">
          <h3>Partenaires</h3>
          <div className="flex gap-10 px-15">
            <button className="floating-btn">
              <ChevronLeft size={18} />
            </button>
            <button className="floating-btn">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum minima
          autem earum
        </p>
        <Slider
          {...{
            dots: false,
            arrows: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: true,
          }}
        >
          <div className="partenaire flex flex-column align-items-center">
            <div className="logo">
              <img src="/img/partenaires/1.png" alt="" />
            </div>
            <h5>AC Energy</h5>
            <span>Energie Renouvelable</span>
          </div>
          <div className="partenaire flex flex-column align-items-center">
            <div className="logo">
              <img src="/img/partenaires/2.png" alt="" />
            </div>
            <h5>Actu.mg</h5>
            <span>Actualité</span>
          </div>
          <div className="partenaire flex flex-column align-items-center">
            <div className="logo">
              <img src="/img/partenaires/3.png" alt="" />
            </div>
            <h5>AELI</h5>
            <span>Education</span>
          </div>
          <div className="partenaire flex flex-column align-items-center">
            <div className="logo">
              <img src="/img/partenaires/4.png" alt="" />
            </div>
            <h5>ARC</h5>
            <span>Textile</span>
          </div>
          <div className="partenaire flex flex-column align-items-center">
            <div className="logo">
              <img src="/img/partenaires/6.png" alt="" />
            </div>
            <h5>Emedia</h5>
            <span>Education</span>
          </div>
        </Slider>
        <div className="flex mt-15 gap-10">
          <button className="btn-outline-purple">
            Voir tout <ArrowRight />
          </button>
          <button className="btn-outline-grey">
            Rechercher des partenaires
          </button>
        </div>
      </div>
      <div className="travails elevated-card mt-15 px-15 pb-15">
        <div className="heading2">
          <h3>Travails chez Design</h3>
        </div>
        <div className="list flex flex-wrap gap-10">
          <div className="travail">
            <div className="left">
              <span>
                <Briefcase size={20} />
              </span>
              <h4>Designer graphique</h4>
            </div>
            <ArrowRight size={20} />
          </div>
          <div className="travail">
            <div className="left">
              <span>
                <Briefcase size={20} />
              </span>
              <h4>chef de projet</h4>
            </div>
            <ArrowRight size={20} />

          </div>
          <div className="travail">
            <div className="left">
              <span>
                <Briefcase size={20} />
              </span>
              <h4>Designer UX/UI</h4>
            </div>
            <ArrowRight size={20} />
          </div>
          <div className="travail">
            <div className="left">
              <span>
                <Briefcase size={20} />
              </span>
              <h4>Concepteur industriel</h4>
            </div>
            <ArrowRight size={20} />
          </div>
          <div className="travail">
            <div className="left">
              <span>
                <Briefcase size={20} />
              </span>
              <h4>Directeur artistique</h4>
            </div>
            <ArrowRight size={20} />
          </div>
        </div>
        <div className="flex mt-15 gap-10">
          <button className="btn-outline-purple">
            Voir tout <ArrowRight />
          </button>
        </div>
      </div>
      <div className="lieu elevated-card mt-15 px-15">
        <div className="heading2">
          <h3>Emplacements de l'entreprise</h3>
        </div>
        <div className="ca-slider flex flex-wrap mt-15 gap-15">
          <div className="radius-5 flex flex-column gap-5 p-10">
            <div className="icon-localisation">
              <GeoAltFill size={20} />
            </div>
            <b>Antananarivo</b>
          </div>
          <div className="radius-5 flex flex-column gap-5 p-10">
            <div className="icon-localisation">
              <GeoAltFill size={20} />
            </div>
            <b>Toamasina</b>
          </div>
          <div className="radius-5 flex flex-column gap-5 p-10">
            <div className="icon-localisation">
              <GeoAltFill size={20} />
            </div>
            <b>Mahajanga</b>
          </div>
          <div className="radius-5 flex flex-column gap-5 p-10">
            <div className="icon-localisation">
              <GeoAltFill size={20} />
            </div>
            <b>Antsirabe</b>
          </div>
          <div className="radius-5 flex flex-column gap-5 p-10">
            <div className="icon-localisation">
              <GeoAltFill size={20} />
            </div>
            <b>Fianarantsoa</b>
          </div>
        </div>
        <div className="pb-15 mt-20">
          <button className="btn-outline-purple">
            Details <ArrowRight />
          </button>
        </div>
      </div>
      <div className="other-portal elevated-card  mt-15 px-15 pb-15">
        <div className="heading2 flex justify-content-between">
          <h3>Autre Entreprises a consultées</h3>
          <div className="flex gap-10 px-15">
            <button className="floating-btn">
              <ChevronLeft size={18} />
            </button>
            <button className="floating-btn">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <Slider
          {...{
            dots: false,
            arrows: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: true,
            responsive: [
              {
                breakpoint: 700,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
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
          }}
        >
          <div className="portal flex flex-column align-items-center">
            <span>Fournisseurs d'Energie</span>
            <div className="logo">
              <img src="/img/partenaires/1.png" alt="" />
            </div>
            <h5>AC Energy</h5>
            <span>6,5k avis | 5,4k emplois</span>
            <div className="pb-15 mt-20">
              <button className="btn-outline-purple">Voir l'entreprise</button>
            </div>
          </div>
          <div className="portal flex flex-column align-items-center">
            <span>Fournisseurs d'Energie</span>
            <div className="logo">
              <img src="/img/partenaires/2.png" alt="" />
            </div>
            <h5>AC Energy</h5>
            <span>6,5k avis | 5,4k emplois</span>
            <div className="pb-15 mt-20">
              <button className="btn-outline-purple">Voir l'entreprise</button>
            </div>
          </div>
          <div className="portal flex flex-column align-items-center">
            <span>Fournisseurs d'Energie</span>
            <div className="logo">
              <img src="/img/partenaires/3.png" alt="" />
            </div>
            <h5>AC Energy</h5>
            <span>6,5k avis | 5,4k emplois</span>
            <div className="pb-15 mt-20">
              <button className="btn-outline-purple">Voir l'entreprise</button>
            </div>
          </div>
          <div className="portal flex flex-column align-items-center">
            <span>Fournisseurs d'Energie</span>
            <div className="logo">
              <img src="/img/partenaires/4.png" alt="" />
            </div>
            <h5>AC Energy</h5>
            <span>6,5k avis | 5,4k emplois</span>
            <div className="pb-15 mt-20">
              <button className="btn-outline-purple">Voir l'entreprise</button>
            </div>
          </div>
          <div className="portal flex flex-column align-items-center">
            <span>Fournisseurs d'Energie</span>
            <div className="logo">
              <img src="/img/partenaires/5.png" alt="" />
            </div>
            <h5>AC Energy</h5>
            <span>6,5k avis | 5,4k emplois</span>
            <div className="pb-15 mt-20">
              <button className="btn-outline-purple">Voir l'entreprise</button>
            </div>
          </div>
        </Slider>
      </div>
      <div className="avis elevated-card mt-15 pb-15 px-15">
        <div className="heading2">
          <h3>Avis</h3>
        </div>
        <div className="avis-container">
          <div className="avi">
            <div className="head">
              <div className="avatar">
                <PersonCircle size={50} />
              </div>
              <div className="author">
                <h2>Designer graphique</h2>
                <p className="date">20/10/24</p>
              </div>
            </div>
            <div className="corps util-info">
              <h2>Culture d'entreprise inspirante et collaborative</h2>
              <p>
                Je suis constamment inspiré par la culture d'innovation et de
                collaboration qui règne dans notre entreprise. L'atmosphère
                encourageante et ouverte favorise la créativité et pousse chacun
                à donner le meilleur de soi-même.
              </p>
            </div>
          </div>
          <div className="avi">
            <div className="head">
              <div className="avatar">
                <PersonCircle size={50} />
              </div>
              <div className="author">
                <h2>chef de projet</h2>
                <p className="date">15/10/24</p>
              </div>
            </div>
            <div className="corps">
              <h2>Leadership visionnaire et soutien professionnel</h2>
              <p>
                Le leadership visionnaire de nos dirigeants nous guide avec
                clarté et nous pousse à repousser nos limites créatives. Leur
                soutien professionnel continu crée un environnement où nous
                pouvons développer nos compétences et réaliser notre plein
                potentiel.
              </p>
            </div>
          </div>
          <div className="avi">
            <div className="head">
              <div className="avatar">
                <PersonCircle size={50} />
              </div>
              <div className="author">
                <h2>Designer UX/UI</h2>
                <p className="date">20/10/24</p>
              </div>
            </div>
            <div className="corps">
              <h2>Équilibre travail-vie personnelle respecté</h2>
              <p>
                L'entreprise reconnaît l'importance de l'équilibre entre travail
                et vie personnelle, et elle le soutient activement. Des
                politiques flexibles et un respect pour les limites personnelles
                permettent à chacun de maintenir un équilibre sain entre son
                travail et sa vie personnelle.
              </p>
            </div>
          </div>
          <div className="avi">
            <div className="head">
              <div className="avatar">
                <PersonCircle size={50} />
              </div>
              <div className="author">
                <h2>Concepteur industriel</h2>
                <p className="date">20/10/24</p>
              </div>
            </div>
            <div className="corps">
              <h2>
                Opportunités d'apprentissage et de croissance exceptionnelles
              </h2>
              <p>
                Les nombreuses opportunités d'apprentissage et de croissance
                offertes par l'entreprise sont exceptionnelles. Des formations
                régulières, des projets stimulants et un accès à des ressources
                de pointe nous permettent de continuer à élargir nos compétences
                et à progresser dans notre carrière.
              </p>
            </div>
          </div>
          <div className="avi">
            <div className="head">
              <div className="avatar">
                <PersonCircle size={50} />
              </div>
              <div className="author">
                <h2>Directeur artistique</h2>
                <p className="date">20/10/24</p>
              </div>
            </div>
            <div className="corps">
              <h2>Environnement inclusif et diversifié</h2>
              <p>
                L'environnement de travail est véritablement inclusif et
                diversifié, ce qui enrichit notre expérience collective. La
                diversité des perspectives et des talents favorise l'innovation
                et renforce notre capacité à relever les défis avec succès.
              </p>
            </div>
          </div>
        </div>
        <div className="flex mt-15 gap-10">
          <button className="btn-outline-purple">
            Voir tout <ArrowRight />
          </button>
        </div>
      </div>

      <div className="flex align-items-center justify-content-center p-20">
        <Link to="/page/a-propos" className="btn-outline-grey">
          Plus de détails sur l'entreprise <ArrowRight />
        </Link>
      </div>
    </>
  );
};

export default PageHome;
