const imageInput = document.getElementById("imageInput");
const userText = document.getElementById("userText");
const controls = document.getElementById("controls");
const reelView = document.getElementById("reelView");
const imageContainer = document.getElementById("imageContainer");
const reelText = document.getElementById("reelText");

let images = [];

// 📷 Multiple Image Upload
imageInput.addEventListener("change", function () {
    images = [];
    imageContainer.innerHTML = "";

    Array.from(this.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("reelImage");
            if (index === 0) img.classList.add("active");
            imageContainer.appendChild(img);
            images.push(img);
        };
        reader.readAsDataURL(file);
    });
});

// 🎨 Dummy Apply (optional)
function applyText() {
    alert("Reel preview 'बोलो' में दिखेगा");
}

// 🎬 Start Reel Mode
function startReel() {

    const text = userText.value.trim();
    if (text === "" || images.length === 0) {
        alert("फोटो और टेक्स्ट दोनों जरूरी हैं");
        return;
    }

    controls.style.display = "none";
    reelView.style.display = "block";

    const lines = text.split("\n");
    let currentLine = 0;
    let currentImage = 0;

    showLine(lines[currentLine]);

    const interval = setInterval(() => {
        currentLine++;
        currentImage++;

        if (currentLine >= lines.length) {
            clearInterval(interval);
            return;
        }

        switchImage(currentImage);
        showLine(lines[currentLine]);

    }, 3000);
}

// 🔄 Image Switch Animation
function switchImage(index) {
    images.forEach(img => img.classList.remove("active"));
    if (images[index % images.length]) {
        images[index % images.length].classList.add("active");
    }
}

// 📝 Show One Line with Multi Color
function showLine(text) {
    const colors = ["red", "cyan", "yellow", "lime", "orange"];
    const words = text.split(" ");
    let colored = "";

    words.forEach((word, i) => {
        const color = colors[i % colors.length];
        colored += `<span style="color:${color}">${word} </span>`;
    });

    reelText.innerHTML = colored;

    speak(text);
}

// 🔊 Female Voice
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
