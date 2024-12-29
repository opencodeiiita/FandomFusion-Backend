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

export const formatAnimeListResponse = (response, userEntry) => {
    return {
        publicDbId: response.mal_id,
        imageUrl: response.images.jpg.large_image_url,
        title_english: response.title_english,
        title_japanese: response.title_japanese,
        episodes: response.episodes,
        status: response.status,
        score: response.score,
        synopsis: response.synopsis,
        rated: response.rating,
        season: response.season,
        year: response.year,
        type: 'anime',
        userStatus: userEntry.status, // Added user-defined status
        userRating: userEntry.rating, // Added user-defined rating
    };
};

// utils/responseFormatter.js

export const formatGameSearchResponse = (data) => {
    return data.map((game) => ({
      publicDbId: game.id,
      title: game.name,
      releasedDate: game.released,
      imgUrl: game.background_image,
      score: game.rating,
      genre: game.genres.map(genre => genre.name),
      platforms: game.platforms.map(platform => platform.name)
    }));
  };
  
