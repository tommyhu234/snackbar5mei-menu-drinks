const videos = ["milkshake.mp4", "ice-cream.mp4"]
let currentIndex = 0;
let activeVideo = document.getElementById("video-1");
let nextVideo = document.getElementById("video-2");
const fadeDuration = 1.5; // seconds

function playVideo(videoElement, source) {
  videoElement.src = source;
  videoElement.load();
  videoElement.play();
}

function swapVideos() {
  // Prepare and play next video
  currentIndex = (currentIndex + 1) % videos.length;
  playVideo(nextVideo, videos[currentIndex]);

  // Crossfade
  nextVideo.style.opacity = 1;
  activeVideo.style.opacity = 0;

  // Swap roles
  [activeVideo, nextVideo] = [nextVideo, activeVideo];

  // Setup next fade trigger
  scheduleCrossfade();
}

function scheduleCrossfade() {
  activeVideo.onloadedmetadata = () => {
    const triggerTime = (activeVideo.duration - fadeDuration) * 1000;
    if (triggerTime > 0) {
      setTimeout(swapVideos, triggerTime);
    }
  };
}

// Start initial video
playVideo(activeVideo, videos[currentIndex]);
activeVideo.style.opacity = 1;
nextVideo.style.opacity = 0;
scheduleCrossfade();