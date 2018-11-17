export const load_found_movies = params => ({
    type: 'LOAD_FOUND_MOVIES',
    params
});

export const loading_found_movies_success = payload => ({
    type: 'LOAD_FOUND_MOVIES_SUCCESS',
    payload
});