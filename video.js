const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const caption = document.getElementById("caption");

videoInput.addEventListener("change", function() {
  const file = this.files[0];
  const url = URL.createObjectURL(file);
  videoPlayer.src = url;
});

// Demo words (later replace with real speech-to-text)
const words = [
  { text: "अगर", time: 1 },
  { text: "तुम", time: 2 },
  { text: "सीरियस", time: 3 },
  { text: "हो", time: 4 }
];

videoPlayer.addEventListener("timeupdate", () => {
  const currentTime = Math.floor(videoPlayer.currentTime);

  const word = words.find(w => w.time === currentTime);
  if (word) {
    caption.innerHTML = `
      <span style="color:${randomColor()}; 
                   font-size:32px;
                   animation: pop 0.3s;">
        ${word.text}
      </span>`;
  }
});

function randomColor() {
  const colors = ["yellow", "cyan", "pink", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
}
