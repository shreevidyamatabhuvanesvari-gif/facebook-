const imageInput = document.getElementById("imageInput");
const userText = document.getElementById("userText");
const controls = document.getElementById("controls");
const reelView = document.getElementById("reelView");
const reelImage = document.getElementById("reelImage");
const reelText = document.getElementById("reelText");
const slideCount = document.getElementById("slideCount");

let slides = [];
let selectedImage = null;

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

// Add Slide (One by One)
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

// Start Reel Mode
function startReel() {

    if (slides.length === 0) {
        alert("पहले फोटो जोड़ें");
        return;
    }

    controls.style.display = "none";
    reelView.style.display = "flex";

    let index = 0;
    showSlide(index);

    const interval = setInterval(() => {
        index++;
        if (index >= slides.length) {
            clearInterval(interval);
            return;
        }
        showSlide(index);
    }, 4000);
}

// Show Slide
function showSlide(index) {

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

// Female Voice
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

    window.speechSynthesis.speak(speech);
}

window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};
