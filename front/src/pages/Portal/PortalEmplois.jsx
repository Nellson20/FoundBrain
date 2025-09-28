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
import { useTranslation } from "react-i18next";

const PortalEmplois = () => {
  const { t } = useTranslation();
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
      title: t("Développeur Full Stack"),
      author: {
        name: "Entreprise A",
        activeLogo: { fileUrl: company?.activeLogo?.fileUrl },
        adress: t("123 Rue de l'Exemple, Paris"),
      },
      domaine: t("Technologie"),
      summary:
        t("Résumé de l'emploi... Lorem, ipsum dolor sit amet consectetur adipisicing elitPossimus, suscipit accusamus, incidunt voluptatum dignissimosquaerat blanditiis ut nostrum harum, provident quam nemo"),
      description:
        t("Description détaillée de l'emploi...<br><br>Entreprise X est à la recherche d'un développeur Full Stack expérimenté pour rejoindre notre équipe de développement. Vous serez responsable de la conception, du développement et de la maintenance de nos applications web et mobiles. Nous recherchons quelqu'un qui est passionné par la technologie et qui a une expérience prouvée dans le développement Full Stack. Vous travaillerez en étroite collaboration avec notre équipe de produits pour créer des solutions qui répondent à nos besoins métier. Nous offrons un environnement de travail stimulant et une opportunité de croissance professionnelle."),
      createdAt: "2023-04-01T00:00:00Z",
      xp: t("2 ans"),
      salary: {
        min: 40000,
        max: 60000,
        currency: { code: "USD" },
      },
      grade: {
        title: t("Senior"),
      },
      type: {
        title: t("Temps plein"),
      },
    },
    // ... autres objets inchangés mais avec t("...") ajouté
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
            <h3>{t("Emplois disponible chez")} {company.name}</h3>
          </div>
          <JobFindingSearchBar />
        </div>
      </div>
      <div className="sorting flex justify-content-between">
        <p>
          <span>{jobOfferList?.pages[0]?.totalItems > 0 ? jobOfferList?.pages[0]?.totalItems : t("Aucun")}</span> {t("emplois trouvés")}
        </p>
        <div className="sort flex">
          <p>{t("Trier par:")}</p>
          <div className="selected flex align-items-center">
            <p>{t("Date")}</p>
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
              <p>{t("Error")}: {error.message}</p>
            ) : (jobOfferList?.pages[0]?.data?.length > 0 ? jobOfferList?.pages?.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.map((job) => (
                  <JobCard active={activeJob === job} data={job} />
                ))}
              </React.Fragment>
            )) : <div className="empty-job flex flex-column justify-content-center align-items-center gap-5">
              <h4>{t("Aucune offre d'emplois à afficher")}</h4>
              <p>{t("Nous vous invitons à créer une première offre d'emplois pour commencer le recrutement pour votre entreprise")}</p>
              <Link to='/emplois/nouveau' className="btn btn-gradient">{t("Créer une offre d'emplois")}</Link>
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
