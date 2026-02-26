const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const caption = document.getElementById("caption");

videoInput.addEventListener("change", function() {
  const file = this.files[0];
  const url = URL.createObjectURL(file);
  videoPlayer.src = url;
});

const words = [
  { text: "अगर", start: 1, end: 2 },
  { text: "तुम", start: 2, end: 3 },
  { text: "सीरियस", start: 3, end: 4 },
  { text: "हो", start: 4, end: 5 }
];

videoPlayer.addEventListener("timeupdate", () => {
  const currentTime = videoPlayer.currentTime;

  let currentWord = null;

  for (let i = 0; i < words.length; i++) {
    if (currentTime >= words[i].start && currentTime < words[i].end) {
      currentWord = words[i];
      break;
    }
  }

  if (currentWord) {
    caption.innerHTML = currentWord.text;
  } else {
    caption.innerHTML = "";
  }
});
