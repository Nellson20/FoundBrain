import React, { useContext, useState } from 'react'
import './Funding.scss'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { ListTask, UiRadiosGrid } from 'react-bootstrap-icons'
import StickySideBar from '../../components/StickySideBar/StickySideBar'
import { DESKTOP } from '../../constants/MediaTypeConstants'
import MediaContext from '../../context/MediaContext'
import CheckBox from "../../components/CheckBox/CheckBox"
import { useQuery } from '@tanstack/react-query'
import { getInvests } from '../../api/invest'
import FundingCard from '../../components/FundingCard/FundingCard'
import { getCompanySizes, getCompanyTypes } from '../../api/company'
import SortableList from '../../components/SortableList/SortableList'
import { useEffect } from 'react'
import { filtersToURL } from '../../functions'
import { getDomains, searchDomains } from '../../api/domain'
import AfricaMap from '../../components/AfricaMap/AfricaMap'
const Funding = () => {
  const { deviceType } = useContext(MediaContext)
  const position = [-8.783195, 34.508523]

  const [filters, setFilters] = useState({
    pays: '',
    companyTypeTitles: [],
    companySizes: [],
    budget: null,
    currency: null
  })



  useEffect(() => {
    console.log(filtersToURL(filters), 'FILTER');
  }, [filters])

  const removeRow = (array, value) => {
    const newRows = array.slice()
    return newRows.filter((r) => r !== value)
  }
  const addRow = (array, newRow) => {
    return [...array, newRow]
  }
  const handleChange = (e) => {
    if (Array.isArray(filters[e.target.name])) {
      if (!e.target.checked) {
        setFilters(prev => ({ ...prev, [e.target.name]: removeRow([...filters[e.target.name]], e.target.value) }))
      } else {
        setFilters(prev => ({ ...prev, [e.target.name]: addRow([...filters[e.target.name]], e.target.value) }))
      }
    } else {
      setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }


  const {
    isLoading: investsLoading,
    error: getInvestError,
    data: invests,
    refetch: refetchInvests
  } = useQuery({
    queryKey: ['repoInvests'],
    queryFn: () => getInvests({ filters: filtersToURL(filters), ipp: 10 })
  })

  useEffect(() => {
    refetchInvests()
  }, [filters])

  return (
    <div id='funding-page' className='flex' style={{ flexDirection: deviceType === DESKTOP ? 'row' : "column" }}>
      {
        deviceType === DESKTOP ?
          <div className="left p-15">
            <StickySideBar top={73}>
              <h2>Investissements</h2>
              <small>Trouvez de potentiels investissements en Afrique</small>
              <div className="form-group">
                <SortableList allowSearch={true} query={(keyword) => searchDomains(keyword)} mapping={(d) => <><CheckBox id={d.title} value={d.title} name='companyDomains' onChange={(e) => { handleChange(e) }} /> <label htmlFor={d.title}>{d.title}</label></>} repoName='repoDomains' title={<label htmlFor="">Domaines</label>} />
              </div>

              <div className="form-group">


                <SortableList allowSearch={true} query={(keyword) => getCompanyTypes(keyword)} mapping={(ct) => <><CheckBox id={ct.type} value={ct.type} name='companyTypeTitles' onChange={(e) => { handleChange(e) }} /> <label htmlFor={ct.type}>{ct.type}</label></>} repoName='repoCompTypes' title={<label htmlFor="">Type d'entreprise</label>} />

              </div>
              <div className="form-group">


                <SortableList allowSearch={false} query={() => getCompanySizes()} mapping={(cs) => <><CheckBox id={cs.Size} value={cs.id} name='companySizes' onChange={(e) => { handleChange(e) }} /> <label htmlFor={cs.Size}>{cs.Size}</label></>} repoName='repoCompSizes' title={<label htmlFor="">Taille d'entreprise</label>} />

              </div>
              <div className="form-group">
                <label htmlFor="">Budget</label>
                <input type="text" className="inpt" placeholder='Mon budget' />
              </div>
            </StickySideBar>

          </div> : ""
      }
      <div className="center flex-grow-1">
        <div className="top flex align-items-center justify-content-between px-15 gap-10">
          <select name="order-inpt" id="" className="inpt">
            <option value="">Date</option>
            <option value="">Domaine</option>
            <option value="">Pays</option>
            <option value="">Chiffres</option>
          </select>
          <div className="layout-btns flex align-items-center gap-5">
            <button className='btn-outline-light'>
              <ListTask />
            </button>
            <button className='btn-outline-light'>
              <UiRadiosGrid />
            </button>
          </div>
        </div>
        <div className="funding-list p-5">

          {
            invests?.map((i, index) => <FundingCard key={index} data={i} />)
          }
        </div>
      </div>
      <div id="funding-map">
        <AfricaMap />
        {/* <MapContainer center={position} zoom={4} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
    </Marker>
        </MapContainer> */}
      </div>
    </div>
  )
}

export default Funding
