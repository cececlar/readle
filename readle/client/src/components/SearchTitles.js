import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";


export default function SearchTitles() {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const getApiData = useCallback( async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/titles?title=${query}`
    );
    data.data && setApiData(data.data.docs);
  }, [query])

  useEffect(() => {
    console.log("render")
    getApiData() 
  }, [query, getApiData]);

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setQuery(search.split(" ").join("+"));
    setSearch("")
  };

  return (
    <Fragment>
      <h1>Readle</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search books by title"
          value={search}
          onChange={handleChange}
        ></input>
      </form>
      <ul>
        {apiData.length ? apiData.map((book, index) => {
          if (book.cover_i && book.isbn) {
            return (
              <div key={index}>
                <a href={`http://openlibrary.org/${book.seed[0]}`} target="_blank" rel="noopener noreferrer" >
                  <img
                    alt="cover"
                    src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  ></img>
                </a>
                <Link to={`/book/${book.isbn[1]}`}> <p>{book.title}</p> </Link>
                <p>{book.author_name}</p>
              </div>
            );
          } else {
          return <a
                   key={index} 
                   href={`http://openlibrary.org/${book.seed[0]}`}
                   target="_blank" rel="noopener noreferrer" 
                   >
                     <h2>{book.title}</h2>
                  </a>
          }
        }) : <h1>Search for books now!</h1>}
      </ul>
    </Fragment>
  );
}
