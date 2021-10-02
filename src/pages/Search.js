import React, { useState, useRef } from "react";
import axios from "axios";

import MusicList from "../components/MusicList";
import Loader from "../components/Loader";

const HISTORY_SIZE = 5;

function Search() {
  const queryRef = useRef();
  const datalistRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  // Save the query in local storage
  let searchHistory = localStorage.getItem("searchHistory")
    ? JSON.parse(localStorage.getItem("searchHistory"))
    : [];

  const onSubmitFormHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const query = queryRef.current.value.trim().replace(/\s+/g, "+");
      const res = await axios.get(
        `${process.env.REACT_APP_API_SEARCH_SONG + query}`
      );
      // If no result found then api will return { "result": "false" } json data
      if (res.data.result !== "false") {
        setItems(res.data);
        sessionStorage.setItem("songs", JSON.stringify(res.data));
      }
      // To make sure duplicate search queries will not be stored
      searchHistory = new Set(searchHistory);
      searchHistory.add(queryRef.current.value.trim());
      searchHistory = Array.from(searchHistory);
      // This will limit search history array size to HISTORY_SIZE
      searchHistory.splice(
        -searchHistory.length - 1,
        searchHistory.length - HISTORY_SIZE
      );
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    } catch (error) {
      console.error(error);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  function onFocusInputHandler() {
    datalistRef.current.innerHTML = searchHistory
      .map((item) => {
        return `<option value="${item}"" />`;
      })
      .join("");
  }

  let content = "";

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = <p className="text-center">{error}</p>;
  } else if (!isLoading && !error && items.length === 0) {
    content = <p className="text-center">Found no songs.</p>;
  } else if (!isLoading && !error && items.length > 0) {
    content = <MusicList items={items} />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col col-md-6 mx-auto">
          <form className="py-3" onSubmit={onSubmitFormHandler}>
            <div className="input-group">
              <input
                ref={queryRef}
                type="text"
                name="q"
                list="searchHistory"
                className="form-control"
                placeholder="Search song or album here"
                aria-label="Search song or album here"
                aria-describedby="buttonAfter"
                onFocus={onFocusInputHandler}
                autoComplete="off"
                required
              />
              <datalist ref={datalistRef} id="searchHistory" />
              <button
                type="submit"
                className="btn btn-secondary"
                id="buttonAfter"
              >
                <i className="fa fa-search" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <p className="text-center fw-bold">Search Results</p>
      {content}
    </div>
  );
}

export default Search;
