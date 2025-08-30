import React, { useContext } from 'react'
import './JobFindingSearchbar.scss'
import { Search, PinMapFill, BriefcaseFill, GeoAltFill } from 'react-bootstrap-icons'
import SuggestInput from '../SuggestInput/SuggestInput'
import { getJobTitles } from '../../api/job'
import { Link } from 'react-router-dom'
import { getCitiesList } from '../../api/coutry'
import SelectSearch from '../SelectSearch/SelectSearch'
import { getJobTypes } from '../../api/job'
import { useEffect } from 'react'
import { useState } from 'react'
import MediaContext from '../../context/MediaContext'
import { DESKTOP, SMARTPHONE } from '../../constants/MediaTypeConstants'
import { useTranslation } from 'react-i18next'



const JobFindingSearchBar = ({ onChange = () => { } }) => {
    const { t } = useTranslation()
    const [search, setSearch] = useState({
        title: null,
        location: null,
        type: null,
        salary: null,
    })
    const { deviceType } = useContext(MediaContext)
    useEffect(() => {
        onChange(search)
    }, [search])
    return (
        <div className="job-finding-searchbar">

            <div className='search-form'>
                <div className="job-title">
                    <span className='fake-placeholder flex align-items-center' style={{ display: "block", width: '100%' }}>
                        <Search />
                        <SuggestInput onChange={(title) => setSearch(prev => ({ ...prev, title }))} searchProperty='title' repoName='repoJobTitles' placeholder={t("Titre du poste, mot clé ou entreprise")} query={(keyword) => getJobTitles(keyword)} mapping={(jo) => <Link className='text-ellipsis'>{jo.title}</Link>} />
                    </span>
                </div>
                <div className="job-location">
                    <span className='fake-placeholder flex align-items-center'>
                        <GeoAltFill />
                        <SuggestInput onChange={(location) => setSearch(prev => ({ ...prev, location }))} placeholder={t("Votre ville")} repoName='repoCities' query={(keyword) => getCitiesList(keyword)} mapping={(c) => <Link className='text-ellipsis'>{c.name}</Link>} />
                    </span>
                </div>
                {
                    deviceType === SMARTPHONE &&
                    <>
                        <div className="job-type">
                            <span className='fake-placeholder flex align-items-center'>
                                <BriefcaseFill />
                                <SelectSearch
                                    searchFields={['title']}
                                    onChange={(type) => setSearch(prev => ({ ...prev, type }))}
                                    placeholder='Type'
                                    searchPlaceholder={t('Rechercher un type')}
                                    query={(filters) => getJobTypes()}
                                    repoName="jobTypesRepo"
                                    toPlaceholder={(elem) => elem.title}
                                    objectMapping={(t) => ({ title: t.title, value: `/job_types/${t.id}` })}
                                    mapping={(t) => <Link>
                                        <span>{t.title}</span>
                                    </Link>}
                                />
                            </span>
                        </div>
                        <div className="salary">
                            <span className='fake-placeholder flex align-items-center gap-15'>
                                <Search />
                                <span>{t("Salaire")}</span>
                            </span>
                        </div>
                    </>
                }
                <div className="job-search-btn">
                    <button className='btn-orange'>{deviceType !== SMARTPHONE ? t("Rechercher") : <Search />}</button>
                </div>
            </div>
        </div>
    )
}

export default JobFindingSearchBar
