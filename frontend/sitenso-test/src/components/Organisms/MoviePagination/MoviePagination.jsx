
import React, { useEffect } from "react";
import { CardMovie } from "../../Molecules/CardMovie/CardMovie";
import "./MoviePagination.css";
import ImageTest from '../../Utils/Images/imageTest.webp'

export const MoviePagination = ({ postsPerPage, likedMovies, currentPage, data}) => {


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <>

      {currentPosts?.map((movie, idx) =>
        <CardMovie key={idx} title={movie.name} img={movie.image !== null ? movie.image.original : ImageTest} id={movie.id} likedMovies={likedMovies} />)}

    </>
  );
}