const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const userText = document.getElementById("userText");
const caption = document.getElementById("caption");


// 📷 Image Preview
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


// 🎨 Multi-Color Text Apply Function
function applyText() {
    const text = userText.value.trim();

    if (text === "") {
        alert("पहले टेक्स्ट लिखें");
        return;
    }

    const colors = ["red", "cyan", "yellow", "lime", "orange"];
    const words = text.split(" ");

    let coloredText = "";

    words.forEach((word, index) => {
        const color = colors[index % colors.length];
        coloredText += `<span style="color:${color}">${word} </span>`;
    });

    caption.innerHTML = coloredText;
}


// 🔊 Female Voice Speak Function
function speakText() {
    const text = userText.value.trim();

    if (text === "") {
        alert("पहले टेक्स्ट लिखें");
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.pitch = 1.2;
    speech.rate = 1;

    const voices = window.speechSynthesis.getVoices();

    // Female voice ढूँढना
    const femaleVoice = voices.find(voice =>
        voice.lang.includes("hi") &&
        voice.name.toLowerCase().includes("female")
    );

    if (femaleVoice) {
        speech.voice = femaleVoice;
    }

    window.speechSynthesis.speak(speech);
}


// Voices load fix (mobile browser issue fix)
window.speechSynthesis.onvoiceschanged = function () {
    window.speechSynthesis.getVoices();
};
