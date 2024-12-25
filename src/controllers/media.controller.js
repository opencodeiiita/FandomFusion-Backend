import { formatAnimeResponse } from "../utils/responseFormatters.js";

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