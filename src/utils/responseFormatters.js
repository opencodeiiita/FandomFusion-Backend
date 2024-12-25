export const formatAnimeResponse = (response) => {
    return response.map((data) => ({
        publicDbId: data.mal_id,
        imageUrl: data.images.jpg.large_image_url,
        title_english: data.title_english,
        title_japanese: data.title_japanese,
        episodes: data.episodes,
        status: data.status,
        score: data.score,
        synopsis: data.synopsis,
        rated: data.rating,
        season: data.season,
        year: data.year,
        type: 'anime',
    }));
};