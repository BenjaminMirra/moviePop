import React, { useState } from 'react'
import { useEffect } from 'react';
import './Movies.css'
import { Input } from '../../Atoms/Input/Input';
import ImageTest from '../../Utils/Images/imageTest.webp'
import { Loader } from '../../Molecules/Loader/Loader';
import { MoviePagination } from '../MoviePagination/MoviePagination';
import { CardMovie } from '../../Molecules/CardMovie/CardMovie';

const URL_API = "https://api.tvmaze.com/search/shows?q="
const URL_API_TODOS = "https://api.tvmaze.com/shows"

export const Movies = ({ likedMovies }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [loadingMovies, setLoadingMovies] = useState(false)


  const getMovies = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const handleChange = (e) => {
    setQuery(e)
  }

  useEffect(() => {
    if (query !== "") {
      getMoviesWithQuery(query)
    } else {
      getMovies(URL_API_TODOS)
    }
  }, [query, data, postsPerPage])

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      //show loading animation
      setLoadingMovies(true)
      setTimeout(() => {
        setPostsPerPage(postsPerPage + 9)
        setLoadingMovies(false)
      }, 1000);
    }
  })

  const getMoviesWithQuery = (query) => {
    fetch(`${URL_API}+${query}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.length > 0) {
            setMessage("");
            setIsLoaded(true);
            setDataSearch(result);
          } else {
            setMessage("Loading")
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  return (
    <div className="movies-container">
      <div className="search">
        <Input value={query} onChange={(e) => handleChange(e.target.value)} placeholder="Buscar" />
      </div>
      <h1>Películas</h1>
      <hr />
      <div className="movies">
        {message !== "" ? (<div> {message}</div>) : error ? (<div>Error: {error.message}</div>) : !isLoaded ? (<div className="loadingComponent">
          <Loader />
        </div>) : (query === ""?
          <MoviePagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={data} likedMovies={likedMovies} postsPerPage={postsPerPage} setPostsPerPage={setPostsPerPage} query={query} />
          :
          dataSearch?.map((movie, idx) =>
            <CardMovie key={idx} title={movie.show.name} img={movie.show.image !== null ? movie.show.image.original : ImageTest} id={movie.show.id} likedMovies={likedMovies} />))
        }

      </div>
      {
        loadingMovies ?
          <div className="loadingComponent">
            <Loader />
          </div> : ""
      }

    </div>
  )
}
