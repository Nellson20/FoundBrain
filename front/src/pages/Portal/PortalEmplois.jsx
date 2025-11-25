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

  // Les données statiques jobDataList restent car elles sont déjà utilisées via jobOfferListFlat depuis le backend

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
