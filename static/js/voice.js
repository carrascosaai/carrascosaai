const startVoice = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.start();

    recognition.onresult = function(event) {
        const text = event.results[0][0].transcript.toLowerCase();
        document.getElementById('searchInput').value = text;
        document.getElementById('searchForm').submit();
    }
};

const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
};
