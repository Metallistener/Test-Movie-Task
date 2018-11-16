export const load_movie_details = (state = {}, action) => {
    switch (action.type) {
      case 'LOAD_MOVIE_DETAILS_SUCCESS':
        return action.payload
    }

    return state;
}

export const load_recommended_movies = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_RECOMMENDED_MOVIES_SUCCESS':
        return action.payload
    }
    return state;
}

