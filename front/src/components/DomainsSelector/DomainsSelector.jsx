import React, { useState, useEffect } from 'react'
import './DomainsSelector.scss'
import { PlusLg, X, XLg } from 'react-bootstrap-icons'
import Modal from '../Modal/Modal'
import Searchbar from '../Searchbar/Searchbar'
import { getDomains, getUserDomains } from '../../api/domain'
import { useQuery } from '@tanstack/react-query'
import SliderNav from '../SliderNav/SliderNav'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CircleLoader from '../CircleLoader/CircleLoader'
import ChipsCheckbox from '../ChipsCheckbox/ChipsCheckbox'
import { useTranslation } from 'react-i18next'
const DomainsSelector = ({ open, onClose }) => {
    const { t } = useTranslation()
    const { user } = useSelector(store => store.user)
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState([])
    const [onSave, setOnSave] = useState(false)

    const saveDomains = () => {
        if (selected.length > 0) {
            setOnSave(true)
            axios({
                url: `${process.env.REACT_APP_API_DOMAIN}/users/${user.id}`,
                method: 'patch',
                data: { domains: selected.map((s) => `/domains/${s.id}`) },
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                },
                withCredentials: 'true'
            }).then((res) => {
                setOnSave(false)
                setIsOpen(false)
            }).catch((err) => {
                setOnSave(false)
                console.log(err.response)
            })
        }
    }

    useEffect(() => {
        setIsOpen(open)
    }, [open])

    const {
        status,
        fetchStatus,
        data: domains,
    } = useQuery({
        queryKey: ['repoDomainsList'],
        queryFn: () => getDomains()
    })

    const { data: userDomains, error: userDomainsErr, isLoading: userDomainsLoading } = useQuery({
        queryKey: ['repoUserDomains'],
        queryFn: () => getUserDomains(user.id),
        enabled: user ? true : false
    })

    useEffect(()=>{
        setSelected(userDomains)
    },[userDomains])



    return (
        <Modal open={isOpen} className="domains-selector-modal">
            <div>
                <div className="top">
                    <h1>{t('Domaines')}</h1>
                    <div className="close" onClick={() => {
                        onClose()
                        setIsOpen(false)
                    }}><XLg /></div>
                </div>
                <div className="body">
                    <p className='text-center'><span>Ajoutez vos domaines préférés pour être au courant des dernières actualités concernant ces domaines </span>
                        <small>&bull; Par défaut <strong>GateAfri</strong> vous suggère les domaines les plus populaires</small></p>
                    <div className='searchbar-sticky'>
                        <Searchbar placeholder='Rechercher un domaine' />
                    </div>
                    {
                        domains &&
                        <ul className='flex gap-10 justify-content-center flex-wrap p-10'>
                            {
                                domains.map((d, i) =>
                                    <li key={i}>
                                        <ChipsCheckbox checked={selected?.find((item)=>item.id===d.id)} onChange={
                                            ({value,checked})=>{
                                                if(checked){
                                                    setSelected(prev => [...prev, d])
                                                }else{
                                                    setSelected((prev)=>prev.filter(item => item.id !== d.id))
                                                }
                                                
                                            }
                                        }>{t(`domain.${d.title}`) || d.title}</ChipsCheckbox>
                                    </li>)
                            }
                        </ul>
                    }
                </div>
                <div className="footer">
                    <div className='bottom flex justify-content-end gap-10'>
                        <button className="btn btn-transparent">{t('Annuler')}</button>
                        <button className="btn btn-purple" onClick={saveDomains}>{
                            !onSave ? t('Enregistrer') : <CircleLoader />
                        }</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DomainsSelector
