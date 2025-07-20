import React from 'react'
import './EditArtistProfile.scss'
import Tabs from '../../components/Tabs/Tabs'
import Tab from '../../components/Tabs/Tab'
import ChipsCheckbox from '../../components/ChipsCheckbox/ChipsCheckbox'
import MultiLinkInputs from '../../components/Input/MultiLinkInputs'
import SocialMediaInput from '../../components/Input/SocialMediaInput'
import MultiSocialMediasInputs from '../../components/Input/MultiSocialMediaInputs'
import TagsInput from '../../components/Input/TagsInput'
import NavigableList from '../../components/Input/NavigableList/NavigableList'
import { Link } from 'react-router-dom'

const EditArtistProfile = () => {
    
    return (
        <div id="edit-artist-profile">
            <div className="top p-15">
                <h2>Personnaliser votre compte Artiste</h2>
            </div>
            <div className="bottom">
                <form action="" onSubmit={(e)=>e.preventDefault()}>
                    <Tabs navRight={(
                        <div className="flex gap-10 justify-content-end align-items-center">
                            <button type='button' className="btn-transparent">Annuler</button>
                            <button className="btn-purple">Enregistrer</button>
                        </div>
                    )} multipage={true} className="artist-edit-tabs">
                        <Tab path="informations-generales" title={'Informations générales'}>


                            <div className="form-group">
                                <label htmlFor="">Nom d'artiste ou nom de groupe</label>
                                <input type="text" className="inpt" placeholder="Entrez votre nom d'artiste ici" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Biographie</label>
                                <small>Veillez ajouter une biographie pour que les fans et managers puissent en savoir plus sur vous et votre histoire.</small>
                                <div className='mt-10'>
                                    <textarea className='inpt'></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Genre(s) musical(aux)</label>
                                <small>Dans quels genres de musique excelez-vous?</small>
                                <div className="mt-10">
                                    <TagsInput creatable={true} placeholder="Rechercher un genre" defaultState={[
                                        { title: "Salegy" },
                                        { title: "Bomba" },
                                        { title: "Tsapiky" },
                                        { title: "Kilalaka" },
                                        { title: "Maloya" },
                                        { title: "Kabosy" },
                                        { title: "Antsa" },
                                        { title: "Hira gasy" },
                                        { title: "Jazz fusion malgache" }
                                    ]} />
                                </div>
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Liens videos</label>
                                <small>Vous avez déjà des videos en streaming sur d'autres plateformes ?<br />Ajoutez des liens pour accéder à ces videos</small>
                                <div className="mt-10">
                                    <MultiLinkInputs />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Réseaux sociaux</label>
                                <small>Ajoutez des liens pour guider vos fans et vos potentiels collaborateurs vers vos réseaux sociaux</small>
                                <div className="mt-10">
                                    <MultiSocialMediasInputs onChange={() => { }} />
                                </div>
                            </div>

                        </Tab>
                        <Tab path="identite-visuelle" title={'Identité visuelle'}>
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="">Nom d'artiste ou nom de groupe</label>
                                    <input type="text" className="inpt" placeholder="Entrez votre nom d'artiste ici" />
                                </div>
                                <div className="form-group">
                                    <div>
                                        <label htmlFor="">Biographie</label>
                                        <small>Veillez ajouter une biographie pour que les fans et managers puissent en savoir plus sur vous et votre histoire.</small>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Genre(s) musical(aux)</label>
                                    <small>Dans quels genres de musique excelez-vous?</small>
                                    <div className="flex flex-wrap gap-10">
                                        <ChipsCheckbox>Salegy</ChipsCheckbox>
                                        <ChipsCheckbox>Bomba</ChipsCheckbox>
                                        <ChipsCheckbox>Tsapiky</ChipsCheckbox>
                                        <ChipsCheckbox>kilalaka</ChipsCheckbox>
                                        <ChipsCheckbox>Maloya</ChipsCheckbox>
                                        <ChipsCheckbox>Kabosy</ChipsCheckbox>
                                        <ChipsCheckbox>Antsa</ChipsCheckbox>
                                        <ChipsCheckbox>Hira gasy</ChipsCheckbox>
                                        <ChipsCheckbox>Jazz fusion malgache</ChipsCheckbox>
                                        <ChipsCheckbox>Régionalités modernes</ChipsCheckbox>
                                    </div>
                                </div>

                            </form>
                        </Tab>
                    </Tabs>
                </form>
            </div>
        </div>
    )
}

export default EditArtistProfile
