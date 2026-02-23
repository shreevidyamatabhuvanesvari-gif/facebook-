const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const liveCaption = document.getElementById("liveCaption");

videoInput.addEventListener("change", async function () {

    const file = this.files[0];
    if (!file) return;

    videoPlayer.src = URL.createObjectURL(file);
    videoPlayer.play();

    const formData = new FormData();
    formData.append("video", file);

    liveCaption.innerHTML = "Processing...";

    const response = await fetch("http://localhost:5000/transcribe", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    // 🎬 Simulate Live Caption
    showLiveText(data.text);
});

function showLiveText(text) {

    const words = text.split(" ");
    let index = 0;

    const interval = setInterval(() => {
        if (index >= words.length) {
            clearInterval(interval);
            return;
        }

        liveCaption.innerHTML += words[index] + " ";
        index++;

    }, 300);
}
