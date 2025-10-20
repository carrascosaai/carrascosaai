// script.js - maneja voz y búsqueda via fetch al backend
const originInput = document.getElementById("originInput");
const searchBtn = document.getElementById("searchBtn");
const micBtn = document.getElementById("micBtn");
const status = document.getElementById("status");
const resultsEl = document.getElementById("results");

searchBtn.addEventListener("click", () => doSearch(originInput.value));
originInput.addEventListener("keydown", (e)=> { if(e.key==="Enter"){ doSearch(originInput.value)} });

function renderResults(data){
    resultsEl.innerHTML = "";
    if(!data || data.length===0){
        resultsEl.innerHTML = "<p style='color:white'>No se han encontrado resultados.</p>";
        return;
    }
    data.forEach(r=>{
        const div = document.createElement("div");
        div.className = "card-result";
        div.innerHTML = `<h3>${r.origin} → ${r.destination}</h3>
            <p class="price">€ ${r.price}</p>
            <p>${r.date}</p>
            <div class="provider">${r.provider}</div>
            <div><a class="boton-cta" href="${r.link}" target="_blank">Ver vuelo</a></div>`;
        resultsEl.appendChild(div);
    });
}

async function doSearch(origin){
    if(!origin || origin.trim().length<2){ status.innerText = "Introduce una ciudad de origen válida"; return; }
    status.innerText = "Buscando en múltiples proveedores…";
    resultsEl.innerHTML = "";
    try{
        const res = await fetch("/api/search", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({origin})
        });
        const json = await res.json();
        renderResults(json.results);
        status.innerText = `Mostrando ${json.results.length} resultados (simulados).`;
    }catch(e){
        status.innerText = "Error realizando la búsqueda";
        console.error(e);
    }
}

/* Voz: Web Speech API (funciona en Chrome/Edge) */
let recognition;
if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.onstart = ()=> { status.innerText = "Escuchando… di tu ciudad de origen"; }
    recognition.onresult = (ev)=>{
        const text = ev.results[0][0].transcript;
        originInput.value = text;
        status.innerText = `Has dicho: ${text}`;
        doSearch(text);
    }
    recognition.onerror = (e)=> { status.innerText = "Error en reconocimiento de voz"; console.error(e); }
    micBtn.addEventListener("click", ()=> {
        try { recognition.start() } catch(e){ console.error(e) }
    });
}else{
    micBtn.style.display = "none";
}

