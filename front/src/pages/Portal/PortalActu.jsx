import React, { useState, useEffect } from 'react'
import PostCard from '../../components/PostCard/PostCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PostCardSkeleton from '../../components/PostCard/PostCardSkeleton'
import { filtersToURL } from '../../functions'
import { useInfiniteQuery } from '@tanstack/react-query'
import PostModal from '../../components/PostModal/PostModal'

const PageActu = () => {
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
    isFetching: postsListFetching,
    isFetchingNextPage: postsListFetchingNextPage,
    status: postsLoadingStatus,
    refetch,
    refetchPage
  } = useInfiniteQuery({
    queryKey: ['posts', portalId],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage
  })
  return (
    <div className='actu-page flex flex-column align-items-center'>
      <div className="post-list" style={{ maxWidth: 700, marginTop: 15 }}>

        {
          (postsListFetching && !postsListFetchingNextPage) ? (
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : postsList?.pages?.length > 0 ?



            postsList?.pages?.map((group, i) => (

              group.data.map((p,i) => (
                <PostCard
                  key={i}
                  data={p}
                  onDelete={(postId) => { }}
                />
              ))

            ))



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
  )
}

export default PageActu
