import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Movie from './Movie'
import LoadingSpinner from '../../Components/loadingSpinner'
import Modal from '../../Components/Modal'

import { getMovies, clearMovies } from './moviesSlice'

import style from './movies.module.scss'


const Movies = () => {
  const { moviesList, loading, error, totalResult } = useSelector(state => state.movies)
  const dispatch = useDispatch()

  const [title, setTitle] = useState()
  const [page, setPage] = useState(1)

  const [picture, setPicture] = useState()
  const [pictureModal, setPictureModal] = useState(false)

  const observer = useRef(
    new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 0.75 }
    )
  )

  const [element, setElement] = useState(null);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }

  }, [element])

  useEffect(() => {
    if (moviesList.length <= totalResult && title) {
      dispatch(getMovies({ title, page }))
    }
  }, [page])

  // const search = {
  //   title: "Batman",
  //   page: "1"
  // }

  const onChange = (e) => {
    setTitle(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(clearMovies())
    setPage(1)
    dispatch(getMovies({ title, page }))
  }

  return (
    <div className={style.container}>
      <section className={style.sectionHeader}>
        <form onSubmit={onSubmit}>
          <input type="text" name="title" className={style.searchMovie} onChange={onChange} placeholder="Search Your Movie" data-testid="name" />
        </form>
      </section>
      <section className={style.moviesContainer}>
        {
          moviesList && moviesList.length > 0 &&
          moviesList.map((item) => (
            <Movie key={item.imdbID} item={item} openPicture={setPictureModal} setPicture={setPicture} />
          ))
        }

        {loading.getMovies &&
          <div className={style.loadingContainer}>
            <LoadingSpinner />
          </div>
        }

      </section>
      {
        !loading.getMovies && moviesList.length != totalResult &&
        <div ref={setElement} style={{ height: "30px", width: "100%" }}>&nbsp;</div>
      }

      <Modal open={pictureModal} >
        <div className={style.pictureContainer}>
          <div className={style.closeButton} onClick={() => {
            setPicture()
            setPictureModal(false)
          }}>x</div>
          <img src={picture} alt="movie poster" />
        </div>
      </Modal>

    </div>
  )
}

export default Movies
