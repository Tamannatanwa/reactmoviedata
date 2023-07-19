import React,{ useEffect, useState } from "react";
import "./FetchApi.css";
const imageExtra = "https://www.cdweb.pl/images/200x200c.png";
const Fetchapi = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState("ram");
  const [movie, setMovie] = useState([]);
  function fun(e) {
    setName(e.target.value);
  }
  function newData(e) {
    e.preventDefault();
    return setState(name);
  }
  const url = `https://www.omdbapi.com/?s=${state}&apikey=addb359d`;
  const fetchMovie = async () => {
    try {
      const data = await fetch(url);
      const finaldata = await data.json();
      setMovie(finaldata.Search);
    } catch (error) {
      document.write("Oops...Not found!");
    }
  };
  useEffect(() => {
    fetchMovie();
  }, [state]);

  return (
    <>
      <h1>
        🎥 <span>Movify</span> 🎬
      </h1>
      <div className="input">
          <input
            type="text"
            value={name}
            onChange={fun}
            placeholder="moviename..."
          />
        <button className="button" onClick={newData}>
          search
        </button>
      </div>
      <section className="movie-page">
        <div className="grid grid-4-col">
          {movie ? (
            movie.map((val, i) => {
              const movieName = val.Title.substring(0, 15);
              return (
                <>
                  <div className="card" key={i}>
                    <div key={i} className="card-info">
                      <img
                        src={val.Poster === "N/A" ? imageExtra : val.Poster}
                        alt="image"
                        className="img"
                      />
                      <h4>
                        Title:
                        {movieName.length >= 25 ? `${movieName}...` : movieName}
                      </h4>
                      <p>Year: {val.Year}</p>
                      <p>mdbID: {val.imdbID}</p>
                      <p>
                        Type: <span>{val.Type}</span>
                      </p>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <h1 className="movienotfound">Movie Not Found...</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Fetchapi;
