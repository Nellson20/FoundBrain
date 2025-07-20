import React, { useContext, useEffect } from "react";
import JobDetailsSkeleton from "../../components/JobDetails/JobDetailsSkeleton";
import MediaContext from "../../context/MediaContext";
import { DESKTOP } from "../../constants/MediaTypeConstants";
import {
  Calendar2,
  Calendar3,
  CaretDownFill,
  GeoAlt,
  Search,
} from "react-bootstrap-icons";
import "./PortalEmplois.scss";
import Accordion from "../../components/Accordion/Accordion";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import JobCard from "../../components/JobCard/JobCard";
import CheckBox from "../../components/CheckBox/CheckBox";
import JobDetails from "../../components/JobDetails/JobDetails";
import JobFindingSearchBar from "../../components/JobFindingSearchbar/JobFindingSearchbar";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import StickySideBar from "../../components/StickySideBar/StickySideBar";
import useInfiniteScroll from "../../Hooks/useInfiniteScroll";
import JobCardSkeleton from "../../components/JobCard/JobCardSkeleton";

const PortalEmplois = () => {
  const { company } = useOutletContext();
  const { deviceType } = useContext(MediaContext)
  const { jobOfferId } = useParams()
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null)
  const [activeJob, setActiveJob] = useState(null)
  const navigate = useNavigate()

  const { data: jobOfferList,
    flatData: jobOfferListFlat,
    error,
    hasNextPage: jobListNextPage,
    isFetching: jobListFetching,
    isFetchingNextPage: jobListFetchingNextPage,
    status: jobsLoadingStatus,
    refetch,
    refetchPage
  } = useInfiniteScroll({
    url: `${process.env.REACT_APP_API_DOMAIN}/companies/${company.id}/job_offers`,
    ipp: 10,
    queryKey: ['jobOffers', company.id],
    queryString: 'groups[]=job_offers_read',
  })

  useEffect(() => {
    setActiveJob(jobOfferListFlat?.find((j) => j?.id == jobOfferId))
  }, [jobOfferList, jobOfferId])

  useEffect(() => {
    if (jobOfferList && jobOfferList?.pages[0]?.data?.length > 0) {
      setActiveJob(jobOfferList?.pages[0]?.data[0])
      navigate(`../emplois/${jobOfferList?.pages[0]?.data[0].id}`, { absolute: true })
    }
  }, [jobOfferList])

  const jobDataList = [
    {
      id: 1,
      title: "Développeur Full Stack",
      author: {
        name: "Entreprise A",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "123 Rue de l'Exemple, Paris",
      },
      domaine: "Technologie",
      summary:
        "Résumé de l'emploi... Lorem, ipsum dolor sit amet consectetur adipisicing elitPossimus, suscipit accusamus, incidunt voluptatum dignissimosquaerat blanditiis ut nostrum harum, provident quam nemo",
      description:
        "Description détaillée de l'emploi...<br><br>Entreprise X est à la recherche d'un développeur Full Stack expérimenté pour rejoindre notre équipe de développement. Vous serez responsable de la conception, du développement et de la maintenance de nos applications web et mobiles. Nous recherchons quelqu'un qui est passionné par la technologie et qui a une expérience prouvée dans le développement Full Stack. Vous travaillerez en étroite collaboration avec notre équipe de produits pour créer des solutions qui répondent à nos besoins métier. Nous offrons un environnement de travail stimulant et une opportunité de croissance professionnelle.",
      createdAt: "2023-04-01T00:00:00Z",
      xp: "2 ans",
      salary: {
        min: 40000,
        max: 60000,
        currency: { code: "USD" },
      },
      grade: {
        title: "Senior",
      },
      type: {
        title: "Temps plein",
      },
    },
    {
      id: 2,
      title: "Data Scientist",
      author: {
        name: "Entreprise B",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "456 Rue de l'Exemple, Paris",
      },
      domaine: "Data",
      summary: "Résumé de l'emploi...",
      description: "Description détaillée de l'emploi...",
      createdAt: "2023-04-02T00:00:00Z",
      xp: "3 ans",
      salary: {
        min: 50000,
        max: 70000,
        currency: { code: "EUR" },
      },
    },
    {
      id: 3,
      title: "Ingénieur en Réseau",
      author: {
        name: "Entreprise C",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "789 Rue de l'Exemple, Paris",
      },
      domaine: "Réseau",
      summary: "Résumé de l'emploi...",
      description: "Description détaillée de l'emploi...",
      createdAt: "2023-04-03T00:00:00Z",
      xp: "5 ans",
      salary: {
        min: 60000,
        max: 80000,
        currency: { code: "GBP" },
      },
    },
    {
      id: 4,
      title: "Chef de Projet UX/UI",
      author: {
        name: "Entreprise D",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "1011 Rue de l'Exemple, Paris",
      },
      domaine: "Design",
      summary: "Résumé de l'emploi...",
      description: "Description détaillée de l'emploi...",
      createdAt: "2023-04-04T00:00:00Z",
      xp: "4 ans",
      salary: {
        min: 70000,
        max: 90000,
        currency: { code: "JPY" },
      },
    },
    {
      id: 5,
      title: "Développeur Front-End",
      author: {
        name: "Entreprise E",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "1213 Rue de l'Exemple, Paris",
      },
      domaine: "Développement Web",
      summary: "Résumé de l'emploi...",
      description: "Description détaillée de l'emploi...",
      createdAt: "2023-04-05T00:00:00Z",
      xp: "1 an",
      salary: {
        min: 80000,
        max: 100000,
        currency: { code: "AUD" },
      },
    },
    {
      id: 6,
      title: "Analyste Financier",
      author: {
        name: "Entreprise F",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "1415 Rue de l'Exemple, Paris",
      },
      domaine: "Finance",
      summary: "Résumé de l'emploi...",
      description: "Description détaillée de l'emploi...",
      createdAt: "2023-04-06T00:00:00Z",
      xp: "6 ans",
      salary: {
        min: 90000,
        max: 110000,
        currency: { code: "CAD" },
      },
    },
    {
      id: 7,
      title: "Consultant en Stratégie",
      author: {
        name: "Entreprise G",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "1617 Rue de l'Exemple, Paris",
      },
      domaine: "Consulting",
      summary: "Résumé de l'emploi...",
      description: "Description détaillée de l'emploi...",
      createdAt: "2023-04-07T00:00:00Z",
      xp: "7 ans",
      salary: {
        min: 100000,
        max: 120000,
        currency: { code: "CHF" },
      },
    },
    {
      id: 8,
      title: "Ingénieur en Logiciel",
      author: {
        name: "Entreprise H",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "1819 Rue de l'Exemple, Paris",
      },
      domaine: "Logiciel",
      summary: "Résumé de l'emploi...",
      description: "Description détaillée de l'emploi...",
      createdAt: "2023-04-08T00:00:00Z",
      xp: "8 ans",
      salary: {
        min: 110000,
        max: 130000,
        currency: { code: "NZD" },
      },
    },
    {
      id: 9,
      title: "Architecte de Système",
      author: {
        name: "Entreprise I",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "2021 Rue de l'Exemple, Paris",
      },
      domaine: "Architecture",
      summary: "Résumé de l'emploi...",
      description: "Description détaillée de l'emploi...",
      createdAt: "2023-04-09T00:00:00Z",
      xp: "9 ans",
      salary: {
        min: 120000,
        max: 140000,
        currency: { code: "SEK" },
      },
    },
    {
      id: 10,
      title: "Spécialiste en Sécurité",
      author: {
        name: "Entreprise J",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: "2223 Rue de l'Exemple, Paris",
      },
      domaine: "Sécurité",
      summary: "Résumé de l'emploi...",
      description: "Description détaillée de l'emploi...",
      createdAt: "2023-04-10T00:00:00Z",
      xp: "10 ans",
      salary: {
        min: 130000,
        max: 150000,
        currency: { code: "NOK" },
      },
    },
  ];

  const show = (element) => {
    setOpen(true);
    setSelectedJob(element)
  }
  return (
    <div className="portalEmplois">
      <div className="top mt-15">
        <div>
          <div className="heading2">
            <h3>Emplois disponible chez {company.name}</h3>
          </div>
          <JobFindingSearchBar />
        </div>
      </div>
      <div className="sorting flex justify-content-between">
        <p>
          <span>{jobOfferList?.pages[0]?.totalItems > 0 ? jobOfferList?.pages[0]?.totalItems : 'Aucun'}</span> emplois trouvés
        </p>
        <div className="sort flex">
          <p>Trier par: </p>
          <div className="selected flex align-items-center">
            <p>Date</p>
            <span className="caretDown">
              <CaretDownFill />
            </span>
          </div>
        </div>
      </div>
      <div className="result">
        <div className="job-list">
          {
            (jobListFetching && jobListFetchingNextPage) ? (
              <>
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
              </>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (jobOfferList?.pages[0]?.data?.length > 0 ? jobOfferList?.pages?.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.map((job) => (
                  <JobCard active={activeJob === job} data={job} />
                ))}
              </React.Fragment>

            )) : <div className="empty-job flex flex-column justify-content-center align-items-center gap-5">
              <h4>Aucune offre d'emplois à afficher</h4>
              <p>Nous vous invitons à créer une première offre d'emplois pour commencer le recrutement pour votre entreprise</p>
              <Link to='/emplois/nouveau' className="btn btn-gradient">Créer une offre d'emplois</Link>
            </div>)
          }
          {jobListFetchingNextPage
            ? <JobCardSkeleton />
            : jobListNextPage
              ? ''
              : ''}
        </div>
        {
          deviceType === DESKTOP &&
          <div className="job-detail">
            <StickySideBar top={63} bottom={5}>
              {
                jobListFetching ?
                  <JobDetailsSkeleton /> :
                  activeJob && <JobDetails data={activeJob} />
              }
            </StickySideBar>
          </div>

        }

      </div>
    </div>
  );
};

export default PortalEmplois;
