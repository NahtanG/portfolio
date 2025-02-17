var rows = 20;
var cols = 50;
var Grid = new Array(rows);
var NextGrid = new Array(rows);

var timer;
var timeout = 100;

var gamecontainer = document.getElementById("game-container");
var btnstart = document.getElementById("start-game");
var btnstop = document.getElementById("stop-game");
var btnpause = document.getElementById("pause-game"); // Récupère le bouton "Pause"
var btnrandomize = document.getElementById("randomize"); // Récupère le bouton "Randomize Grid"
// Fonction pour basculer la valeur d'une cellule lorsqu'elle est cliquée
function toggleCellValue(row, col) {
  Grid[row][col] = 1 - Grid[row][col]; // Inverse la valeur entre 0 et 1
  updateTable(); // Met à jour l'affichage de la grille
}

// Crée la table avec les cellules cliquables
function createTable() {
  gamecontainer.innerHTML = "";
  var table = document.createElement("table");
  for (var i = 0; i < rows; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < cols; j++) {
      var td = document.createElement("td");
      td.setAttribute("id", "cell" + i + "_" + j);
      td.style.cursor = "pointer"; // Curseur pointer pour indiquer que la cellule est cliquable

      // Ajoute un gestionnaire d'événements click pour basculer la valeur de la cellule
      td.addEventListener(
        "click",
        (function (row, col) {
          return function () {
            toggleCellValue(row, col);
          };
        })(i, j)
      );

      // Affecte la couleur de fond en fonction de la valeur de la cellule
      if (Grid[i][j] == 1) {
        td.style.backgroundColor = "black";
      } else {
        td.style.backgroundColor = "white";
      }

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  gamecontainer.appendChild(table);
}

// Modifie la fonction startGame pour qu'elle affiche simplement la grille existante
// sans générer de nouvelle grille aléatoire
function startGame() {
  createTable(); // Crée la grille avec les cellules cliquables
}

// Ajoute une fonction pour démarrer le jeu après la création de la grille
function startPlaying() {
  playGame(); // Lance le jeu
}

// Fonction pour mettre à jour l'affichage de la grille
function updateTable() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var td = document.getElementById("cell" + i + "_" + j);
      if (Grid[i][j] == 1) {
        td.style.backgroundColor = "black";
      } else {
        td.style.backgroundColor = "white";
      }
    }
  }
}

// Fonction pour lancer le jeu
function playGame() {
  ComputeNextGrid();
  CopyAndResetNextGrid();
  updateTable();
  timer = setTimeout(playGame, timeout);
}

// Fonction pour mettre en pause le jeu
function pauseGame() {
  clearTimeout(timer);
}

// Fonction pour arrêter le jeu
function stopGame() {
  clearTimeout(timer);
  InitializeGrids(); // Réinitialise la grille à des valeurs nulles
  updateTable(); // Met à jour l'affichage de la grille pour la vider
}

// Initialise les grilles
function InitializeGrids() {
  for (let i = 0; i < rows; i++) {
    Grid[i] = new Array(cols);
    NextGrid[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      Grid[i][j] = 0;
      NextGrid[i][j] = 0;
    }
  }
}

// Fonction pour initialiser des valeurs aléatoires à la grille de départ
function RandomGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      Grid[i][j] = Math.round(Math.random());
    }
  }
}

// Fonction pour afficher la grille dans la console
function DisplayGridConsole(G) {
  console.log("Affichage de grille");
  for (let i = 0; i < rows; i++) {
    console.log(G[i]);
  }
}

// Fonction pour calculer le nombre de voisins vivants d'une cellule
function CountNeighbors(row, col) {
  var count = 0;
  if (row - 1 >= 0 && col - 1 >= 0 && Grid[row - 1][col - 1] == 1) count++;
  if (row - 1 >= 0 && Grid[row - 1][col] == 1) count++;
  if (row - 1 >= 0 && col + 1 < cols && Grid[row - 1][col + 1] == 1) count++;
  if (col - 1 >= 0 && Grid[row][col - 1] == 1) count++;
  if (col + 1 < cols && Grid[row][col + 1] == 1) count++;
  if (row + 1 < rows && col - 1 >= 0 && Grid[row + 1][col - 1] == 1) count++;
  if (row + 1 < rows && Grid[row + 1][col] == 1) count++;
  if (row + 1 < rows && col + 1 < cols && Grid[row + 1][col + 1] == 1) count++;
  return count;
}

// Applique les règles du jeu sur une cellule et met à jour la grille suivante
function ApplyRulesOnCell(row, col) {
  var count_neigh = CountNeighbors(row, col);
  if (Grid[row][col] == 1) {
    if (count_neigh == 2 || count_neigh == 3) {
      NextGrid[row][col] = 1;
    } else {
      NextGrid[row][col] = 0;
    }
  } else {
    if (count_neigh == 3) {
      NextGrid[row][col] = 1;
    }
  }
}

// Calcule la prochaine grille
function ComputeNextGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      ApplyRulesOnCell(i, j);
    }
  }
}

// Copie la grille suivante dans la grille actuelle et réinitialise la grille suivante
function CopyAndResetNextGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      Grid[i][j] = NextGrid[i][j];
      NextGrid[i][j] = 0;
    }
  }
}

btnstart.addEventListener("click", function () {
  startGame();
  startPlaying();
});

btnpause.addEventListener("click", function () {
  pauseGame(); // Appelle la fonction pauseGame() lorsque le bouton "Pause" est cliqué
});

btnstop.addEventListener("click", function () {
  stopGame();
});

btnrandomize.addEventListener("click", function () {
  RandomGrid(); // Appelle la fonction RandomGrid() lorsque le bouton "Randomize Grid" est cliqué
  updateTable(); // Met à jour l'affichage de la grille avec les nouvelles valeurs aléatoires
});

InitializeGrids();
RandomGrid();
createTable(); // Crée la grille initiale
