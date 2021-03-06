import regeneratorRuntime from "regenerator-runtime";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

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
    audio: true, 
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
  const ffmpeg = createFFmpeg({
    corePath: "/static/ffmpeg-core.js",
    log: true
  });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  await ffmpeg.run("-i", files.input, "-r", "60", files.output); // record video
  await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumbnail); // thumbnail

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumbnail);
  const mp4Blop = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlop = new Blob([thumbFile.buffer], { type: "image/jpg" });
  const mp4Url = URL.createObjectURL(mp4Blop);
  const thumbUrl = URL.createObjectURL(thumbBlop);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  // There are too many things in browser memory, so clean them.
  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumbnail);
  // ?????? ??????
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  recordBtn.innerText = "Start Recording";
  recordBtn.addEventListener("click", handleRecordStart);
  recordBtn.disabled = false;

  init();
};

init();

recordBtn.addEventListener("click", handleRecordStart);