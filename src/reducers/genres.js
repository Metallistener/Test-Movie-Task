export const genres = (state = [], action) => {
    switch (action.type) {
      case 'SET_GENRES':
        return action.data
    }
    return state;
}