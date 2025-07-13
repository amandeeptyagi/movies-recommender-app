import React from "react";

const MovieCard = ({ movie }) => {
    return (<>
        <div className="movie" key={movie.imdbID}>
            <div>
            </div>
            <div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : "https://placehold.co/310x460?text=Image+Not+Found"} alt={movie.Title} />
            </div>
            <div>
                <span>{movie.Type}</span>
                <p>{movie.Year}</p>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    </>)
}

export default MovieCard