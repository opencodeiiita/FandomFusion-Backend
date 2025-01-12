import { formatAnimeResponse, formatGameSearchResponse ,formatTopAnimeResponse,formatGameDetailsResponse,formatMovieResponse,formatMovieDetailsResponse} from "../utils/responseFormatters.js";
import axios from "axios";
import { MovieList } from '../models/list.model.js';


export const searchAnime = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter `q` is required' });
    }
    try {
        const response = await fetch(`${process.env.JIKAN_URL}/anime?q=${encodeURIComponent(query)}`);

        if (!response.ok) {
            if (response.status == 400) {
                return res.status(400).json({ error: 'Invalid or malformed query string.', details: response.json });
            } else {
                throw new Error(`Jikan API responded with status ${response.status}. Response: ${response.text}`);
            }
        }
        const data = await response.json();
        const animeData = data?.data;

        if (!animeData || animeData.length === 0) {
            return res.status(404).json({ error: 'No results found' });
        }

        const formattedData = formatAnimeResponse(animeData);

        return res.json({ data: formattedData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch data from Jikan API', details: error.message });
    }
};

// media.controller.js


export const searchGame = async (req, res, next) => {
  try {
    const searchQuery = req.query.search;
    const response = await axios.get(`${process.env.RAWG_URL}/games`, {
      params: {
        key: process.env.RAWG_KEY,
        search: searchQuery,
        page_size: 10 // You can adjust the page size as needed
      }
    });

    const formattedResponse = formatGameSearchResponse(response.data.results);
    res.status(200).json({
      status: 'success',
      data: formattedResponse
    });
  } catch (error) {
    if (error.response && error.response.data) {
      // RAWG API error or no results
      return res.status(error.response.status || 500).json({
        status: 'error',
        message: error.response.data.detail || 'Something went wrong!'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const topAnime = async (req, res) => {
  const page = req.query.page || 1;

  try {
    const response = await axios.get(`${process.env.JIKAN_URL}/top/anime`, {
      params: { page },
    });

    if (!response.data || !response.data.data) {
      return res.status(404).json({ message: 'No data found' });
    }

    const formattedData = formatTopAnimeResponse(response.data.data);

    res.status(200).json({ data: formattedData });
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message || 'API Error' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getGameDetails = async (req, res) => {
  const {id} = req.params;

  try {
    const response = await axios.get(`${process.env.RAWG_URL}/games/${id}?key=${process.env.RAWG_KEY}`);
    const formattedData = formatGameDetailsResponse(response.data);
    res.status(200).json({
      status: 'success',
      data: formattedData,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Invalid Id';
    res.status(400).json({
      status: 'error',
      message: errorMessage,
    });
  }
};



export const searchMovies = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        status: "error",
        message: "Search term is required",
      });
    }

    const tmdbResponse = await axios.get(`${process.env.TMDB_URL}/search/movie`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        Accept: 'application/json',
      },
      params: {
        query: search,
      },
    });

    const transformedMovies = tmdbResponse.data.results.map(movie => 
      formatMovieResponse(movie) 
    );

    res.status(200).json({
      status: "success",
      data: transformedMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch movies",
    });
  }
};





export const getMovieList = async (req, res) => {
  try {
    
    console.log('Fetching movie list for user:', req.user.id);

    const movieList = await MovieList.findOne({ user: req.user.id }).populate('movieEntries');

    if (!movieList || !movieList.movieEntries || movieList.movieEntries.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No movies found for this user',
      });
    }

   
    const movieDetailsPromises = movieList.movieEntries.map(movie =>
      axios.get(`${process.env.TMDB_URL}/movie/${movie.publicDbId}`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          Accept: 'application/json',
        },
      })
    );
  
    const movieDetailsResponses = await Promise.all(movieDetailsPromises);

    const mergedData = movieList.movieEntries.map((movie, index) => {
      const tmdbData = movieDetailsResponses[index].data;
      return formatMovieDetailsResponse(tmdbData, movie.status, movie.rating); 
    });

    
    res.status(200).json({
      status: 'success',
      data: mergedData,
    });
  } catch (error) {
    console.error('Error fetching movie list:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch movie list',
    });
  }
};







