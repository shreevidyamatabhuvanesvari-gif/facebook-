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
    speech.pitch = 0.95;
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
        } else {
            // 🔴 रील पूरी समाप्त — Replay दिखाएँ
            if (typeof reelFinished === "function") {
                reelFinished();
            }
        }
    };

    window.speechSynthesis.speak(speech);
}

window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};
