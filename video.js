const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const caption = document.getElementById("caption");

videoInput.addEventListener("change", function() {
  const file = this.files[0];
  const url = URL.createObjectURL(file);
  videoPlayer.src = url;
});

// Demo words with duration
const words = [
  { text: "अगर", start: 1, end: 2 },
  { text: "तुम", start: 2, end: 3 },
  { text: "सीरियस", start: 3, end: 4 },
  { text: "हो", start: 4, end: 5 }
];

videoPlayer.addEventListener("timeupdate", () => {
  const currentTime = videoPlayer.currentTime;

  const word = words.find(w =>
    currentTime >= w.start && currentTime < w.end
  );

  if (word) {
    caption.innerHTML = `
      <span style="
        color:${randomColor()};
        font-size:32px;
        font-weight:bold;
      ">
        ${word.text}
      </span>
    `;
  } else {
    caption.innerHTML = "";
  }
});

function randomColor() {
  const colors = ["yellow", "cyan", "pink", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
}
