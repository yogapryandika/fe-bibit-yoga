import React from 'react'
import { Link } from 'react-router-dom'

import style from './movie.module.scss'

const Movie = ({ item, openPicture, setPicture }) => {
  const { Title, Year, Type, Poster, imdbID } = item

  const getType = () => {
    switch (Type) {
      case "movie":
        return style.movie;
      case "series":
        return style.series;
      default:
        return style.other;
    }
  }

  return (
    <div className={style.itemContainer} data-testid="content">
      <div className={style.cardItem}>
        <div className={style.itemWrapper}>
          {
            Poster !== "N/A" ?
              <img src={Poster} alt="poster movie" onClick={() => {
                openPicture(true);
                setPicture(Poster);
              }} />
              :
              <img src="/assets/no_image.png" alt="no poster" />
          }
          <Link to={`/${imdbID}`} style={{ textDecoration: "none", color: "#6e6e6e" }}>
            <div className={style.content}>
              <h1>{Title}</h1>
              <p className={style.year}>{Year}</p>
            </div>
          </Link>

          <div className={`${style.type} ${getType()}`}>{Type}</div>
        </div>
      </div>
    </div>
  )
}

export default Movie
