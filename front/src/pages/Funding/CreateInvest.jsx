import React, { useState } from 'react'
import AmountInput from '../../components/AmountInput/AmountInput'
import './CreateInvest.scss'
import MultiSelectSearch from '../../components/SelectSearch/MultiSelectSearch'
import { getDomains } from '../../api/domain'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserCompanies } from '../../api/company'
import SelectSearch from '../../components/SelectSearch/SelectSearch'
import axios from 'axios'
import CircleLoader from '../../components/CircleLoader/CircleLoader'
import MediasSelector from '../../components/MediaSelector/MediasSelector'
import ErrorLabel from '../../components/Labels/ErrorAlert'
import FundingCard from '../../components/FundingCard/FundingCard'
import AuthorSelector from '../../components/AuthorSelector/AuthorSelector'

const CreateInvest = () => {
    const { user } = useSelector(store => store.user)
    const navigate = useNavigate()
    const [invest, setInvest] = useState({
        title: '',
        description: '',
        need: null,
        collected: null,
        currency: null,
        domains: [],
        medias: [],
        author: null
    })
    const [errors, setErrors] = useState({
        title: null,
        description: null,
        need: null,
        collected: null,
        currency: null,
        domains: null,
        medias: null,
        author: null
    })
    const resetErrors=()=>{
        let newErrors={...errors}
        Object.keys(newErrors).forEach((key) => {
            newErrors={...newErrors,[key]:null}
        })
        setErrors(newErrors);
    }

    const [addInvestLoading, setAddInvestLoading] = useState(false)

    const setInvestMedias = (medias) => {
        setInvest(prev => ({ ...prev, medias }))
    }

    const addInvest = () => {
        resetErrors()
        const toSend = { ...invest,author:invest.author.name ? `/companies/${invest.author.id}` : `/users/${invest.author.id}`, currency: invest.currency?.value || null }
        const data = new FormData()
        for (var key in toSend) {
            if (Array.isArray(toSend[key])) {
                toSend[key].forEach(v => {
                    data.append(`${key}[]`, v)
                });
            } else {
                data.append(`${key}`, toSend[key])
            }
        }

        setAddInvestLoading(true)
        axios({
            url: `${process.env.REACT_APP_API_DOMAIN}/invests`,
            data,
            method: 'post', withCredentials: true
        })
            .then((res) => {
                console.log(res.data)
                setAddInvestLoading(false)
                navigate('/investissements')
            })
            .catch((err) => {
                setAddInvestLoading(false)
                console.log(err.response, 'CRETEINVESTERR')
                const { violations } = err.response.data
                if (violations) {
                    violations.forEach((v) => {
                        setErrors(prev => ({...prev,[v.propertyPath]:v.message}))
                    })
                }

            })
    }

    return (
        <div id='create-invest'>
            <div className="formulaire">
                <div className="top">
                    <h2>Nouvel investissement</h2>
                    <small>La collecte de fonds consiste à solliciter des contributions financières pour soutenir une cause, organisation, projet, ou événement spécifique.</small>
                </div>
                <hr style={{ margin: '20px 10px 0 10px' }} />
                <div className="bottom">
                    <div className="form-group">
                        <label htmlFor="">Nom de l'entreprise</label>
                        <AuthorSelector onStart={(author)=>setInvest(prev => ({ ...prev, author }))} onSelect={(author)=>setInvest(prev => ({ ...prev, author }))}/>
                        <ErrorLabel title={errors.author} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Titre</label>
                        <input onChange={(e) => setInvest(prev => ({ ...prev, title: e.target.value }))} type="text" className="inpt" placeholder='titre de votre collecte de fonds' />
                        <ErrorLabel title={errors.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Description</label>
                        <textarea onChange={(e) => setInvest(prev => ({ ...prev, description: e.target.value }))} type="text" className="inpt" placeholder='Description de votre collecte de fonds'></textarea>
                        <ErrorLabel title={errors.description} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Besoin</label>
                        <AmountInput onChange={(amount) => {
                            setInvest(prev => ({ ...prev, need: parseInt(amount?.value), currency: amount?.currency }))
                        }} placeholder='Votre besoin' />
                        <ErrorLabel title={errors.need} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Colléctés</label>
                        <AmountInput onChange={(amount) => {
                            setInvest(prev => ({ ...prev, collected: parseInt(amount?.value), currency: amount?.currency }))
                        }} currency={invest.currency?.code} readOnlyCurrency={true} placeholder='Déjà colléctés' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Domaines</label>
                        <div className="right">
                            <MultiSelectSearch
                                onChange={(sel) => { setInvest(prev => ({ ...prev, domains: sel.map((s) => s?.value || null) })) }}
                                placeholder='Choisir un domaine'
                                searchPlaceholder='Rechercher un domaine'
                                query={getDomains}
                                repoName="domainsListRepo"
                                objectMapping={(d) => ({ title: d.title, value: `/domains/${d.id}` })} />
                            <ErrorLabel title={errors.domains} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="mb-15">
                            <label htmlFor="">Joindre des images</label>
                            <small>Ajouter des images pour donner un apercu ou échantillon</small>
                        </div>
                        <MediasSelector col={4} setMediasState={setInvestMedias} />
                    </div>

                </div>

                <div className="footer flex justify-content-end align-items-center gap-10">
                    <button className="btn btn-transparent">Annuler</button>
                    <button className="btn btn-purple" onClick={addInvest}>
                        {
                            addInvestLoading ?
                                <CircleLoader />
                                : 'Publier'
                        }
                    </button>
                </div>
            </div>
            <div className="center flex flex-grow-1 align-items-center justify-content-center">
                <FundingCard data={{...invest,investPictures:invest.medias.map((p)=>({fileUrl:URL.createObjectURL(p)}))}}/>
            </div>
        </div>
    )
}

export default CreateInvest
