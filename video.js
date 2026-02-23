let recognition = null;
let isRunning = false;

const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const liveCaption = document.getElementById("liveCaption");
const videoContainer = document.getElementById("videoContainer");

// 🎬 Upload Video
videoInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        videoPlayer.src = URL.createObjectURL(file);
        videoPlayer.load();
        liveCaption.innerHTML = "";
    }
});

// 🎨 Random Color Generator
function randomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;
}

// 🎨 Multi Color Caption
function multiColor(text) {
    return text
        .trim()
        .split(" ")
        .map(word => `<span style="color:${randomColor()}">${word}</span>`)
        .join(" ");
}

// 🎤 Start Recognition
function startRecognition() {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("आपका ब्राउज़र Speech Recognition सपोर्ट नहीं करता। कृपया Chrome का उपयोग करें।");
        return;
    }

    if (isRunning) return;

    recognition = new SpeechRecognition();

    recognition.lang = "hi-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (event) {

        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + " ";
            }
        }

        if (finalTranscript.trim() !== "") {
            liveCaption.innerHTML = multiColor(finalTranscript);
        }
    };

    recognition.onerror = function (event) {
        console.error("Speech Recognition Error:", event.error);
    };

    recognition.onend = function () {
        if (isRunning) {
            recognition.start(); // auto restart
        }
    };

    recognition.start();
    isRunning = true;

    // 🎬 वीडियो भी साथ में चलाएं
    videoPlayer.play();
}

// 🛑 Stop Recognition
function stopRecognition() {
    if (recognition) {
        isRunning = false;
        recognition.stop();
    }
}

// 🔳 Fullscreen
function goFullScreen() {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    }
}

// 🔙 Back
function goBack() {
    window.location.href = "index.html";
}
