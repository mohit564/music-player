export function togglePlay() {
  const music = document.querySelector("video");
  if (music.paused) music.play();
  else music.pause();
}

export function updateButton() {
  const icon = document.querySelector(".toggle-icon");
  const music = document.querySelector("video");

  if (music.paused) {
    icon.className = "fa-solid fa-play toggle-icon";
  } else {
    icon.className = "fa-solid fa-pause toggle-icon";
  }
}

export const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

export function handleProgress() {
  const music = document.querySelector("video");
  const progress = document.querySelector("#seek-slider");
  const currentTime = document.querySelector("#current-time");
  const percent = (music.currentTime / music.duration) * 100;

  progress.value = percent;
  currentTime.textContent = calculateTime(music.currentTime);
}

export function scrub(event) {
  const music = document.querySelector("video");
  music.currentTime = ((music.duration * event.target.value) / 100).toFixed(2);
}
