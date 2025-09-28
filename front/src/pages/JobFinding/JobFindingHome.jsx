import React, { useContext, useEffect, useState } from 'react'
import './JobFindingHome.scss'
import { Search, PinMap, Briefcase } from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'
import JobCard from '../../components/JobCard/JobCard'
import { Plus } from 'react-bootstrap-icons'
import { Link, useParams } from 'react-router-dom'
import JobFindingSearchBar from '../../components/JobFindingSearchbar/JobFindingSearchbar'
import JobDetails from '../../components/JobDetails/JobDetails'
import MediaContext from '../../context/MediaContext'
import { DESKTOP } from '../../constants/MediaTypeConstants'
import CheckBox from '../../components/CheckBox/CheckBox'
import { useQuery } from '@tanstack/react-query'
import { getJobGrades, getJobOffers, getJobTypes } from '../../api/job'
import millify from 'millify'
import RequireAuthOnClick from '../../components/RequireAuthOnclick/RequireAuthOnClick'
import { useNavigate } from 'react-router-dom'
import SortableList from '../../components/SortableList/SortableList'
import useInfiniteScroll from '../../Hooks/useInfiniteScroll'
import JobCardSkeleton from '../../components/JobCard/JobCardSkeleton'
import JobDetailsSkeleton from '../../components/JobDetails/JobDetailsSkeleton'
import SalaryInputs from '../../components/SalaryInputs/SalaryInputs'
import { useTranslation } from 'react-i18next'

const JobFindingHome = () => {
    const { t } = useTranslation()
    const { deviceType } = useContext(MediaContext)
    const { jobOfferId } = useParams()
    const navigate = useNavigate()
    const [activeJob, setActiveJob] = useState(null)

    const { data: jobOfferList,
        flatData: jobOfferListFlat,
        error,
        hasNextPage: jobListNextPage,
        isFetching: jobListFetching,
        isFetchingNextPage: JobListFetchingNextPage,
        status: jobsLoadingStatus,
        refetch,
        refetchPage
    } = useInfiniteScroll({
        url: `${process.env.REACT_APP_API_DOMAIN}/job_offers`,
        ipp: 10,
        queryKey: ['jobOffers'],
        queryString: 'groups[]=job_offers_read',
        transformResult: (result) => {
            return { data: result['hydra:member'], nextPage: result['hydra:view']['hydra:next'] ? parseInt(result['hydra:view']['hydra:next'].match(/page=(\d+)/)[0].split('=')[1]) : undefined }
        }
    })

    useEffect(() => {
        setActiveJob(jobOfferListFlat?.find((j) => j?.id == jobOfferId))
    }, [jobOfferList, jobOfferId])

    useEffect(() => {
        if (jobOfferList && jobOfferList?.pages[0]?.data?.length > 0) {
            setActiveJob(jobOfferList?.pages[0]?.data[0])
            navigate(`/emplois/${jobOfferList?.pages[0]?.data[0].id}`)
        }
    }, [jobOfferList])

    return (
        <>
            <div className="job-finding-top flex flex-column">
                <div>
                    <h2>{t("Trouvez votre job de rêve")}</h2>
                    <p>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus beatae voluptas sed nulla eveniet voluptatibus reiciendis, officia deserunt error molestiae")}</p>
                    <JobFindingSearchBar onChange={search => console.log(search, 'SEARCH')} />
                </div>
            </div>
            <main className='job-finding-home flex justify-content-between gap-5'>
                {
                    deviceType === DESKTOP ?
                        <div className="left">
                            <form action="" onSubmit={(e) => {
                                e.preventDefault()
                            }}>
                                <h4>{t("Creer une offre d'emplois")}</h4>
                                <span>{t("Trouver des préstataires en publiant une offre d'emplois")}</span>
                                <input type="text" className="add-job-input" placeholder={t('Titre')} />
                                <RequireAuthOnClick>
                                    <Link to='/emplois/nouveau' className='btn-purple'><Plus size={25} /> {t("Creer une offre d'emplois")}</Link>
                                </RequireAuthOnClick>
                            </form>
                            <SortableList allowSearch={false} query={(keyword) => getJobTypes()} mapping={(jobType) => <><CheckBox id={jobType.title} value={jobType.title} name='jobTypes' onChange={(e) => { }} /> <label htmlFor={jobType.title}>{t(jobType.title)}</label></>} repoName='repoJobTypes' title={t('Type de travail')} />
                            <SortableList allowSearch={false} query={(keyword) => getJobGrades()} mapping={(jobGrade) => <><CheckBox id={jobGrade.title} value={jobGrade.title} name='jobGrades' onChange={(e) => { }} /> <label htmlFor={jobGrade.title}>{t(jobGrade.title)}</label></>} repoName='repoJobGrades' title={t('Grade')} />
                            <h4>{t("Pretention Salariale")}</h4>
                            <SalaryInputs/>
                        </div> : ""
                }
                <div className="center">
                    <div className="job-list">
                        {
                            (jobListFetching && !jobListNextPage) ? (
                                <>
                                    <JobCardSkeleton />
                                    <JobCardSkeleton />
                                    <JobCardSkeleton />
                                </>
                            ) : error ? (
                                <p>{t("Error")}: {error.message}</p>
                            ) : (jobOfferList?.pages[0]?.data?.length > 0 ? jobOfferList?.pages?.map((group, i) => (
                                <React.Fragment key={i}>
                                    {group.data.map((job,i) => (
                                        <JobCard key={i} active={activeJob === job} data={job} />
                                    ))}
                                </React.Fragment>

                            )) : <div className="empty-job flex flex-column justify-content-center align-items-center gap-5">
                                <h4>{t("Aucune offre d'emplois à afficher")}</h4>
                                <p>{t("Nous vous invitons à créer une première offre d'emplois pour commencer le recrutement pour votre entreprise")}</p>
                                <Link to='/emplois/nouveau' className="btn btn-gradient">{t("Créer une offre d'emplois")}</Link>
                            </div>)
                        }
                        {JobListFetchingNextPage
                            ? <JobCardSkeleton />
                            : jobListNextPage
                                ? ''
                                : ''}
                    </div>
                </div>
                {
                    deviceType === DESKTOP ?
                        <div className="right">
                            {
                                (jobListFetching && !JobListFetchingNextPage) ?
                                    <JobDetailsSkeleton /> :
                                    activeJob && <JobDetails data={activeJob} />
                            }
                        </div> : ""
                }
            </main>
        </>
    )
}

export default JobFindingHome
