// IA (Algoritmo Greedy)

function solvePuzzle() {
    movimientos = 0;
    startTime = 0;
    
    document.getElementById("ad_search").style.display = "block";

    if (puzzleSolved || solving) {
        return;
    }

    solving = true;
    const maxIterations = 10000;
    const maxDepth = 10000;
    let depth = 0;
    let iterations = 0;

    function solveStep() {
        const openList = [];
        const closedList = new Set();
        const startState = lozas.map((loza) => (loza.textContent === "" ? 16 : parseInt(loza.textContent)));
        const startNode = {
            state: startState,
            parent: null,
            g: 0,
            h: heuristic(startState),
        };

        openList.push(startNode);

        function processNextNode() {
            if (openList.length === 0 || iterations >= maxIterations || depth > maxDepth) {
                solving = false;
                if (iterations >= maxIterations || depth > maxDepth) {
                    document.getElementById("ad_search").style.display = "none";
                    alert("No pude encontrar una solución");
                }
                return;
            }

            openList.sort((a, b) => a.g + a.h - (b.g + b.h));
            const currentNode = openList.shift();
            const currentLozas = lozas.slice();
            currentLozas.forEach((loza, index) => (loza.textContent = currentNode.state[index].toString()));

            if (isPuzzleSolved()) {
                reconstructPath(currentNode);
                solving = false;
                return;
            }

            closedList.add(JSON.stringify(currentNode.state));

            for (let i = 0; i < currentLozas.length; i++) {
                if (currentLozas[i].textContent === "") {
                    continue;
                }
                const neighbors = getLegalNeighbors(i, currentLozas);
                for (const neighbor of neighbors) {
                    const neighborState = currentNode.state.slice();
                    [neighborState[i], neighborState[neighbor]] = [neighborState[neighbor], neighborState[i]];
                    if (!closedList.has(JSON.stringify(neighborState))) {
                        const gScore = currentNode.g + 1;
                        const hScore = heuristic(neighborState);
                        const fScore = gScore + hScore;
                        openList.push({
                            state: neighborState,
                            parent: currentNode,
                            g: gScore,
                            h: hScore,
                            f: fScore,
                        });
                    }
                }
            }
            iterations++;
            depth++;
            setTimeout(processNextNode, 0);
        }
        processNextNode();
    }
    solveStep();
}

function getLegalNeighbors(index, currentLozas) {
    const neighbors = [];
    const row = Math.floor(index / 4);
    const col = index % 4;
    const possibleMoves = [
        { row: -1, col: 0 }, // Arriba
        { row: 1, col: 0 },  // Abajo
        { row: 0, col: -1 }, // Izquierda
        { row: 0, col: 1 },  // Derecha
    ];
    for (const move of possibleMoves) {
        const newRow = row + move.row;
        const newCol = col + move.col;
        if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4) {
            const neighborIndex = newRow * 4 + newCol;
            if (currentLozas[neighborIndex].textContent === "16") {
                neighbors.push(neighborIndex);
            }
        }
    }
    return neighbors;
}


function heuristic(state) {
    let h = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i] !== 16) {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const targetRow = Math.floor((state[i] - 1) / 4);
            const targetCol = (state[i] - 1) % 4;
            h += Math.abs(row - targetRow) + Math.abs(col - targetCol);
        }
    }
    return h;
}

function reconstructPath(node) {
    const path = [];
    while (node.parent) {
        path.unshift(node.state);
        node = node.parent;
    }

    for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
            movimientos++;
            document.getElementById("move").textContent = `Movimientos: ${movimientos}`;
            if (movimientos === 1) {
                startTimer();
            }
            lozas.forEach((loza, index) => (loza.textContent = path[i][index] === 16 ? "" : path[i][index].toString()));
            if (i === path.length - 1) {
                puzzleSolved = true;
                document.getElementById("ad_search").style.display = "none";
                alert("¡Rompecabezas resuelto!");
                stopTimer();
            }
        }, i * 1000);
    }
}