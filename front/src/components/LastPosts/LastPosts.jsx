import React from 'react'
import './LastPosts.css'
import PostCard from '../PostCard/PostCard'
import Slider from 'react-slick'
import { ChevronLeft, ChevronRight, ArrowRight } from 'react-bootstrap-icons'
const LastPosts = () => {
  return (
    <div className='last-posts'>
      <div className="heading2 flex justify-content-between">
        <h3>Dernieres publications</h3>
        <div className="flex gap-10 px-15">
          <button className="floating-btn"><ChevronLeft size={18} /></button>
          <button className="floating-btn"><ChevronRight size={18} /></button>
        </div>
      </div>
      <Slider {...{
        dots: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
      }}>
        <PostCard noComment={true} />
        <PostCard noComment={true} />
        <PostCard noComment={true} />
        <PostCard noComment={true} />
        <PostCard noComment={true} />
        <PostCard noComment={true} />
        <PostCard noComment={true} />
        <PostCard noComment={true} />
        <PostCard noComment={true} />
      </Slider>
      <div className="flex mt-15 gap-10">
        <button className="btn-outline-purple">
          Voir tout <ArrowRight />
        </button>
      </div>
    </div>
  )
}

export default LastPosts
