export const detailed_movie = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DETAILED_MOVIE':
        return action.data
    }
    return state;
}

export const recommended_movies = (state = [], action) => {
    switch (action.type) {
      case 'SET_RECOMMENDED_MOVIES':
        return action.data
    }
    return state;
}

