let laps = [];
let totalLaps = 0; // Número total de vueltas

function addLap() {
    const lapTimeInput = document.getElementById("lapTimeInput");
    let lapTime = lapTimeInput.value.trim();
    const lapsRemainingInput = document.getElementById("lapsRemainingInput");
    const lapsRemaining = parseInt(lapsRemainingInput.value);

    const timeRegex = /^(\d+:\d{1,2})$/;

    if (timeRegex.test(lapTime) && !isNaN(lapsRemaining) && lapsRemaining > 0) {
        const [minutes, seconds] = lapTime.split(":").map(Number);
        const lapTimeInSeconds = minutes * 60 + seconds;
        laps.push(lapTimeInSeconds);
        displayLapList();
        totalLaps = lapsRemaining;
        displayLapsRemaining();
        displayTotalTimeRemaining();
    } else {
        showAlert("error", "<i class='fas fa-times-circle'></i> Por favor ingresa tiempos y vueltas válidos (mayores que 0) en el formato 'minutos:segundos'.");
    }
}


function displayLapList() {
    const lapListDiv = document.getElementById("lapList");
    lapListDiv.innerHTML = "<h2>Tiempos de Vuelta</h2>";
    const ul = document.createElement("ul");
    laps.forEach((lap, index) => {
        const lapMinutes = Math.floor(lap / 60);
        const lapSeconds = lap % 60;
        const li = document.createElement("li");
        li.textContent = `Vuelta ${index + 1}: ${lapMinutes}:${lapSeconds < 10 ? '0' : ''}${lapSeconds} minutos`;
        ul.appendChild(li);
    });
    lapListDiv.appendChild(ul);
    fadeIn(lapListDiv);
}

function displayLapsRemaining() {
    const lapsRemainingDiv = document.getElementById("lapsRemaining");
    const remainingLaps = totalLaps - laps.length;
    lapsRemainingDiv.innerHTML = `<h2>Vueltas Restantes</h2><p>${remainingLaps} vueltas restantes</p>`;
    fadeIn(lapsRemainingDiv);
}

function displayTotalTimeRemaining() {
    const totalTimeRemainingDiv = document.getElementById("totalTimeRemaining");
    const totalLapTime = laps.reduce((acc, lap) => acc + lap, 0);
    const totalRemainingTime = totalLapTime * (totalLaps - laps.length);

    let totalRemainingHours = Math.floor(totalRemainingTime / 3600);
    let totalRemainingMinutes = Math.floor((totalRemainingTime % 3600) / 60);
    let totalTimeRemainingString = "";

    if (totalRemainingHours > 0) {
        totalTimeRemainingString += `${totalRemainingHours} hora${totalRemainingHours > 1 ? 's' : ''}`;
    }

    if (totalRemainingMinutes > 0) {
        if (totalTimeRemainingString !== "") {
            totalTimeRemainingString += " ";
        }
        totalTimeRemainingString += `${totalRemainingMinutes} minuto${totalRemainingMinutes > 1 ? 's' : ''}`;
    }

    totalTimeRemainingDiv.innerHTML = `<h2>Tiempo Total Restante</h2><p>${totalTimeRemainingString}</p>`;
    fadeIn(totalTimeRemainingDiv);
}

function subtract() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultElement = document.getElementById("result");
    const lapsRemainingInput = document.getElementById("lapsRemainingInput");

    if (!isNaN(num1) && !isNaN(num2)) {
        const result = num1 - num2;
        resultElement.textContent = `Resultado: ${result}`;
        lapsRemainingInput.value = result;
        displayLapsRemaining();
        fadeIn(resultElement);
    } else {
        resultElement.textContent = "Por favor, ingresa números válidos.";
    }
}

// Reemplazar espacios por ':' en el campo de tiempo de vuelta
const lapTimeInput = document.getElementById("lapTimeInput");
lapTimeInput.addEventListener("input", function() {
    this.value = this.value.replace(/\s/g, ':');
});

// Función para aplicar un efecto de fade-in
function fadeIn(element) {
    element.style.opacity = 0;
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.1;
        element.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeInInterval);
        }
    }, 50);
}

function showAlert(type, message) {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert", `alert-${type}`);
    alertDiv.innerHTML = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
