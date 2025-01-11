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
  

  export const formatTopAnimeResponse = (animeList) => {
    return animeList.map((anime) => ({
      publicDbId: anime.mal_id,
      imageUrl: anime.images?.jpg?.large_image_url || '',
      titleEnglish: anime.title_english || anime.title,
      titleJapanese: anime.title_japanese || '',
      episodes: anime.episodes || 'Unknown',
      status: anime.status || 'Unknown',
      score: anime.score || 'N/A',
      synopsis: anime.synopsis || 'No synopsis available.',
      rated: anime.rating || 'Unrated',
      season: anime.season || 'Unknown',
      year: anime.year || 'Unknown',
      type: 'anime',
      rank: anime.rank || 'Unranked',
    }));
  };

  export const formatGameDetailsResponse = (data) => {
    return {
      publicDbId: data.id,
      title: data.name,
      releasedDate: data.released,
      imgUrl: data.background_image,
      score: data.rating,
      genre: data.genres.map((genre) => genre.name),
      platform: data.platforms.map((platform) => platform.platform.name),
      description: data.description_raw,
      rated: data.esrb_rating?.name || 'Not Rated',
    };
  };


  export const formatGameListResponse = (rawgData, status, rating) => {
    return {
      publicDbId: rawgData.id,
      title: rawgData.name,
      releasedDate: rawgData.released,
      imgUrl: rawgData.background_image,
      score: rawgData.rating,
      genre: rawgData.genres.map((genre) => genre.name),
      platform: rawgData.platforms.map((platform) => platform.platform.name),
      description: rawgData.description_raw,
      rated: rawgData.esrb_rating?.name || 'Not Rated',
      status, 
      rating,
    };
  };
  
  
  
