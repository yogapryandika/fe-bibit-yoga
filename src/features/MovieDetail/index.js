import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getDetail } from '../Movies/moviesSlice'
import LoadingSpinner from '../../Components/loadingSpinner'

import style from './movieDetail.module.scss'

const MovieDetail = () => {
  const { loading, movieDetail } = useSelector(state => state.movies)
  const dispatch = useDispatch()
  const { id } = useParams()

  const {
    Title,
    Poster,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Ratings
  } = movieDetail

  useEffect(() => {
    dispatch(getDetail(id))
  }, [])

  return (
    <div className={style.detailContainer}>
      {
        !loading.getDetail ?
          <div>
            <div className={style.headerDetail}>
              <img src={Poster} alt="" />
              <div className={style.textDetail}>
                <h1>{Title}</h1>
                <p className={style.year}>{Year}</p>

                <hr />

                <div className={style.ratings}>
                  {
                    Ratings && Ratings.map(item => (
                      <div className={style.ratingCard}>
                        <div className={style.score}>{item.Value}</div>
                        <div className={style.source}>{item.Source}</div>
                      </div>
                    ))
                  }
                </div>

                <div className={style.subDetail}>
                  <h4>Plot</h4>
                  <p>{Plot}</p>
                </div>
                <div className={style.subDetail}>
                  <h4>Rating</h4>
                  <p>{Rated}</p>
                </div>
                <div className={style.subDetail}>
                  <h4>Released Date</h4>
                  <p>{Released}</p>
                </div>
                <div className={style.subDetail}>
                  <h4>Run Time</h4>
                  <p>{Runtime}</p>
                </div>
                <div className={style.subDetail}>
                  <h4>Genre</h4>
                  <p>{Genre}</p>
                </div>
                <div className={style.subDetail}>
                  <h4>Director</h4>
                  <p>{Director}</p>
                </div>
                <div className={style.subDetail}>
                  <h4>Writer</h4>
                  <p>{Writer}</p>
                </div>
                <div className={style.subDetail}>
                  <h4>Actors</h4>
                  <p>{Actors}</p>
                </div>
              </div>



            </div>
          </div>
          :
          <LoadingSpinner />
      }
    </div>
  )
}

export default MovieDetail
