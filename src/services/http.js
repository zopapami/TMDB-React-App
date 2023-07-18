import axios from "axios";

// get all genres
const getGenres = () => {
  return axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?language=el-GR",
    {
      headers: {
        Authorization: process.env.REACT_APP_BEARER,
        Accept: "application/json",
      },
    }
  );
};

// get all movies by genre
const getMoviesByGenre = (page, id) => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=el-GR&page=${page}&sort_by=popularity.desc&with_genres=${id}`,
    {
      headers: {
        Authorization: process.env.REACT_APP_BEARER,
        Accept: "application/json",
      },
    }
  );
};

// get details of a movie
const getMovieDetails = (id) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=el-GR`,
    {
      headers: {
        Authorization: process.env.REACT_APP_BEARER,
        Accept: "application/json",
      },
    }
  );
};

const HTTPService = {
  getGenres,
  getMoviesByGenre,
  getMovieDetails,
};

export default HTTPService;
