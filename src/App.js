import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesListHandler = async () => {

    setIsLoading(true);
    setError(null);
    const response = await fetch('https://swapi.dev/api/films');
    try {

      if (!response.ok) {
        throw Error('Something went wrong......');
      }
      let data = await response.json();
      const arr = data.results;

      data = arr.map(movie => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl
        }
      });

      setMoviesList(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesListHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={moviesList} />}
        {!isLoading && moviesList.length == 0 && <p>No Movies right now. Click Fetch Movies for movies List</p>}
        {isLoading && <p>Movies List Loading.....</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;


// console.log('Before fetch');
      // fetch('https://swapi.dev/api/films').then(response => {
      //   return response.json();
      // }).then(result => {
      //   console.log(result);

      //   let data = result.results;

      //   data = data.map(movie => {
      //     return {
      //       id: movie.episode_id,
      //       title: movie.title,
      //       releaseDate: movie.release_date,
      //       openingText: movie.opening_crawl
      //     }
      //   })
      // setMoviesList(data);
      // });
