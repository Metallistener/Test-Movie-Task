import React, { Component } from 'react';
import { getMovie, getRecommendationMovies, getGenres } from '../../services/http/movies';
import Navigation from '../../components/navigation/navigation';
import './detailed.css';
import { FontAwesome } from 'react-web-vector-icons';
import Search from '../../components/search/search';
import { set_detailed_movie, set_recommended_movies } from '../../actions/detailed';
import { set_genres } from '../../actions/genres';

var connect = require("react-redux").connect;

class Detailed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_movie: null,
            same_movies: []
        }
    }

    componentWillMount() {
        this.getMovieId();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.detailed_movie_data !== this.props.detailed_movie_data) {
            const params = {
                id_movie: this.state.id_movie
            };

            this.getMovies(params);
        }

        if (nextProps.recommended_movies_data !== this.props.recommended_movies_data) {
            this.renderrecommendedMovies();
        }
    }

    // получаем список всех жанров
    getGenres() {
        getGenres()
        .then((response) => {
            this.props.genres(response.data.genres);
            this.getMovie();
        })
        .catch((error) => {
            console.log(error.response);
        });
    }

    // получаем список популярных фильмов
    getMovies(params) {
        getRecommendationMovies(params)
        .then((response) => {
            console.log(response.data);
            this.props.recommended_movies(response.data.results);
        })
        .catch((error) => {
            console.log(error.response);
        });
    }

    // получаем нужны нам фильм по ID
    getMovie() {
        getMovie(this.state.id_movie)
        .then((response) => {
            this.props.detailed_movie(response.data);    
        })
        .catch((error) => {
            console.log(error.response);
        });
    }

    // получаем ID фильма из props
    getMovieId() {
        this.setState({
            id_movie: this.props.match.params.id
        }, () => {
            this.getGenres();
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
    
    changeLink(id) {
        window.scrollTo(0,0);
        this.props.history.replace({
            pathname: '/detailed/' + id
        });

        this.setState({
            id_movie: id
        }, () => {
            this.getMovie();
        })
    }

    searchChange(value) {
        this.props.history.push({
            pathname: '/search-results/' + value
        })
    }

    renderrecommendedMovies() {
        return (
            this.props.recommended_movies_data.map((movie, index) => {
                return (
                    <div key={index} onClick={() => this.changeLink(movie.id)} className="recommended__movie">
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
                                <img src={'https://image.tmdb.org/t/p/w500' + this.props.detailed_movie_data.poster_path} className="description__poster" />
                            </div>
                            <div className="description__info">
                                <h2 className="description__title">{this.props.detailed_movie_data.title}</h2>
                                <h4 className="description__tagline">{this.props.detailed_movie_data.tagline}</h4>
                                <div className="description__box">
                                    <strong className="description__overview-title">Сюжет:</strong>  
                                    
                                        <span className="description__overview">{this.props.detailed_movie_data.overview}</span>
                                </div>
                                <div className="description__box">
                                    <strong className="description__genre-title">Жанр:</strong>  
                                    {
                                        Object.keys(this.props.detailed_movie_data).length > 0 ?
                                        this.props.detailed_movie_data.genres.map((genre, index) => {
                                            return (
                                                <span key={index} className="description__genre-name"> {genre.name},</span>
                                            )
                                        }) : null
                                    }
                                </div>
                                <div className="description__box">
                                    <strong className="description__country-title">Страна:</strong>  
                                    {
                                        Object.keys(this.props.detailed_movie_data).length > 0 ?
                                        this.props.detailed_movie_data.production_countries.map((country, index) => {
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
                                this.renderrecommendedMovies() 
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    console.log(state);
    return {
        detailed_movie_data: state.detailed_movie,
        genres_data: state.genres,
        recommended_movies_data: state.recommended_movies
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        detailed_movie: data => dispatch(set_detailed_movie(data)),
        genres: data => dispatch(set_genres(data)),
        recommended_movies: data => dispatch(set_recommended_movies(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailed);