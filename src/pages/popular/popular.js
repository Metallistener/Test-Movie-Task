import React, { Component } from 'react';
import './popular.css';
import { getMovies, getGenres } from '../../services/http/movies';
import { FontAwesome } from 'react-web-vector-icons';
import Pagination from "react-js-pagination";
import Navigation from '../../components/navigation/navigation';
import Search from '../../components/search/search';
import { load_popular_movies } from '../../actions/popular';
import { load_genres } from '../../actions/genres';

var connect = require("react-redux").connect;

class Popular extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.renderMovie = this.renderMovie.bind(this);
        this.setGenre = this.setGenre.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.searchChange = this.searchChange.bind(this);
    }

    componentWillMount() {
        this.getMovies();
        this.getGenres();
    }

    // получаем список всех жанров
    getGenres() {
        this.props.LoadGenres();
    }

    // получаем список популярных фильмов
    getMovies(params) {
        this.props.LoadPopularMovies();
    }

    // слушает изменение номера страницы пагинации
    handlePageChange(pageNumber) {
        window.scrollTo(0,0);
        this.props.LoadPopularMovies({page: pageNumber});
    }

    // возвращает жанр в строковом виде
    setGenre(genre_ids) {
        const genres_name = [];

        for(const item of this.props.genres_data) {
            for (const item2 of genre_ids) {
                if (item.id === item2) {
                    genres_name.push(item.name);
                    continue;
                }
            }
        }

        return genres_name;
    }

    searchChange(value) {
        this.props.history.push({
            pathname: '/search-results/' + value
        })
    }

    renderMovie() {
        return (
            Object.keys(this.props.popular_movies_data).length > 0 ?
            this.props.popular_movies_data.data.map((movie, index) => {
                return (
                    <div key={index} className="popular__movie movie">
                        <a className="movie__link" onClick={() => this.props.history.push({
                            pathname: '/detailed/' + movie.id
                        })}>
                            <div className="movie__poster-box">
                                <img className="movie__poster" src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
                            </div>
                            <h4 className="movie__title">{movie.title}</h4>
                            <div className="movie__genres-box">
                                <strong className="movie__genre-title">Жанр:</strong> 
                                {
                                    this.setGenre(movie.genre_ids).map((genre, index) => {
                                        return (
                                            <span key={index} className="movie__genre-name">{genre},</span>
                                        )
                                    })
                                }
                            </div>
                        </a>
                    </div>
                )
            }) : null
        )
    }

    render() {
        return (
            <div className="popular">
                <Navigation history={this.props.history} />
                <Search onChange={(value) => this.searchChange(value)} history={this.props.history} />
                <div className="popular__main">
                    <div className="popular__form"></div>
                    <div className="popular__movies">
                        <h1 className="popular__title">
                            <FontAwesome
                                name='film'
                                color='#f39061'
                                size={30}
                                style={{
                                    position: 'absolute',
                                    left: 20
                                }}
                            />
                            Popular movies
                        </h1>
                        {   
                            this.renderMovie()
                        }
                        {
                            this.props.popular_movies_data.data ? <Pagination
                                activePage={this.props.popular_movies_data.active_page}
                                itemsCountPerPage={20}
                                activeLinkClass="active_page"
                                linkClass="page_link"
                                totalItemsCount={this.props.popular_movies_data.totalResults < 1000 ? this.props.popular_movies_data.totalResults : 1000}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                            /> : null
                        }
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        popular_movies_data: state.load_popular_movies,
        genres_data: state.load_genres
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        LoadPopularMovies: (params) => dispatch(load_popular_movies(params)),
        LoadGenres: () => dispatch(load_genres())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popular);