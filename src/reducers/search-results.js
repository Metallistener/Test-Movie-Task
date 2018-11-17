export const load_found_movies = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_FOUND_MOVIES_SUCCESS':
      return {
        active_page: action.payload.page ? action.payload.page : state.active_page,
        data: action.payload.results ? action.payload.results : state.data,
        totalResults: action.payload.total_results ? action.payload.total_results : state.totalResults 
      }
    default:
      return state
  }
}
    