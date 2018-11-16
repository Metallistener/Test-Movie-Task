export const load_popular_movies = (params) => ({
  type: 'LOAD_POPULAR_MOVIES',
  params
});

export const loading_popular_music_success = payload => ({ 
  type: 'LOAD_POPULAR_MOVIE_SUCCESS', 
  payload 
});