import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import "./Song.css";
import Loader from "../components/Loader";
import {
  togglePlay,
  updateButton,
  scrub,
  handleProgress,
  calculateTime,
} from "../utils/MusicOperations";

function Song() {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState({
    id: "",
    src: "",
    image: "",
    title: "",
    artists: "",
    duration: "0.00",
  });

  const history = useHistory();
  const params = useParams();
  const { songId } = params;

  useEffect(() => {
    setIsLoading(true);

    // Fetch the song details
    axios
      .get(`${process.env.REACT_APP_API_GET_SONG_DETAIL + songId}`)
      .then((response) => {
        setSong({
          id: response.data[songId].id,
          image: response.data[songId].image,
          title: response.data[songId].song,
          artists: response.data[songId].primary_artists,
          src: response.data[songId].media_preview_url
            .replace("preview.saavncdn.com", "aac.saavncdn.com")
            .replace("_96_p", "_320"),
          duration: calculateTime(response.data[songId].duration),
        });
      })
      .catch(() => history.push("/NotFound"))
      .finally(() => setIsLoading(false));

    // get search results or playlist songs
    // which are stored in browser storage
    setSongs(JSON.parse(sessionStorage.getItem("songs")) || []);
  }, [songId, history]);

  const nextSong = () => {
    var idx = songs.findIndex((song) => song.id === songId);
    if (idx === songs.length - 1) {
      history.push(`/songs/${songs[0].id}`);
    } else {
      history.push(`/songs/${songs[idx + 1].id}`);
    }
  };

  const prevSong = () => {
    var idx = songs.findIndex((song) => song.id === songId);
    if (idx === 0) {
      history.push(`/songs/${songs[songs.length - 1].id}`);
    } else {
      history.push(`/songs/${songs[idx - 1].id}`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="background">
        <div className="player">
          {/* when user visit site using url of particular song then songs array will be empty so next song and prev song feature will not work in this case */}
          <video
            onPlay={updateButton}
            onPause={updateButton}
            onTimeUpdate={handleProgress}
            onEnded={songs.length ? nextSong : () => {}}
            height="0"
            width="0"
            src={song.src}
            autoPlay={true}
            playsInline={true}
          ></video>
          <img
            className="music-image"
            src={song.image.replace(/(\d{3}x\d{3})/, "500x500")}
            alt="album-art"
          />
          <div className="p-3">
            <h5 dangerouslySetInnerHTML={{ __html: song.title }}></h5>
            <p dangerouslySetInnerHTML={{ __html: song.artists }}></p>
            <div className="player-controls">
              <div className="time">
                <span id="current-time">0.00</span>
                <input
                  type="range"
                  name="progress"
                  id="seek-slider"
                  min="0"
                  max="100"
                  step="0.01"
                  onChange={scrub}
                />
                <span id="duration">{song.duration}</span>
              </div>
              <div className="player-buttons mt-3">
                {/* when user direct visit site with songs/:songId endpoint then disable next and prev button */}
                <button onClick={prevSong} disabled={!songs.length}>
                  <i className="fa-solid fa-angles-left" />
                </button>
                <button onClick={togglePlay}>
                  <i className="fa-solid fa-play toggle-icon" />
                </button>
                <button onClick={nextSong} disabled={!songs.length}>
                  <i className="fa-solid fa-angles-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Song;
