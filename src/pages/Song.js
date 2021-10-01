import React, { useState, useEffect, useCallback } from "react";
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
  const [song, setSong] = useState({
    id: "",
    src: "",
    image: "",
    title: "",
    artists: "",
    duration: "0.00",
  });
  const [songs, setSongs] = useState([]);

  const history = useHistory();

  const params = useParams();
  const { songId } = params;

  const fetchSong = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const song_info = await axios.get(
          `${process.env.REACT_APP_API_GET_SONG_DETAIL + id}`
        );
        const song_url = await axios.get(
          `${process.env.REACT_APP_API_GET_SONG_URL + id}`
        );
        setSong({
          id: song_info.data.song_id,
          src: song_url.data.url,
          image: song_info.data.song_image,
          title: song_info.data.song_name,
          artists: song_info.data.song_artist,
          duration: calculateTime(song_info.data.song_duration),
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        history.push("/NotFound");
      }
    },
    [history]
  );

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

  useEffect(() => {
    fetchSong(songId);
    // get playlist or search result songs browser storage
    const songs = JSON.parse(sessionStorage.getItem("songs"));
    if (songs !== null) {
      setSongs(songs);
    }
  }, [songId, fetchSong]);

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
          <img className="music-image" src={song.image} alt="music-album-art" />
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
