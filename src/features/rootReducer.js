import { combineReducers } from '@reduxjs/toolkit'
import moviesReducer from './Movies/moviesSlice'

const rootReducers = {
  movies: moviesReducer,
}

export default combineReducers(rootReducers);
