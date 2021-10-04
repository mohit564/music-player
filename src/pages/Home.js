import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import PlayListItems from "../components/PlayListCard/PlayListItems";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // fetch trending playlists data
    axios
      .get(process.env.REACT_APP_API_GET_TRENDING_PLAYLIST)
      .then((response) => {
        const playlists = [
          ...response.data.charts,
          ...response.data.featured_playlists,
        ];
        setItems(playlists);
      })
      .catch(() => setError("Something went wrong!"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p className="text-center">{error}</p>}
      {!isLoading && !error && <PlayListItems items={items} />}
    </>
  );
}

export default Home;
