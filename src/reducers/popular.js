export const popular_movies = (state = {}, action) => {
  switch (action.type) {
    case 'SET_POPULAR_MOVIES':
      return {
        active_page: action.data.page ? action.data.page : state.active_page,
        data: action.data.results ? action.data.results : state.data,
        totalResults: action.data.total_results ? action.data.total_results : state.totalResults 
      }
  }
  return state;
}
  
export const popular_movies_error = (state = {}, action) => {
  switch (action.type) {
    case 'SET_POPULAR_MOVIES_ERROR':
      return {
          error: action.error
      }
  }
  return state;
}