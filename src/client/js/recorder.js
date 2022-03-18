import regeneratorRuntime from "regenerator-runtime";
const recordBtn = document.getElementById("recordBtn");
const video = document.getElementById("preview");

let stream, recorder, videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
}

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false, 
    video: { width: 1024, height: 576, },
  });
  video.srcObject = stream;
  const playPromise = video.play();
  if (playPromise !== undefined) { playPromise.then((_) => {}).catch((error) => {}); }
};

const handleRecordStart = () => {
  recordBtn.innerText = "Recording";
  recordBtn.removeEventListener("click", handleRecordStart);

  recorder = new window.MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data); 
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    const playPromise = video.play();
    if (playPromise !== undefined) { playPromise.then((_) => {}).catch((error) => {}); }

    // stop
    recordBtn.innerText = "Download";
    recordBtn.disabled = false;
    recordBtn.addEventListener("click", handleRecordDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
}

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
}

const handleRecordDownload = async () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

init();

recordBtn.addEventListener("click", handleRecordStart);