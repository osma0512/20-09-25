// Lista de mensajes predefinidos para las tarjetas
const mensajesTarjeta = [
    "Eres una persona increíble y especial",
    "Tu amistad es un tesoro invaluable",
    "Cada momento contigo es único",
    "Gracias por ser parte de mi vida",
    "Tu sonrisa ilumina mis días"
];

// Preguntas y respuestas para la trivia
const triviaPreguntas = [
    {
        pregunta: "¿Cuál es mi color favorito?",
        respuesta: ["negro", "rojo"],
        mensaje: "¡Correcto! Me encantan el negro y el rojo"
    },
    {
        pregunta: "¿Cuál es mi comida rápida favorita?",
        respuesta: ["pizza", "hamburguesa"],
        mensaje: "¡Exacto! La pizza y la hamburguesa son mis favoritas"
    }
];

const cartasMensajes = [
    "Tu eres uno de los regalos más hermoso que la vida me ha dado.",
    "Cada momento contigo es un tesoro que guardo en mi corazón.",
    "Tu sonrisa ilumina hasta el día más oscuro.",
    "Gracias por estar siempre a mi lado.",
    "Eres una persona increíble y especial en mi vida."
];

let preguntaActual = 0;
let mensajeActualIndex = 0;

// Función para mostrar un mensaje al hacer clic en una opción
function mostrarMensaje(opcion) {
    ocultarContenidos();
    const contenidoDiv = document.createElement('div');
    contenidoDiv.id = 'contenido-activo';
    contenidoDiv.className = 'contenido-opcion';

    const cerrarBtn = `<button class="cerrar-btn" onclick="ocultarContenidos()">×</button>`;

    switch(opcion) {
        case 1: // Generador de cartas
            const mensajeAleatorio = cartasMensajes[Math.floor(Math.random() * cartasMensajes.length)];
            contenidoDiv.innerHTML = `
                ${cerrarBtn}
                <div class="carta-generador">
                    <h3>Carta Especial</h3>
                    <div class="carta-final">
                        <p>Querida Daliana,</p>
                        <p>${mensajeAleatorio}</p>
                        <p>Con cariño,<br>Owen</p>
                    </div>
                    <button class="generar-btn" onclick="generarNuevaCarta()">Generar nueva carta</button>
                </div>
            `;
            break;

        case 2:
            contenidoDiv.innerHTML = `
                ${cerrarBtn}
                <div class="trivia-container">
                    <h3>Trivia de Amistad</h3>
                    <div class="trivia-pregunta">${triviaPreguntas[preguntaActual].pregunta}</div>
                    <input type="text" id="respuesta-trivia" placeholder="Tu respuesta...">
                    <button onclick="verificarRespuesta()">Verificar</button>
                    <div id="resultado-trivia"></div>
                </div>
            `;
            break;

        case 3:
            contenidoDiv.innerHTML = `
                ${cerrarBtn}
                <div class="tarjeta-animada">
                    <div class="tarjeta" onclick="cambiarMensajeTarjeta(this)">
                        <div class="frente">
                            <h3>¡Haz clic para ver tu mensaje!</h3>
                        </div>
                        <div class="reverso">
                            <p>${mensajesTarjeta[mensajeActualIndex]}</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 4: // Corazones flotantes
            contenidoDiv.innerHTML = `
                ${cerrarBtn}
                <div class="corazones-container" id="corazones-container">
                    <button class="generar-btn" onclick="iniciarCorazones()">Generar corazones</button>
                </div>
            `;
            break;

        case 5: // Generador de poemas
            contenidoDiv.innerHTML = `
                ${cerrarBtn}
                <div class="poema-container">
                    <h3>Poemas para Daliana</h3>
                    <div id="poema" class="poema"></div>
                    <button class="generar-btn" onclick="generarNuevoPoema()">Nuevo poema</button>
                </div>
            `;
            generarNuevoPoema(); // Generamos el primer poema automáticamente
            break;
    }
    document.body.appendChild(contenidoDiv);
}

function generarNuevaCarta() {
    const mensajeAleatorio = cartasMensajes[Math.floor(Math.random() * cartasMensajes.length)];
    const cartaFinal = document.querySelector('.carta-final p:nth-child(2)');
    cartaFinal.textContent = mensajeAleatorio;
    cartaFinal.style.animation = 'aparecer 0.5s ease-in-out';
}

function voltearTarjeta(elemento) {
    elemento.classList.toggle('volteada');
}

function verificarRespuesta() {
    const respuesta = document.getElementById('respuesta-trivia').value.toLowerCase();
    const preguntaActualObj = triviaPreguntas[preguntaActual];
    const esCorrecta = preguntaActualObj.respuesta.includes(respuesta);
    const resultadoDiv = document.getElementById('resultado-trivia');

    if (esCorrecta) {
        resultadoDiv.innerHTML = `<div class="premio">${preguntaActualObj.mensaje}</div>`;
        preguntaActual++;
        
        if (preguntaActual >= triviaPreguntas.length) {
            setTimeout(() => {
                resultadoDiv.innerHTML += `
                    <div class="premio">
                        🎉 ¡Felicidades! Has completado la trivia 🎉
                        <br>¡<3!
                    </div>`;
            }, 1000);
        } else {
            setTimeout(() => {
                mostrarMensaje(2);
            }, 2000);
        }
    } else {
        resultadoDiv.innerHTML = `<div style="color: #ff6b6b;">Intenta de nuevo</div>`;
    }
}

function cambiarMensajeTarjeta(elemento) {
    elemento.classList.toggle('volteada');
    mensajeActualIndex = (mensajeActualIndex + 1) % mensajesTarjeta.length;
    setTimeout(() => {
        const reverso = elemento.querySelector('.reverso p');
        reverso.textContent = mensajesTarjeta[mensajeActualIndex];
    }, 150);
}

function iniciarCorazones() {
    const container = document.getElementById('corazones-container');
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            const corazon = document.createElement('div');
            corazon.className = 'corazon';
            corazon.innerHTML = '❤️';
            corazon.style.left = Math.random() * (container.offsetWidth - 30) + 'px';
            container.appendChild(corazon);
            
            setTimeout(() => corazon.remove(), 3000);
        }, i * 300);
    }
}

function generarNuevoPoema() {
    const poemas = [
        "Para ti Daliana:\n, \nel tiempo ha forjado,\nUn tesoro del destino.",
        "En este día especial:\n\nQuiero decirte sin igual,\nQue tu eres algo verdadero,\nY mi cariño es eterno.",
        "Mi querida dalia:\n\nComo estrella que brilla,\nTu amistad ilumina mi vida,\nGracias por ser quien eres,\nMi pollito de colores querida.",
        "Daliana:\n\nCada momento contigo es especial,\nCada sonrisa un regalo sin igual,\nGracias por tu amistad sincera,\nQue hace mi vida más bella."
    ];
    
    const poemaDiv = document.getElementById('poema');
    if (poemaDiv) {
        poemaDiv.style.opacity = '0';
        
        setTimeout(() => {
            const poemaAleatorio = poemas[Math.floor(Math.random() * poemas.length)];
            poemaDiv.innerHTML = poemaAleatorio.replace(/\n/g, '<br>');
            poemaDiv.style.opacity = '1';
        }, 500);
    }
}

function ocultarContenidos() {
    const contenidoActivo = document.getElementById('contenido-activo');
    if (contenidoActivo) {
        contenidoActivo.remove();
    }
}