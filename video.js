let recognition;
const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const liveCaption = document.getElementById("liveCaption");

// 🎬 Video Upload
videoInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        videoPlayer.src = URL.createObjectURL(file);
    }
});

// 🎨 Multi Color Function
function multiColorText(text) {

    const colors = ["red", "cyan", "yellow", "lime", "orange"];
    const words = text.split(" ");
    let result = "";

    words.forEach((word, i) => {
        const color = colors[i % colors.length];
        result += `<span style="color:${color}">${word} </span>`;
    });

    return result;
}

// 🎤 Start Recognition
function startRecognition() {

    if (!('webkitSpeechRecognition' in window)) {
        alert("आपका browser speech recognition support नहीं करता");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (event) {

        let transcript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }

        liveCaption.innerHTML = multiColorText(transcript);
    };

    recognition.start();
}

// 🛑 Stop Recognition
function stopRecognition() {
    if (recognition) {
        recognition.stop();
    }
}

// 🔙 Back Button
function goBack() {
    window.location.href = "index.html";
}
