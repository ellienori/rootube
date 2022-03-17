const video = document.querySelector("video");
const playButton = document.getElementById("play");
const playButtonIcon = playButton.querySelector("i");
const muteButton = document.getElementById("mute");
const muteButtonIcon = muteButton.querySelector("i");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenButton = document.getElementById("fullScreen"); 
const fullScreenIcon = fullScreenButton.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;
video.volume = volumeValue;
let controlsPid = null;
let controlsMovementPid = null;

const hidingControls = () => videoControls.classList.remove("showing");

videoContainer.addEventListener("mousemove", () => {
  if (controlsPid) {
    clearTimeout(controlsPid);
    controlsPid = null;
  }
  if(controlsMovementPid) {
    clearTimeout(controlsMovementPid);
    controlsMovementPid = null;
  }
  videoControls.classList.add("showing");
  controlsMovementPid = setTimeout(hidingControls, 3000);
});

videoContainer.addEventListener("mouseleave", () => {
  controlsPid = setTimeout(hidingControls, 3000);
});

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

// handle play pause
const handleVideoPlayPause = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playButtonIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

playButton.addEventListener("click", handleVideoPlayPause);
video.addEventListener("click", handleVideoPlayPause);
document.addEventListener("keypress", (event) => {
  if (event.code === "Space") {
    handleVideoPlayPause();
  }
})

video.addEventListener("timeupdate", (event) => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
});

muteButton.addEventListener("click", (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteButtonIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
});

volumeRange.addEventListener("input", (event) => {
  const {
    target: {value}
  } = event;
  if (video.muted) {
    video.muted = false;
    muteButton.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
});

timeline.addEventListener("input", (event) => {
  const {
    target: {
      value,
    }
  } = event;
  video.currentTime = value;
})

fullScreenButton.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
});

videoContainer.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullScreen.innerText = "Enter Full Screen";
  }
});

// when user finishes watching video,
video.addEventListener("ended", () => {
  // request to backend
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
});

video.addEventListener("loadeddata", handleLoadedMetadata);

if (video.readyState == 4) {
  handleLoadedMetadata();
}