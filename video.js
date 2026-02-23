// ===============================
// 🎬 Video + Live Speech Caption
// ===============================

let recognition = null;
let isRecognizing = false;

const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const liveCaption = document.getElementById("liveCaption");

// 🎬 Video Upload
videoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {
        videoPlayer.src = URL.createObjectURL(file);
        liveCaption.innerHTML = "";
    }
});

// 🎨 Random Color Generator
function randomColor() {
    return "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 60%)";
}

// 🎨 Multi-Color Line
function multiColorLine(text) {

    const words = text.trim().split(" ");
    let result = "";

    words.forEach(word => {
        result += `<span style="color:${randomColor()}">${word} </span>`;
    });

    return `<div class="captionLine">${result}</div>`;
}

// 🎤 Start Recognition
function startRecognition() {

    if (!('webkitSpeechRecognition' in window)) {
        alert("यह browser Speech Recognition support नहीं करता");
        return;
    }

    if (isRecognizing) return;

    recognition = new webkitSpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (event) {

        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {

            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        // 🎯 Final Line (एक-एक लाइन)
        if (finalTranscript.trim() !== "") {
            liveCaption.innerHTML = multiColorLine(finalTranscript);
        }

        // 📝 Interim (हल्का grey preview)
        if (interimTranscript.trim() !== "") {
            liveCaption.innerHTML =
                multiColorLine(finalTranscript) +
                `<div style="color:#aaa; font-size:20px;">${interimTranscript}</div>`;
        }
    };

    recognition.onerror = function (event) {
        console.log("Speech Error:", event.error);
    };

    recognition.onend = function () {
        isRecognizing = false;

        // अगर वीडियो अभी भी चल रहा है तो auto restart
        if (!videoPlayer.paused) {
            startRecognition();
        }
    };

    recognition.start();
    isRecognizing = true;
}

// 🛑 Stop Recognition
function stopRecognition() {

    if (recognition && isRecognizing) {
        recognition.stop();
        isRecognizing = false;
    }
}

// ▶ Video Play → Auto Start Caption
videoPlayer.addEventListener("play", function () {
    startRecognition();
});

// ⏸ Video Pause → Stop Caption
videoPlayer.addEventListener("pause", function () {
    stopRecognition();
});

// 🔙 Back Button
function goBack() {
    window.location.href = "index.html";
}
