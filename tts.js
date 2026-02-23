const imageInput = document.getElementById("imageInput");
const userText = document.getElementById("userText");
const controls = document.getElementById("controls");
const reelView = document.getElementById("reelView");
const reelImage = document.getElementById("reelImage");
const reelText = document.getElementById("reelText");
const slideCount = document.getElementById("slideCount");

let slides = [];
let selectedImage = null;
let currentIndex = 0;

// Image select
imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Add Slide
function addSlide() {

    const text = userText.value.trim();

    if (!selectedImage || text === "") {
        alert("फोटो और लेख दोनों जरूरी हैं");
        return;
    }

    slides.push({
        image: selectedImage,
        text: text
    });

    userText.value = "";
    imageInput.value = "";
    selectedImage = null;

    slideCount.innerText = `कुल स्लाइड: ${slides.length}`;
}

// Start Reel
function startReel() {

    if (slides.length === 0) {
        alert("पहले फोटो जोड़ें");
        return;
    }

    controls.style.display = "none";
    reelView.style.display = "flex";

    currentIndex = 0;
    showSlide(currentIndex);
}

// Show Slide
function showSlide(index) {

    if (index >= slides.length) return;

    const slide = slides[index];
    reelImage.src = slide.image;

    const colors = ["red", "cyan", "yellow", "lime", "orange"];
    const words = slide.text.split(" ");
    let colored = "";

    words.forEach((word, i) => {
        const color = colors[i % colors.length];
        colored += `<span style="color:${color}">${word} </span>`;
    });

    reelText.innerHTML = colored;

    speak(slide.text);
}

// Speak + Move Next After Finish
function speak(text) {

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.pitch = 1.1;
    speech.rate = 1;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v =>
        v.lang.includes("hi") &&
        v.name.toLowerCase().includes("female")
    );

    if (femaleVoice) speech.voice = femaleVoice;

    speech.onend = function () {
        currentIndex++;
        if (currentIndex < slides.length) {
            showSlide(currentIndex);
        }
    };

    const videoPanel = document.getElementById("videoPanel");
const controls = document.getElementById("controls"); // आपका image panel

function goToVideoPanel() {
    controls.style.display = "none";
    videoPanel.style.display = "block";
}

function backToImagePanel() {
    videoPanel.style.display = "none";
    controls.style.display = "block";
}

// Video Upload
const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const liveCaption = document.getElementById("liveCaption");

videoInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        videoPlayer.src = URL.createObjectURL(file);
    }
});

// Multi Color
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

// Speech Recognition
let recognition;

function startRecognition() {

    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition supported नहीं है");
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

    window.speechSynthesis.speak(speech);
}

window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};
