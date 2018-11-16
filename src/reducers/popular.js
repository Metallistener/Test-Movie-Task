export const load_popular_movies = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOAD_POPULAR_MOVIE_SUCCESS':
      return {
        active_page: action.payload.page ? action.payload.page : state.active_page,
        data: action.payload.results ? action.payload.results : state.data,
        totalResults: action.payload.total_results ? action.payload.total_results : state.totalResults 
      }
  }
  return state;
}