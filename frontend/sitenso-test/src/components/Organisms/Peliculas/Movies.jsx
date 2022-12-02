import React, { useState } from 'react'
import { useEffect } from 'react';
import { CardMovie } from '../../Molecules/CardMovie/CardMovie';
import './Movies.css'
import { Input } from '../../Atoms/Input/Input';
import axios from 'axios';
import ImageTest from '../../Utils/Images/imageTest.webp'

const URL_API = "https://api.tvmaze.com/search/shows?q="
const URL_API_SW = "http://api.tvmaze.com/search/shows?q=star%20wars"

export const Movies = ({likedMovies, setLikedMovies}) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query === "") {
      fetch(URL_API_SW)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setData(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [query])


  const handleChange = (e) => {
    setQuery(e)
  }

  useEffect(() => {
    if (query !== "") {
      fetch(`${URL_API}+${query}`)
        .then(res => res.json())
        .then(
          (result) => {
            if (result.length > 0) {
              setMessage("");
              setIsLoaded(true);
              setData(result);
            } else {
              setMessage("There was a problem, please search another thing.")
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    } else {
      setData(data)
    }
  }, [query, data])

  return (
    <div className="movies-container">

      <div className="search">
        <Input value={query} onChange={(e) => handleChange(e.target.value)} placeholder="Buscar" />
      </div>
      <h1>Películas</h1>
      <hr />
      <div className="movies">
        {message !== "" ? (<div> Error: {message}</div>) : error ? (<div>Error: {error.message}</div>) : !isLoaded ? (<div>Loading...</div>) : data?.map((movie, idx) =>
          <CardMovie key={idx} title={movie.show.name} img={movie.show.image !== null ? movie.show.image.original : ImageTest} id={movie.show.id} likedMovies={likedMovies} />
        )}
      </div>
    </div>
  )
}
