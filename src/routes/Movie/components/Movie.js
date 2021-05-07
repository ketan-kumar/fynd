import React, {useState } from 'react';
import axios from 'axios';

import Constant from '../../../config/Constant';
import Header from '../../../component/Header';
import '../../../App.css';

export default function Login(props) {
  const [movie, setMovie] = useState('');
  const [director, setDirector] = useState('');
  const [ratings, setRatings] = useState('');
  const [genre, setGenre] = useState('');
  const [popularity, setPopularity] = useState('');
  let user = JSON.parse(localStorage.getItem('user')) || {};

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: `${Constant.baseUrl}${Constant.port}/movie`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      data: {
        popularity_99: popularity,
        director: director,
        genre: genre,
        imdb_score: ratings,
        name: movie,
        admin: user.name
      }
    }).then(response => {
      setMovie('');
      setDirector('');
      setRatings('');
      setGenre('');
      setPopularity('');
    }).catch(err => {
      console.log('error while getting movies: ', err);
    });
  }

  return (
    <div className="center container">
      <Header/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Movie
            <input
              className="form-control"
              name="movie"
              type="text"
              placeholder="eg: 3 idot"
              value={movie}
              required
              onChange={(e) => {setMovie(e.target.value)}}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Director
            <input
              className="form-control"
              name="director"
              type="text"
              placeholder="eg: rajkumar hirani"
              value={director}
              required
              onChange={(e) => {setDirector(e.target.value)}}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            IMDB Ratings
            <input
              className="form-control"
              name="ratings"
              type="text"
              placeholder="eg: 8.5"
              value={ratings}
              required
              onChange={(e) => {setRatings(e.target.value)}}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Genre
            <input
              className="form-control"
              name="genre"
              type="text"
              placeholder="eg: Family, Fantasy"
              value={genre}
              required
              onChange={(e) => {setGenre(e.target.value)}}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            99Popularity
            <input
              className="form-control"
              name="popularity"
              type="text"
              placeholder="eg: 88"
              value={popularity}
              required
              onChange={(e) => {setPopularity(e.target.value)}}
            />
          </label>
        </div>
        <div className="m-5">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  )
}
