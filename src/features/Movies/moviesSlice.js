import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moviesService from '../../services/moviesServices'

const initialState = {
  moviesList: [],
  movieDetail: {},
  loading: {
    getMovies: false,
    getDetail: false,
  },
  error: null,
  totalResult: 0,
}

export const getMovies = createAsyncThunk('movies/getMovies', async ({ title, page }, { rejectWithValue }) => {
  try {
    const movies = await moviesService.get(title, page)
    return movies.data
  } catch (e) {
    console.error(e)
    rejectWithValue(e)
  }
})

export const getDetail = createAsyncThunk('movies/getDetail', async (id, { rejectWithValue }) => {
  try {
    const detail = await moviesService.getDetail(id)
    return detail.data
  } catch (e) {
    console.error(e)
    rejectWithValue(e)
  }
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies(state) {
      state.moviesList = []
    },
    clearDetail(state) {
      state.movieDetail = {}
    }
  },
  extraReducers: builder => {
    // GET MOVIES
    builder.addCase(getMovies.pending, (state) => {
      state.loading.getMovies = true;
      state.error = undefined;
    });
    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.moviesList = [...state.moviesList, ...payload.Search]
      state.totalResult = payload.totalResults
      state.loading.getMovies = false;
      state.error = undefined;
    })
    builder.addCase(getMovies.rejected, (state, { payload }) => {
      state.loading.getMovies = false;
      state.error = payload;
    })

    // GET MOVIES DETAIL
    builder.addCase(getDetail.pending, (state) => {
      state.loading.getDetail = true;
      state.error = undefined;
    })
    builder.addCase(getDetail.fulfilled, (state, { payload }) => {
      state.movieDetail = payload;
      state.loading.getDetail = false;
      state.error = undefined;
    })
    builder.addCase(getDetail.rejected, (state, { payload }) => {
      state.loading.getDetail = false;
      state.error = payload
    })
  }
})

export const { clearMovies, clearDetail } = moviesSlice.actions

export default moviesSlice.reducer;
