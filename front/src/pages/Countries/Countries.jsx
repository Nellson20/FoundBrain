import React, { useContext } from 'react'
import millify from "millify";
import { ChevronRight, Gem, Search } from 'react-bootstrap-icons'
import './Countries.scss'
import MediaContext from '../../context/MediaContext';
import { Line, Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import { DESKTOP, SMARTPHONE } from '../../constants/MediaTypeConstants';
import { Link, useLocation } from 'react-router-dom';
import useInfiniteScroll from '../../Hooks/useInfiniteScroll';
import { useEffect } from 'react';
import CountryCardSkeleton from './CountryCardSkeleton';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement);


const Countries = () => {
    const { deviceType } = useContext(MediaContext)

    const { data: countriesList,
        flatData: countriesListFlat,
        error,
        hasNextPage: countriesListNextPage,
        isFetching: countriesListFetching,
        isFetchingNextPage: countriesListFetchingNextPage,
        status: countriesLoadingStatus,
        refetch,
        refetchPage
    } = useInfiniteScroll({
        url: `${process.env.REACT_APP_API_DOMAIN}/pays`,
        ipp: 10,
        queryKey: ['countries_read'],
        queryString: 'groups[]=country_list',
        transformResult: (result) => {
            return { data: result['hydra:member'], nextPage: result['hydra:view']['hydra:next'] ? parseInt(result['hydra:view']['hydra:next'].match(/page=(\d+)/)[0].split('=')[1]) : undefined }
        }
    })

    useEffect(() => {
        console.log(countriesListFlat, 'cOUNTRIES')
    }, [countriesList])

    return (
        <div id='countries-page'>
            <div className="top flex gap-15">
                <div className="explore-country flex align-items-end" style={{ height: 220 }}>
                    <div className="bg1"></div>
                    <div className="bg2"></div>

                    <div className="capt gap-10">
                        <h2>Decouvrez l'<font className='orange-txt'>Afrique</font> <br /><small>Un continent doté de diverses cultures</small></h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. porro eligendi natus a aut incidunt magni</p>
                        <div className="coutries-searchbar flex align-items-center gap-15">
                            <Search />
                            <input type="text" placeholder='Quel pays recherchez vous ?' />
                        </div>
                    </div>
                </div>
            </div>
            <main className='flex'>

                <div className="center flex flex-column flex-grow-1">

                    <div className="countries-list p-15">
                        {
                            countriesListFetching ?
                            [...new Array(6)].map((_,i)=><CountryCardSkeleton key={i}/>) :
                                countriesListFlat?.map((c, i) => (
                                    <div key={i} className="country-card">
                                        <div className="top d-flex">
                                            {
                                                c?.countryThumbnails[0] &&
                                                    <div className="left relative flex">
                                                        <img className='relative' src={c?.countryThumbnails[0]?.fileUrl} alt="image" loading="lazy" />
                                                    </div>
                                            }

                                            <div className="right">
                                            {
                                                c?.countryThumbnails[1] &&
                                                <div className='aspect-ratio-1 relative'>
                                                <img className='relative' src={c?.countryThumbnails[1]?.fileUrl} alt="image" loading="lazy" />

                                            </div>
                                            }
                                            {
                                                c?.countryThumbnails[2] &&
                                                <div className='aspect-ratio-1 relative'>
                                                    <img className='relative' src={c?.countryThumbnails[2]?.fileUrl} alt="image" loading="lazy" />

                                                </div>
                                            }
                                            
                                                
                                                
                                            </div>
                                        </div>
                                        <div className="capt">
                                            <div className="flex justify-content-between">
                                                <div className="flex align-items-center gap-10 mb-10">
                                                    <img src={c?.flag?.fileUrl} height={20} alt="" />
                                                    <span className='country'>{c?.name}</span>
                                                </div>
                                                <Gem size={19} />
                                            </div>
                                            <div className="flex gap-5 mb-5">
                                                <p className="pib"><small>USD</small> 4,4B</p>
                                                <p className="pnb"><small>USD</small> 1,6K</p>
                                                <p className="hab">25M</p>
                                            </div>
                                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab aliquid aliquam nulla amet optio</p>
                                            <div className="flex mt-10">
                                                <Link to={`pays/${c.id}`} className="btn-transparent flex-1">Explorer</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }




                        
                        
                        
                    </div>
                    <div className="countries-list-color-indicator flex align-items-center gap-10 px-15">
                        <div className="flex align-items-center gap-10">
                            <div className="clr purple"></div><span>PIB</span>
                        </div>
                        <div className="flex align-items-center gap-10">
                            <div className="clr orange"></div><span>PNB</span>
                        </div>
                        <div className="flex align-items-center gap-10">
                            <div className="clr red"></div><span>Nombre d'habitant</span>
                        </div>
                    </div>
                </div>
                {
                    deviceType === DESKTOP ?
                        <div className="right flex-1">
                            <div className="top-3-country p-15">
                                <h4>Top 3</h4>
                                <span>Des pays producteur du pétrole en <b>Afrique</b><br />En nombre de baril par jour</span>
                                <Bar

                                    plugins={
                                        [
                                            {
                                                id: "tooltipLine",
                                                beforeDatasetDraw: (chart, args, pluginOptions) => {
                                                    const { ctx, data, scales: { x, y } } = chart
                                                    const xAxis = x;
                                                    const yAxis = y;
                                                    let imgs = ['/img/flags/Flag_of_Angola.svg', '/img/flags/Flag_of_Botswana.svg', '/img/flags/Flag_of_Madagascar.svg']
                                                    ctx.save()
                                                    yAxis.ticks.forEach((tick, index) => {
                                                        const yPosition = yAxis.getPixelForTick(index) - 6;
                                                        const xOffset = 10;
                                                        var imageElement = new Image()
                                                        imageElement.src = imgs[index]
                                                        ctx.drawImage(imageElement, 0, y.getPixelForValue(index) - 8, 21, 14);
                                                    })
                                                },
                                            }
                                        ]
                                    }
                                    options={
                                        {
                                            layout: {
                                                padding: 25
                                            },

                                            indexAxis: 'y',
                                            scales: {
                                                x: {
                                                    ticks: {

                                                        callback: function (val, index) {
                                                            return millify(val)
                                                        },
                                                        color: 'black',
                                                    }
                                                }
                                            }

                                        }
                                    }

                                    data={{

                                        axis: 'x',
                                        labels: ['Nigeria', 'Lybie', 'Angola'],

                                        datasets: [{
                                            barPercentage: 0.5,
                                            barThickness: 6,
                                            maxBarThickness: 8,
                                            minBarLength: 2,
                                            axis: 'y',
                                            label: 'My First Dataset',
                                            data: [1270000, 1210000, 1100000],
                                            fill: false,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(255, 159, 64, 0.2)',
                                                'rgba(255, 205, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(201, 203, 207, 0.2)'
                                            ],
                                            borderColor: [
                                                'rgb(255, 99, 132)',
                                                'rgb(255, 159, 64)',
                                                'rgb(255, 205, 86)',
                                                'rgb(75, 192, 192)',
                                                'rgb(54, 162, 235)',
                                                'rgb(153, 102, 255)',
                                                'rgb(201, 203, 207)'
                                            ],
                                            borderWidth: 1,
                                        }],


                                    }}
                                />
                            </div>
                        </div> : ""
                }
            </main>
        </div>
    )
}

export default Countries
