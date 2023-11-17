// Para iniciar, contar y parar el tiempo

document.getElementById("time").textContent = `Tiempo: 00:00:00:000`;

function updateTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    const microSeconds = (currentTime - startTime) % 1000;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${microSeconds.toString().padStart(3, '0')}`;
    document.getElementById("time").textContent = `Tiempo: ${timeString}`;
}

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 1);
}

function stopTimer() {
    clearInterval(timerInterval);
}