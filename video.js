let recognition = null;
let isRunning = false;

const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const liveCaption = document.getElementById("liveCaption");
const videoContainer = document.getElementById("videoContainer");

// 🎬 Upload Video
videoInput.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        videoPlayer.src = URL.createObjectURL(file);
        liveCaption.innerHTML = "";
    }
});

// 🎨 Random Color
function randomColor(){
    return "hsl(" + Math.floor(Math.random()*360) + ",100%,60%)";
}

// 🎨 Multi Color
function multiColor(text){
    const words = text.trim().split(" ");
    let result = "";
    words.forEach(word=>{
        result += `<span style="color:${randomColor()}">${word} </span>`;
    });
    return result;
}

// 🎤 Start Recognition
function startRecognition(){

    if(!('webkitSpeechRecognition' in window)){
        alert("Speech Recognition support नहीं है");
        return;
    }

    if(isRunning) return;

    recognition = new webkitSpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = function(event){
        let text = event.results[event.results.length-1][0].transcript;
        if(text.trim() !== ""){
            liveCaption.innerHTML = multiColor(text);
        }
    };

    recognition.onerror = function(e){
        console.log("Speech error:", e.error);
    };

    recognition.onend = function(){
        isRunning = false;
    };

    recognition.start();
    isRunning = true;
}

// 🛑 Stop Recognition
function stopRecognition(){
    if(recognition && isRunning){
        recognition.stop();
        isRunning = false;
    }
}

// 🔳 Fullscreen Container
function goFullScreen(){
    if(videoContainer.requestFullscreen){
        videoContainer.requestFullscreen();
    }else if(videoContainer.webkitRequestFullscreen){
        videoContainer.webkitRequestFullscreen();
    }
}

// 🔙 Back
function goBack(){
    window.location.href = "index.html";
}
