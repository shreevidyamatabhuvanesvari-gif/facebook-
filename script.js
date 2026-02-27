const videoUpload = document.getElementById("videoUpload");
const videoPreview = document.getElementById("videoPreview");
const captionBox = document.getElementById("captionBox");

videoUpload.addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        videoPreview.src = url;
    }
});

function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.continuous = true;

    recognition.onresult = function(event) {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + " ";
        }

        captionBox.innerHTML = `<span style="color:yellow">${transcript}</span>`;
    };

    recognition.start();
}
