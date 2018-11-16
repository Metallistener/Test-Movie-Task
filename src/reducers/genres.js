export const load_genres = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_GENRES_SUCCESS':
        return action.payload
    }
    return state;
}