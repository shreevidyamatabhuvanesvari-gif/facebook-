const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");

imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function speakText() {
    const text = "नमस्ते दोस्तों स्वागत है!";

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";

    // Female voice select करना
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice =>
        voice.lang === "hi-IN" && voice.name.toLowerCase().includes("female")
    );

    if (femaleVoice) {
        speech.voice = femaleVoice;
    }

    speech.pitch = 1.2;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}

// Important: voices load होने का इंतजार
window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};
