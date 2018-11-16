export const load_movie_details = params => ({
    type: 'LOAD_MOVIE_DETAILS',
    params
});

export const loading_movie_details_success = payload => ({
    type: 'LOAD_MOVIE_DETAILS_SUCCESS',
    payload
});

export const load_recommended_movies = params => ({
    type: 'LOAD_RECOMMENDED_MOVIES',
    params
});

export const loading_recommended_movies_success = payload => ({
    type: 'LOAD_RECOMMENDED_MOVIES_SUCCESS',
    payload
});
