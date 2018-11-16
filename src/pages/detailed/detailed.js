import React, { Component } from 'react';
import { getMovie, getRecommendationMovies, getGenres } from '../../services/http/movies';
import Navigation from '../../components/navigation/navigation';
import './detailed.css';
import { FontAwesome } from 'react-web-vector-icons';
import Search from '../../components/search/search';
import { load_movie_details, load_recommended_movies } from '../../actions/detailed';
import { load_genres } from '../../actions/genres';

var connect = require("react-redux").connect;

class Detailed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_movie: null
        }

        this.renderRecommendedMovies = this.renderRecommendedMovies.bind(this);
        this.setGenre = this.setGenre.bind(this);
        this.selectMovie = this.selectMovie.bind(this);
    }

    componentWillMount() {
        this.getMovieId();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recommended_movies_data !== this.props.recommended_movies_data) {
            console.log(nextProps.recommended_movies_data);
            console.log('alo');
            this.renderRecommendedMovies();
        }
    }

    // получаем список всех жанров
    getGenres() {
        this.props.LoadGenres();
    }

    // получаем список рекомендуемых фильмов
    getMovies() {
        const params = {
            id_movie: this.state.id_movie
        }
        this.props.LoadRecommendedMovies(params)
    }

    // получаем нужны нам фильм по ID
    getMovie() {
        const params = {
            id_movie: this.state.id_movie
        }
        this.props.LoadMovieDetails(params)
    }

    // получаем ID фильма из props
    getMovieId() {
        this.setState({
            id_movie: this.props.match.params.id
        }, () => {
            this.getMovie();
            this.getGenres();
            this.getMovies();
        });
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
    
    selectMovie(id) {
        window.scrollTo(0,0);
        this.props.history.replace({
            pathname: '/detailed/' + id
        });

        this.setState({
            id_movie: id
        }, () => {
            this.getMovie();
            this.getMovies();
        })
    }

    searchChange(value) {
        this.props.history.push({
            pathname: '/search-results/' + value
        })
    }

    renderRecommendedMovies() {
        return (
            this.props.recommended_movies_data.map((movie, index) => {
                return (
                    <div key={index} onClick={() => this.selectMovie(movie.id)} className="recommended__movie">
                        <div className="recommended__movie-poster-box">
                            <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} className="recommended__movie-oster" />
                        </div>
                        <div className="recommended__movie-desc">
                            <h3 className="recommended__movie-title">{movie.title}</h3>
                            <div className="recommended__movie-box">
                                <strong className="recommended__movie-genre-title">Жанр:</strong>  
                                {
                                    this.setGenre(movie.genre_ids).map((genre, index) => {
                                        return (
                                            <span key={index} className="recommended__movie-genre-name"> {genre},</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className="detailed">
                <Navigation history={this.props.history} />
                <Search onChange={(value) => this.searchChange(value)} history={this.props.history} />
                <div className="detailed__main-box">
                    <div className="detailed__main">
                        <div className="detailed__head">
                            <h1 className="detailed__title">
                                <FontAwesome
                                    name='clipboard'
                                    color='#f39061'
                                    size={30}
                                    style={{
                                        position: 'absolute',
                                        left: 20
                                    }}
                                />
                                Detailed information
                            </h1>
                        </div>
                        <div className="detailed__description description">
                            <div className="description__poster-box">
                                <img src={'https://image.tmdb.org/t/p/w500' + this.props.movie_details_data.poster_path} className="description__poster" />
                            </div>
                            <div className="description__info">
                                <h2 className="description__title">{this.props.movie_details_data.title}</h2>
                                <h4 className="description__tagline">{this.props.movie_details_data.tagline}</h4>
                                <div className="description__box">
                                    <strong className="description__overview-title">Сюжет:</strong>  
                                    
                                        <span className="description__overview">{this.props.movie_details_data.overview}</span>
                                </div>
                                <div className="description__box">
                                    <strong className="description__genre-title">Жанр:</strong>  
                                    {
                                        Object.keys(this.props.movie_details_data).length > 0 ?
                                        this.props.movie_details_data.genres.map((genre, index) => {
                                            return (
                                                <span key={index} className="description__genre-name"> {genre.name},</span>
                                            )
                                        }) : null
                                    }
                                </div>
                                <div className="description__box">
                                    <strong className="description__country-title">Страна:</strong>  
                                    {
                                        Object.keys(this.props.movie_details_data).length > 0 ?
                                        this.props.movie_details_data.production_countries.map((country, index) => {
                                            return (
                                                <span key={index} className="description__genre-name">{country.name},</span>
                                            )
                                        }) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detailed__recommended recommended">
                        <div className="recommended__head">
                            <h3 className="recommended__title">
                                <FontAwesome
                                    name='film'
                                    color='#f39061'
                                    size={24}
                                    style={{
                                        position: 'absolute',
                                        left: 20
                                    }}
                                />
                                Recommended
                            </h3>
                        </div>
                        <div className="recommended__movies">
                            {
                                this.renderRecommendedMovies() 
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        movie_details_data: state.load_movie_details,
        genres_data: state.load_genres,
        recommended_movies_data: state.load_recommended_movies
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        LoadMovieDetails: (params) => dispatch(load_movie_details(params)),
        LoadGenres: () => dispatch(load_genres()),
        LoadRecommendedMovies: (params) => dispatch(load_recommended_movies(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailed);