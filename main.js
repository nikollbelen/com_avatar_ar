// main.js

// Coordenadas iniciales
let currentLat = -12.214045590727505;
let currentLon = -76.94299953976501;
let currentAlt = 0; // Altura relativa en metros
let currentScale = 1.0; // Escala inicial del dinosaurio

// Paso de movimiento (aprox. centímetros en grados de lat/lon)
// 0.00001 grados son aprox 1.1 metros. Usaremos un paso de 0.5 metros.
const STEP = 0.000005; 
const ALT_STEP = 0.5; // Medio metro por clic en altura
const SCALE_STEP = 0.2; // 20% de escala por clic

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading');
    const controlsContainer = document.getElementById('controls');
    const errorScreen = document.getElementById('error-screen');
    const statusText = document.querySelector('.status');
    
    const dinoModel = document.getElementById('dino-model');
    const measurementTower = document.getElementById('measurement-tower');

    // Referencias a textos de info
    const infoLat = document.getElementById('info-lat');
    const infoLon = document.getElementById('info-lon');
    const infoAlt = document.getElementById('info-alt');
    const infoScale = document.getElementById('info-scale');

    // 1. Construir la Torre de Medición
    // Torre de 10 metros de altura
    for (let i = 0; i <= 10; i++) {
        // Bloque de color
        const block = document.createElement('a-box');
        block.setAttribute('position', `2 ${i} 0`); // A 2 metros a la derecha (X=2) del centro
        block.setAttribute('width', '0.5');
        block.setAttribute('height', '1');
        block.setAttribute('depth', '0.5');
        block.setAttribute('color', i % 2 === 0 ? '#ef4444' : '#ffffff'); // Alternar Rojo/Blanco
        block.setAttribute('opacity', '0.8');

        // Texto del número
        const text = document.createElement('a-text');
        text.setAttribute('value', `${i}m`);
        text.setAttribute('align', 'center');
        text.setAttribute('position', `2 ${i} 0.26`);
        text.setAttribute('color', i % 2 === 0 ? 'white' : 'black');
        text.setAttribute('scale', '1.5 1.5 1.5');
        
        measurementTower.appendChild(block);
        measurementTower.appendChild(text);
    }

    // 2. Manejar eventos de GPS (Ocultar loading cuando haya señal)
    window.addEventListener('gps-camera-update-position', e => {
        if (!loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            controlsContainer.classList.remove('hidden');
        }
        statusText.textContent = "GPS Activo";
        statusText.style.color = "#10b981"; // Verde
    });

    // Timeout de seguridad por si no carga el GPS
    setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
            loadingScreen.querySelector('p').textContent = "Demorando más de lo normal...";
            loadingScreen.querySelector('small').textContent = "Asegúrate de haber dado permisos y tener el GPS encendido.";
        }
    }, 10000);

    // 3. Función para actualizar la posición
    function updatePosition() {
        // Actualizar UI
        infoLat.textContent = currentLat.toFixed(6);
        infoLon.textContent = currentLon.toFixed(6);
        infoAlt.textContent = currentAlt.toFixed(1);
        infoScale.textContent = currentScale.toFixed(1);

        // Actualizar Dino
        dinoModel.setAttribute('gps-entity-place', `latitude: ${currentLat}; longitude: ${currentLon};`);
        dinoModel.setAttribute('position', `0 ${currentAlt} 0`); // Mover en el eje Y (altura)
        dinoModel.setAttribute('scale', `${currentScale} ${currentScale} ${currentScale}`);

        // Actualizar Torre (para que se mueva junto con el Dino)
        measurementTower.setAttribute('gps-entity-place', `latitude: ${currentLat}; longitude: ${currentLon};`);
        measurementTower.setAttribute('position', `0 ${currentAlt} 0`);
    }

    // 4. Listeners para los botones
    document.getElementById('btn-up').addEventListener('click', () => {
        currentLat += STEP; // Mover al Norte
        updatePosition();
    });

    document.getElementById('btn-down').addEventListener('click', () => {
        currentLat -= STEP; // Mover al Sur
        updatePosition();
    });

    document.getElementById('btn-right').addEventListener('click', () => {
        currentLon += STEP; // Mover al Este
        updatePosition();
    });

    document.getElementById('btn-left').addEventListener('click', () => {
        currentLon -= STEP; // Mover al Oeste
        updatePosition();
    });

    document.getElementById('btn-alt-up').addEventListener('click', () => {
        currentAlt += ALT_STEP; // Subir
        updatePosition();
    });

    document.getElementById('btn-alt-down').addEventListener('click', () => {
        currentAlt -= ALT_STEP; // Bajar
        updatePosition();
    });

    document.getElementById('btn-scale-up').addEventListener('click', () => {
        currentScale += SCALE_STEP; // Aumentar tamaño
        updatePosition();
    });

    document.getElementById('btn-scale-down').addEventListener('click', () => {
        if (currentScale > SCALE_STEP) {
            currentScale -= SCALE_STEP; // Disminuir tamaño
            updatePosition();
        }
    });
});
