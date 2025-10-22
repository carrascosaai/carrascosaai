// Reconocimiento de voz básico
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = function(event) {
    const texto = event.results[0][0].transcript;
    document.getElementById('destino').value = texto;
};

function empezarVoz() {
    recognition.start();
}
