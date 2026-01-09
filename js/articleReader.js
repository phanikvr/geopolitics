function speakText() {    
    let sections = [];
    const lang = document.getElementById("contentFrame").getAttribute("data-lang") || "en-US";
    const voiceSpeed = lang === "en-US" ? 1.0 : 0.8;
    document.querySelectorAll('.article-body > p, .article-body > h2')
        .forEach(readLine => {
            sections.push(readLine.textContent);
        });
    sections.forEach(async section => {
       await speakAndWait({text: section, voice: lang, rate: voiceSpeed}); 
       await wait(1000);
    });
}


function speakAndWait({text, voice , rate}) {
    let synth = window.speechSynthesis;
    return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.voice = synth.getVoices().filter(v => v.lang === voice)[0]; // Select a specific voice if needed
        utterance.onend = resolve;
        synth.speak(utterance);
    });
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}