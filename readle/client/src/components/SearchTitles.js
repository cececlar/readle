import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SearchTitles() {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getApiData = async () => {
      const result = await axios.get(
        `http://localhost:8080/api/titles?title=${query}`
      );

      console.log(result);

      setApiData(result.data.docs);
    };
    getApiData();
  }, [query]);

  const handleChange = event => {
    setSearch(event.target.value.split(" ").join("+"));
  };

  const handleSubmit = event => {
    event.preventDefault();
    setQuery(search);
  };

  return (
    <React.Fragment>
      <h1>Readle</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search books by title"
          onChange={handleChange}
        ></input>
      </form>
      <ul>
        {apiData.map((book, index) => {
          if (book.cover_i && book.isbn) {
            return (
              <div key={index}>
                <a href={`http://openlibrary.org/${book.seed[0]}`}>
                  <img
                    alt="cover"
                    src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  ></img>
                </a>
                <p>{book.title}</p>
                <p>{book.author_name}</p>
              </div>
            );
          }
        })}
      </ul>
    </React.Fragment>
  );
}
