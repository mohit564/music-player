import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import MusicList from "../components/MusicList";
import Loader from "../components/Loader";

function Top30() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const fetchMusicItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_GET_TOP30_PLAYLIST
      );

      setItems(response.data.songs);
      sessionStorage.setItem("top30", JSON.stringify(response.data.songs));
      sessionStorage.setItem("songs", JSON.stringify(response.data.songs));
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const songs = JSON.parse(sessionStorage.getItem("top30"));

    if (songs !== null && songs.length > 0) {
      setItems(songs);
      sessionStorage.setItem("songs", JSON.stringify(songs));
    } else {
      fetchMusicItems();
    }
  }, [fetchMusicItems]);

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
      <h4 className="my-4">Weekly Top 30 Songs</h4>
      {content}
    </div>
  );
}

export default Top30;
