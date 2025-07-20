import React, { useState, useRef, useEffect, useContext } from 'react'
import TextEditor from '../../components/TextEditor/TextEditor'
import './CreatePortal.scss'
import { ChevronLeft, Trash, PlusLg, Key } from 'react-bootstrap-icons'
import { useQuery } from '@tanstack/react-query'
import { getCompanySizes, getCompanyTypes } from '../../api/company'
import Avatar from '../../components/Avatar/Avatar'
import { GeoAlt, ChevronDown } from 'react-bootstrap-icons'
import Rating from 'react-rating'
import MultiInputs from '../../components/MultiInputs/MultiInputs'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import MultiSelectSearch from '../../components/SelectSearch/MultiSelectSearch'
import { getDomains } from '../../api/domain'
import { Link, useNavigate } from 'react-router-dom'
import SelectSearch from '../../components/SelectSearch/SelectSearch'
import { getCountryList } from '../../api/coutry'
import MediaContext from '../../context/MediaContext'
import { DESKTOP } from '../../constants/MediaTypeConstants'
import { showToast } from '../../utils/toastUtils'
import Logo from '../../components/Logo/Logo'

const CreatePortal = () => {
    const { deviceType } = useContext(MediaContext)
    const logoInputRef = useRef()
    const navigate = useNavigate()
    const [createPortalLoading, setCreatePortalLoading] = useState(false)
    const [company, setCompany] = useState({
        name: null,
        description: null,
        creationDate: null,
        numero: null,
        email: null,
        webSite: null,
        companySize: null,
        companyType: null,
        adress: null,
        country: null,
        domains: [],
        nifStat: null,
        companyLogo: null,

    })



    const handleChangeInput = (e) => {
        setCompany(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleLogoInput = () => {
        logoInputRef.current?.click()
    }

    const createPortal = () => {
        setCreatePortalLoading(true)
        const toSend = {
            ...company,
            country: company.country?.value,
            domains: company.domains.map(d => d?.value)
        }
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

        axios({
            url: `${process.env.REACT_APP_API_DOMAIN}/companies`,
            method: "post",
            data,
            withCredentials: true
        }).then((res) => {
            setCreatePortalLoading(false)
            navigate(`/portail/${res.data.id}`)
            showToast({ content: <span>Votre portail a été crée avec succès</span> })
        }).catch((err) => {
            setCreatePortalLoading(false)
            console.log(err.response, 'COMPERR')
        })


    }

    const { data: companySizes, error: companySizesError } = useQuery({
        queryKey: ['repoCompanySizes'],
        queryFn: getCompanySizes
    })
    const { data: companyTypes, error: companyTypesError } = useQuery({
        queryKey: ['repoCompanyTypes'],
        queryFn: getCompanyTypes
    })

    useEffect(() => {
        (companySizes && companyTypes) && setCompany(prev => ({ ...prev, companySize: `/company_sizes/${companySizes[0]?.id}`, companyType: `/company_types/${companyTypes[0]?.id}` }))
    }, [companySizes, companyTypes])



    return (
        <div className='create-portal'>
            <main>
                <div className="content">
                    <div className="top flex gap-15">
                        <div className="head flex align-items-center gap-10">
                            <div className="ico">
                                <PlusLg size={18} />
                            </div>
                            <h4>Nouveau portail</h4>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <div className="create-portal-form">
                                <div className="body">
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Logo</label>
                                        </div>
                                        <div className="right flex gap-15">
                                            <div className="logo-placeholder">
                                                {
                                                    company.companyLogo &&
                                                    <img src={URL.createObjectURL(company.companyLogo)} />
                                                }
                                            </div>
                                            <div>
                                                <input type="file" ref={logoInputRef} onChange={(e) => {
                                                    setCompany(prev => ({ ...prev, companyLogo: e.target.files[0] }))
                                                }} style={{ display: "none" }} />
                                                <span className="purple-txt pointer" role="button" onClick={handleLogoInput}>Importer un logo</span>
                                                <br />
                                                <span className='rem-logo pointer' onClick={() => setCompany(prev => ({ ...prev, companyLogo: null }))}>Supprimer</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Nom de l'entreprise</label>
                                        </div>
                                        <div className="right">
                                            <input type="text" className="inpt" name='name' onChange={handleChangeInput} placeholder="Nom de l'entreprise" />
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Déscription</label>
                                        </div>
                                        <div className="right">
                                            <TextEditor onChange={({ text, html, bbcode }) => {
                                                setCompany(prev => ({ ...prev, description: html }))
                                            }} />
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Domaines</label>
                                        </div>
                                        <div className="right">
                                            <MultiSelectSearch
                                                onChange={(domains) => { setCompany(prev => ({ ...prev, domains })) }}
                                                placeholder='Choisir un domaine'
                                                searchPlaceholder='Rechercher un domaine'
                                                query={getDomains}
                                                repoName="domainsListRepo"
                                                objectMapping={(d) => ({ title: d.title, value: `/domains/${d.id}` })} />

                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Adresse</label>
                                        </div>
                                        <div className="right">
                                            <input type="text" className="inpt" name='adress' onChange={handleChangeInput} placeholder="Adresse de l'entreprise" />
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Pays</label>
                                        </div>
                                        <div className="right">
                                            <SelectSearch
                                                searchFields={['name']}
                                                onChange={(country) => { setCompany(prev => ({ ...prev, country })) }}
                                                placeholder='Selectionner un pays'
                                                searchPlaceholder='Rechercher un pays'
                                                query={(filters) => getCountryList({ filters })}
                                                repoName="coutryListRepo"
                                                toPlaceholder={(elem) => elem.name}
                                                objectMapping={(p) => ({ ...p, value: `/pays/${p.id}` })}
                                                mapping={(p) => <Link>
                                                    <img src={p.flag.fileUrl} width={25} alt="" />
                                                    <span>{p.name}</span>
                                                </Link>}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Date de creation</label>
                                        </div>
                                        <div className="right">
                                            <input type="date" className="inpt" name='creationDate' onChange={handleChangeInput} placeholder="Date de création" />
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Adresse email</label>
                                        </div>
                                        <div className="right">
                                            <input type="text" className="inpt" name='email' onChange={handleChangeInput} placeholder="Adresse email" />
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Site web</label>
                                        </div>
                                        <div className="right">
                                            <input type="text" className="inpt" name="webSite" onChange={handleChangeInput} placeholder="Site web de votre entreprise" />
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Numéro telephone</label>
                                        </div>
                                        <div className="right">
                                            <input type="number" className="inpt" name='numero' onChange={handleChangeInput} placeholder="Numéro telephone" />
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">NIF</label>
                                        </div>
                                        <div className="right">
                                            <input type="text" className="inpt" name='nifStat' onChange={handleChangeInput} placeholder="Numéro d'identité fiscale" />
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Taille de l'entreprise</label>
                                        </div>
                                        <div className="right">
                                            <select name="companySize" id="" onChange={handleChangeInput} className="inpt">
                                                {
                                                    companySizes?.map((cs, i) => <option value={`/company_sizes/${cs.id}`} key={i}>{cs.size}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group flex gap-10">
                                        <div className="left">
                                            <label htmlFor="">Type d'etreprise</label>
                                        </div>
                                        <div className="right">
                                            <select name="companyType" id="" onChange={handleChangeInput} className="inpt">
                                                {
                                                    companyTypes?.map((ct, i) => <option value={`/company_types/${ct.id}`} key={i}>{ct.type}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer flex justify-content-end align-items-center gap-10">
                                    <button className="btn btn-purple" onClick={createPortal}>
                                        {
                                            !createPortalLoading ? "Creer mon portail" : <ColorRing
                                                visible={true}
                                                height="25"
                                                width="25"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="blocks-wrapper"
                                                colors={['#ffffff', '#ffffffcf', '#ffffffab', '#ffffff78', '#ffffff4d']}
                                            />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            deviceType === DESKTOP &&
                            <div className="right">
                                <div className="portal-preview">
                                    <div className='portal-page'>
                                        <div className="top">
                                            <div className="left">
                                                <h5 className='mb-15'>Aperçu du portail</h5>
                                                <div className="banner"></div>
                                                <div className="portal-info">
                                                    <div className="top flex align-items-end gap-10">
                                                        <Logo online={false} src={company?.companyLogo ? URL.createObjectURL(company?.companyLogo) : null} height={60} width={60} />
                                                        <img src={company?.country?.flag?.fileUrl} width={35} alt="" />
                                                    </div>
                                                    <div className="bottom flex justify-content-between">
                                                        <div className="left">
                                                            <div className="flex align-items-center gap-10">
                                                                <h1>{company?.name}</h1>
                                                                {
                                                                    company.adress &&
                                                                    <span className='flex align-items-center'><GeoAlt /> {company?.adress}</span>
                                                                }
                                                            </div>
                                                            {/* <div className="evaluation flex align-items-center gap-5">
                                                                <div className="moy">4.5</div>
                                                                <Rating
                                                                    readonly
                                                                    initialRating={3.5}
                                                                    className='portal-note'
                                                                    fractions={2}
                                                                    emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
                                                                    fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
                                                                />
                                                                <span className='orange-txt flex align-items-center gap-5'>500K evaluations <ChevronDown /></span>
                                                            </div> */}
                                                            <span className='portal-domains'>{
                                                                company?.domains?.map((d) => d?.title).join(',')
                                                            }</span>
                                                        </div>
                                                        {/* <div className="right">
                                                            <button className="btn btn-purple" onClick={createPortal}>Prise de contact</button>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreatePortal
