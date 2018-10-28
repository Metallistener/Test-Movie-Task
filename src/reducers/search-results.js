export const found_movies = (state = {}, action) => {
    switch (action.type) {
      case 'SET_FOUND_MOVIES':
        return {
          active_page: action.data.page ? action.data.page : state.active_page,
          data: action.data.results ? action.data.results : state.data,
          totalResults: action.data.total_results ? action.data.total_results : state.totalResults 
        }
      default:
        return state
    }
    return state;
  }
    