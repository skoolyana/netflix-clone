import axios from "./axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original/";


  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);

      return request;
    }

    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log(movie.name);
      console.log(movie.title);
      console.log(movie.original_name);
      console.log(movie.original_title);

      movieTrailer( movie?.name || movie?.title || movie?.original_name ).then
      ((url) => {

        console.log(url);

        const urlParams = new URLSearchParams(new URL(url).search);

        console.log(urlParams);

        setTrailerUrl(urlParams.get("v"));

      } ).catch((error) => console.log(error));

    }

  }


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map(
          (movie) =>
           ((isLargeRow &&
            movie.poster_path) ||
            (!isLargeRow &&
            movie.backdrop_path)) && (
              <img
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                key={movie.id}
                onClick={() => handleClick(movie)}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              ></img>
            )
        )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
