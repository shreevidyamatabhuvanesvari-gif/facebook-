const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const captionDiv = document.getElementById("caption");
const userText = document.getElementById("userText");


// 📷 Image Upload
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


// 🎨 Multi-Color Text Show Function
function applyText() {
    const text = userText.value.trim();

    if (!text) {
        alert("पहले टेक्स्ट लिखें");
        return;
    }

    const words = text.split(" ");
    const colors = ["red", "cyan", "yellow", "lime", "orange", "pink"];

    captionDiv.innerHTML = "";

    words.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.style.color = colors[index % colors.length];
        captionDiv.appendChild(span);
    });
}


// 🔊 Female Voice Speak
function speakText() {
    const text = userText.value.trim();

    if (!text) {
        alert("पहले टेक्स्ट लिखें");
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";

    const voices = window.speechSynthesis.getVoices();

    // Female Hindi voice खोजें
    let femaleVoice = voices.find(voice =>
        voice.lang === "hi-IN" &&
        voice.name.toLowerCase().includes("female")
    );

    // अगर female नाम से न मिले तो कोई भी Hindi voice लें
    if (!femaleVoice) {
        femaleVoice = voices.find(voice => voice.lang === "hi-IN");
    }

    if (femaleVoice) {
        speech.voice = femaleVoice;
    }

    speech.pitch = 1.1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}


// Voices load fix (Mobile Chrome के लिए जरूरी)
window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};
