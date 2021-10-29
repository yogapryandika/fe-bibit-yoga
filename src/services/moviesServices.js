import axios from "axios"

const moviesService = {
  baseUrl: `${process.env.REACT_APP_API_BASE_URL}?apikey=${process.env.REACT_APP_API_KEY}`,
  get: async function (title, page) {
    return (await axios.get(`${this.baseUrl}&s=${title}&page=${page}`))
  },
  getDetail: async function (id) {
    return (await axios.get(`${this.baseUrl}&i=${id}`))
  }
}

export default moviesService;
