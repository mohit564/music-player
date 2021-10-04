import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import Loader from "../Loader";
import MusicItem from "../MusicCard/MusicItem";

function PlayListMusicItems(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [playListName, setPlayListName] = useState("");
  const [items, setItems] = useState([]);

  const history = useHistory();
  const params = useParams();
  const { playlistId } = params;

  useEffect(() => {
    // fetch playlist songs
    axios
      .get(`${process.env.REACT_APP_API_GET_PLAYLIST_DETAIL + playlistId}`)
      .then((response) => {
        setPlayListName(response.data.listname);
        setItems(response.data.songs);
        sessionStorage.setItem("songs", JSON.stringify(response.data.songs));
      })
      .catch(() => history.push("/NotFound"))
      .finally(() => setIsLoading(false));
  }, [playlistId, history]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h4
        className="my-4"
        dangerouslySetInnerHTML={{
          __html: playListName,
        }}
      />
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-3 mb-4">
        {items.map((item) => (
          <MusicItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
export default PlayListMusicItems;
