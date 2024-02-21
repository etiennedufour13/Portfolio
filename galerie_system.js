
var gameDesign = false;
var developpement = false;

function cacherGaleriesProjet(gameDesign, developpement) {
    var galeriesProjet = document.querySelectorAll(".galerie-projet");

    // Vérifie si toutes les variables sont fausses
    if (!gameDesign && !developpement) {
        // Affiche tous les galeriesProjet
        galeriesProjet.forEach(function (galerie) {
            galerie.style.display = "block";
        });
    }
    else {
        // Cache les galeriesProjet qui ne correspondent pas aux variables vraies
        galeriesProjet.forEach(function (galerie) {
            if ((gameDesign && !galerie.classList.contains("game-design")) ||
                (developpement && !galerie.classList.contains("developpement"))) {
                galerie.style.display = "none";
            }
            else {
                galerie.style.display = "block";
            }
        });
    }
}
