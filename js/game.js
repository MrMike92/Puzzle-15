// Reiniciar y saber 

const puzzleContainer = document.getElementById("puzzle");
const lozas = [];
const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let movimientos = 0;
let startTime = 0;
let timerInterval;
let puzzleSolved = false;
let solving = false;

function crearTablero() {
    const ordenInput = document.getElementById("ordenInput").value;
    const ordenArray = ordenInput.split(",").map(Number);

    if (validarOrden(ordenArray)) {
        inicializarTablero(ordenArray);
        movimientos = 0;
        startTime = 0;
        puzzleSolved = false;
        document.getElementById("time").textContent = `Tiempo: 00:00:00:000`;
        document.getElementById("move").textContent = `Movimientos: ${movimientos}`;
    } else {
        alert("Ingrese un orden válido para el tablero.");
    }
}

function validarOrden(ordenArray) {
    return (
        Array.isArray(ordenArray) &&
        ordenArray.length === 16 &&
        new Set(ordenArray).size === 16 &&
        ordenArray.every((number) => !isNaN(number))
    );
}

function inicializarTablero(ordenArray) {
    for (let i = 0; i < ordenArray.length; i++) {
        lozas[i].textContent = ordenArray[i] === 16 ? "" : ordenArray[i].toString();
    }
}

function updatePuzzle() {
    puzzleContainer.innerHTML = "";
    lozas.forEach((loza) => {
        puzzleContainer.appendChild(loza);
    });
}

function resetGame() {
    document.getElementById("crear").disabled = false;
    document.getElementById("resolver").disabled = false;
    movimientos = 0;
    startTime = 0;
    puzzleSolved = false;
    document.getElementById("time").textContent = `Tiempo: 00:00:00:000`;
    document.getElementById("move").textContent = `Movimientos: ${movimientos}`;
    stopTimer();

    for (let i = lozas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lozas[i], lozas[j]] = [lozas[j], lozas[i]];
    }

    lozas.forEach((loza, index) => {
        puzzleContainer.appendChild(loza);
        if (loza.textContent === "16") {
            loza.textContent = "";
        }
    });
}

function isPuzzleSolved() {
    const currentPuzzleState = lozas.map((loza) => {
        if (loza.textContent === "") {
            return 16;
        }
        return parseInt(loza.textContent);
    });
    return JSON.stringify(currentPuzzleState) === JSON.stringify(goalState);
}