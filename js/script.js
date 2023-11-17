// Para mover las lozas del puzzle

document.getElementById("move").textContent = `Movimientos: ${movimientos}`;
document.getElementById("mezclar").addEventListener("click", resetGame);
document.getElementById("resolver").addEventListener("click", solvePuzzle);
document.getElementById("crear").addEventListener("click", crearTablero);

for (let i = 1; i < 17; i++) {
  const loza = document.createElement("div");
  loza.className = "loza";
  loza.textContent = i;
  lozas.push(loza);
}

lozas.forEach((loza, index) => {
  puzzleContainer.appendChild(loza);
  if (loza.textContent === "16") {
    loza.textContent = "";
  }
  loza.addEventListener("click", () => {
    if (puzzleSolved) {
      return;
    }
    const currentIndex = lozas.indexOf(loza);
    const zeroIndex = lozas.findIndex((loza) => loza.textContent === "");
    if (isAdjacent(currentIndex, zeroIndex)) {
      [lozas[currentIndex], lozas[zeroIndex]] = [lozas[zeroIndex], lozas[currentIndex]];
      updatePuzzle();
      movimientos++;
      document.getElementById("move").textContent = `Movimientos: ${movimientos}`;
      if (movimientos === 1) {
        startTimer();
        document.getElementById("crear").disabled = true;
        document.getElementById("resolver").disabled = true;
      }
      if (isPuzzleSolved()) {
        stopTimer();
        document.getElementById("crear").disabled = false;
        document.getElementById("resolver").disabled = false;
        alert("¡Rompecabezas resuelto!");
        puzzleSolved = true;
      }
    }
  });
});

function isAdjacent(index1, index2) {
  const row1 = Math.floor(index1 / 4);
  const col1 = index1 % 4;
  const row2 = Math.floor(index2 / 4);
  const col2 = index2 % 4;

  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}