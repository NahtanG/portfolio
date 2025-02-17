var rows = 20;
var cols = 30;
var Grid = []; // Matrice pour stocker les valeurs de la grille

// Initialisation de la matrice avec des valeurs aléatoires (0 ou 1)
for (var i = 0; i < rows; i++) {
  Grid[i] = [];
  for (var j = 0; j < cols; j++) {
    Grid[i][j] = Math.round(Math.random());
  }
}

var colors = [
  "white",
  "black",
  "red",
  "orange",
  "yellow",
  "lightgreen",
  "green",
  "blue",
  "indigo",
  "magenta",
  "violet",
  "pink",
  "darkblue",
  "lightblue",
];

var selectedColor = "black"; // Couleur par défaut

var gamecontainer = document.getElementById("game-container");

function createTable() {
  gamecontainer.innerHTML = "";
  var table = document.createElement("table");
  for (var i = 0; i < rows; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < cols; j++) {
      var td = document.createElement("td");
      td.setAttribute("id", "cell" + i + "_" + j);
      td.style.cursor = "pointer"; // Curseur pointer pour indiquer que la cellule est cliquable

      // Affecte la couleur de fond en fonction de la valeur de la cellule
      td.style.backgroundColor = "white";

      // Ajoute un gestionnaire d'événements pour le clic sur la cellule
      td.addEventListener("click", function (event) {
        var cellId = event.target.id;
        var coordinates = cellId.split("_");
        var row = parseInt(coordinates[0].substring(4));
        var col = parseInt(coordinates[1]);
        toggleCellValue(row, col);
      });

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  gamecontainer.appendChild(table);
}

createTable();

// Fonction pour changer la valeur de la cellule lorsqu'elle est cliquée
function toggleCellValue(row, col) {
  Grid[row][col] = (Grid[row][col] + 1) % 2; // Inverse la valeur entre 0 et 1
  changeCellColor(row, col); // Change la couleur de la cellule
}

// Affiche les boutons de couleur
for (var i = 0; i < colors.length; i++) {
  var colorButton = document.createElement("button");
  colorButton.style.backgroundColor = colors[i];
  colorButton.style.width = "40px"; // Set the width of the button
  colorButton.style.height = "20px"; // Set the height of the button
  colorButton.addEventListener("click", function () {
    // Handle color button click event
    selectedColor = this.style.backgroundColor; // Met à jour la couleur sélectionnée
  });
  gamecontainer.appendChild(colorButton);
}

// Change la couleur de la cellule en fonction de la variable color
function changeCellColor(row, col) {
  var clickedCell = document.getElementById("cell" + row + "_" + col);
  clickedCell.style.backgroundColor = selectedColor; // Utilise la couleur sélectionnée
}
// Fonction pour réinitialiser la grille
function resetGrid() {
  selectedColor = "white"; // Réinitialise la couleur sélectionnée
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      Grid[i][j] = 0; // Réinitialise la valeur de chaque cellule à 0
      changeCellColor(i, j); // Change la couleur de chaque cellule
    }
  }
}

// Crée un bouton de réinitialisation
var resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.addEventListener("click", function () {
  resetGrid(); // Appelle la fonction de réinitialisation lorsque le bouton est cliqué
});
gamecontainer.appendChild(resetButton);
