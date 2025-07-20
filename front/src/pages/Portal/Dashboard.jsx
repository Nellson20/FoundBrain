import React, { useState } from 'react'
import './Dashboard.scss'
import { CaretDown, CaretDownFill, ChevronRight, EmojiHeartEyes, Eye, Gem, PencilSquare, PersonWorkspace, Plus, PlusLg } from 'react-bootstrap-icons'
import { Link, useParams } from 'react-router-dom'
import Accordion from '../../components/Accordion/Accordion'
import Slider from 'react-slick'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { filtersToURL } from '../../functions'
import PostCardSkeleton from '../../components/PostCard/PostCardSkeleton'
import PostCard from '../../components/PostCard/PostCard'
import PostModal from '../../components/PostModal/PostModal'


const Dashboard = () => {
  const { portalId } = useParams()
  const [filters, setFilters] = useState(null)
  const [openPostModal, setOpenPostModal] = useState(false)
  /**
     * Recuperation des posts
     */

  const fetchPosts = ({ pageParam = 1 }) => {
    return axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/authors/${portalId}/posts?ipp=5&page=${pageParam}${filters ? `& ${filtersToURL(filters)}` : ''}`,
      method: 'get',
      responseType: "json",
      headers: {
        'Accept': 'application/json+ld'
      },
      withCredentials: true
    }).then((res) => {
      console.log(res.data, 'JSONLD')
      return { data: res.data['hydra:member'], nextPage: res.data['hydra:view']['hydra:next'] ? parseInt(res.data['hydra:view']['hydra:next'].match(/page=(\d+)/)[0].split('=')[1]) : undefined }
    })
  }

  const {
    data: postsList,
    error,
    fetchNextPage,
    hasNextPage: postsListNextPage,
    isFetching:postsListFetching,
    isFetchingNextPage: postsListFetchingNextPage,
    status: postsLoadingStatus,
    refetch,
    refetchPage
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage
  })



  return (
    <div id='dashboard'>
      <div className="top">
        <h1>Bienvenue sur le tableau de bord de GateAfri</h1>
        <p>Acceder facilement et rapidement aux information et outils pour promouvoir vos activités</p>
      </div>
      <div className='body flex flex-column gap-10'>
        <div className="stats-preview flex-column gap-10">
          <div className="flex gap-15">
            <div className="portal-stats-card">
              <div className="top">
                <div className="ico">
                  <PersonWorkspace />
                </div>

              </div>
              <div className='left'>
                <span className='text-ellipsis'>Vos abonnées</span>
                <p>300K</p>
              </div>

            </div>
            <div className="portal-stats-card">
              <div className="top">
                <div className="ico">
                  <EmojiHeartEyes />
                </div>

              </div>
              <div className='left'>
                <span className='text-ellipsis'>Reactions sur publications</span>
                <p>300K</p>
              </div>

            </div>
            <div className="portal-stats-card">
              <div className="top">
                <div className="ico">
                  <Eye />
                </div>

              </div>
              <div className='left'>
                <span className='text-ellipsis'>Nombre de vue</span>
                <p>300K</p>
              </div>
            </div>
            <div className="portal-stats-card">
              <div className="top">
                <div className="ico">
                  <Gem />
                </div>

              </div>
              <div className='left'>
                <span className='text-ellipsis'>Evaluations et avis</span>
                <p>300K</p>
              </div>

            </div>
          </div>
          <span className='flex gap-5 align-items-center'>Ce mois ci <CaretDownFill /></span>
        </div>
        <div className="bottom flex gap-15">
          <div className="left">
            <div className="last-portal-posts">
              <div className="top flex justify-content-between">
                <h2>Dernieres publications</h2>
                <Link className="view-more flex gap-5 align-items-center">Voir Plus <ChevronRight /></Link>
              </div>
              <div className="posts-slider">
                {
                  (postsListFetching && postsListFetchingNextPage) ? (
                    <>
                      <PostCardSkeleton />
                      <PostCardSkeleton />
                    </>
                  ) : error ? (
                    <p>Error: {error.message}</p>
                  ) : postsList?.pages?.length > 0 ?


                    <Slider {...{
                      infinite: true,
                      speed: 500,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      autoplay: false,
                      arrows: false,
                      dots: false
                    }}>
                      {
                        postsList?.pages?.map((group, i) => (

                          group.data.map((p,i) => (
                            <div key={i} style={{ width: '100px !important', border: '1px solid red' }}>
                              <PostCard
                                key={i}
                                data={p}
                                onDelete={(postId) => { }}
                              />
                            </div>
                          ))

                        ))
                      }
                    </Slider>



                    : <div className="empty-timeline" onClick={() => setOpenPostModal(true)}>
                      <h1>Aucun post à afficher</h1>
                      <p>Nous vous invitons à créer un premier post pour commencer vos activités et intéragir avec d'autres opérateurs économiques en Afrique</p>
                      <button className="btn btn-gradient">Créer un post</button>
                    </div>
                }
                {postsListFetchingNextPage
                  ? <PostCardSkeleton />
                  : postsListNextPage
                    ? ''
                    : ''}
                <PostModal isOpen={openPostModal} setIsOpen={setOpenPostModal} />
              </div>

            </div>
          </div>
          <div className="right">
            <div className="questions-responses">
              <div className="top">
                <h3>Configurer des questions/réponses ?</h3>
                <p>Les questions/réponses préconfiguré aide les visiteurs de votre portail à vous connaitre un peu mieux</p>
              </div>
              <div className="questions-list">
                <Accordion>
                  <div className="question-title">
                    <h4>Qui sommes nous ?</h4>
                  </div>
                  <div className="question-answer">
                    <textarea name="" id="" cols="30" rows="10" className="inpt"></textarea>
                  </div>
                </Accordion>
                <Accordion>
                  <div className="question-title">
                    <h4>Quelle est notre mission ?</h4>
                  </div>
                  <div className="question-answer">
                    <textarea name="" id="" cols="30" rows="10" className="inpt"></textarea>
                  </div>
                </Accordion>
                <Accordion>
                  <div className="question-title">
                    <h4>Quelles sont nos principales activités ?</h4>
                  </div>
                  <div className="question-answer">
                    <textarea name="" id="" cols="30" rows="10" className="inpt"></textarea>
                  </div>
                </Accordion>
                <Accordion>
                  <div className="question-title">
                    <h4>Quels sont nos défis actuels et futurs ?</h4>
                  </div>
                  <div className="question-answer">
                    <textarea name="" id="" cols="30" rows="10" className="inpt"></textarea>
                  </div>
                </Accordion>
                <div className="flex gap-10">
                  <button className='btn btn-purple'><PencilSquare /> <span>Enregistrer</span></button>
                  <button className="btn btn-transparent">
                    <PlusLg />
                    <span>Nouveau</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
