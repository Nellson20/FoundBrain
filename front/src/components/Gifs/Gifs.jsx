import React, { useEffect } from 'react'
import './Gifs.scss'

import { GiphyFetch } from '@giphy/js-fetch-api'
import axios from 'axios'
import Searchbar from '../Searchbar/Searchbar'
import { useQuery } from '@tanstack/react-query'
import Skeleton from '../Skeleton/Skeleton'
import { getRandomNumber } from '../../functions'

const Gifs = () => {

    const getEmojis = () => {
        return axios({
            url: `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_KEY}&limit=25&offset=0`,
            method: 'get'
        }).then((res) => res.data)
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['gifs'],
        queryFn: getEmojis
    })


    useEffect(() => {
        console.log(data, 'DATATA')
    }, [data])

    return (
        <div className='gifs'>
            <div className="top">
                <Searchbar placeholder='Rechercher des gifs' />
            </div>
            <div class="masonry">
                {
                    isLoading ? [...new Array(20)].map(() => <div class="brick"><Skeleton width="100%" height={getRandomNumber(90, 200)} radius={5} /></div>) :
                        data?.data.map((gif, i) => (
                            <div key={i} class="brick">
                                <img src={gif.images.fixed_height.url} />
                            </div>
                        ))
                }

                {/* <div class="brick">
                    <img src="https://image.freepik.com/foto-gratuito/trama-di-pittura-ad-olio-viola_53876-94002.jpg" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1558980394-dbb977039a2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1556228841-a3c527ebefe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1524&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560164365-0811bf2ee413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560178783-7d75fc1261e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3834&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560091410-7175d14a48f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560082847-0fe9da933ef4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560087219-ce9ab9604990?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1576&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560100261-226dff8daa82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560145836-d22431066353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2300&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560151599-d33f5ffc5fdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560097282-32eef95738b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1531&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560121161-4712d6f6cafc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560150063-7fc89bd73bd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560138040-a430c9552273?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1520&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1549291536-e425d96af374?ixlib=rb-1.2.1&auto=format&fit=crop&w=3067&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1553367998-6ea7e682d40c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560139517-d689341179a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3451&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560033311-b9b5cf8cbaa8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1924&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560053260-ad5b8f3170f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1560044267-be94615b8d5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1559989960-106e6cd6273e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3500&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1559924508-1461423083c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3067&q=80" />
                </div>
                <div class="brick">
                    <img src="https://images.unsplash.com/photo-1559861796-cc4eb7e3cf01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1901&q=80" />
                </div> */}
            </div>
        </div>
    )
}

export default Gifs
