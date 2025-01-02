import { formatAnimeResponse, formatGameSearchResponse ,formatTopAnimeResponse} from "../utils/responseFormatters.js";
import axios from "axios";

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
    const response = await axios.get(`${process.env.JIKAN_URL}`, {
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
