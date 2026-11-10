
/* =========================================
   GALERIE : CARROUSEL CIRCULAIRE
========================================= */


/* -----------------------------------------
   1. RÉCUPÉRATION DES ÉLÉMENTS
----------------------------------------- */

const track = document.querySelector(".gallery-track");

const nextButton = document.querySelector(".gallery-arrow-right");
const previousButton = document.querySelector(".gallery-arrow-left");


// Initialisation uniquement si tous les éléments existent
if (track && nextButton && previousButton) {

    let isMoving = false;

    // Durée maximale d'attente d'une transition
    const fallbackDuration = 900;

    let fallbackTimer = null;


    /* -------------------------------------
       2. CALCUL DU DÉPLACEMENT
    ------------------------------------- */

    function getStepSize() {

        // Récupération du premier projet
        const card = track.querySelector(".project-card");

        if (!card) return 0;

        // Largeur réelle de la carte
        const cardWidth = card.getBoundingClientRect().width;

        // Espacement réel entre les cartes
        const gap = parseFloat(
            getComputedStyle(track).gap
        ) || 0;

        return cardWidth + gap;

    }


    /* -------------------------------------
       3. FINALISATION D'UN DÉPLACEMENT
    ------------------------------------- */

    function finishMovement(callback) {

        // Annule le délai de secours
        clearTimeout(fallbackTimer);

        // Exécute la réorganisation éventuelle
        if (callback) callback();

        // Replace la piste sans animation
        track.style.transition = "none";
        track.style.transform = "translateX(0)";

        // Force le navigateur à appliquer le changement
        track.offsetHeight;

        // Restaure la transition CSS
        track.style.transition = "";

        // Libère le carrousel
        isMoving = false;

    }


    /* -------------------------------------
       4. ATTENTE DE LA FIN DE TRANSITION
    ------------------------------------- */

    function waitForTransition(callback) {

        // Fonction de finalisation unique
        function onTransitionEnd(event) {

            // Ignore les événements provenant des enfants
            if (event.target !== track) return;

            // Ignore les propriétés autres que transform
            if (event.propertyName !== "transform") return;

            // Supprime l'écouteur après le bon événement
            track.removeEventListener("transitionend", onTransitionEnd);

            // Finalise le déplacement
            finishMovement(callback);

        }

        // Écoute la fin réelle de la transition de la piste
        track.addEventListener("transitionend", onTransitionEnd);

        // Sécurité si transitionend n'est jamais déclenché
        fallbackTimer = setTimeout(() => {

            track.removeEventListener("transitionend", onTransitionEnd);

            finishMovement(callback);

        }, fallbackDuration);

    }


    /* -------------------------------------
       5. DÉPLACEMENT VERS LA DROITE
    ------------------------------------- */

    function moveNext() {

        // Empêche les clics pendant une animation
        if (isMoving) return;

        // Vérifie le nombre de projets disponibles
        if (track.children.length < 2) return;

        isMoving = true;

        const step = getStepSize();

        if (step <= 0) {
            finishMovement();
            return;
        }

        // Prépare l'écouteur AVANT de lancer l'animation
        waitForTransition(() => {

            // Récupère le premier projet
            const firstCard = track.firstElementChild;

            // Le déplace à la fin de la piste
            track.appendChild(firstCard);

        });

        // Déplace progressivement la piste vers la gauche
        track.style.transform = `translateX(-${step}px)`;

    }


    /* -------------------------------------
       6. DÉPLACEMENT VERS LA GAUCHE
    ------------------------------------- */

    function movePrevious() {

        // Empêche les clics pendant une animation
        if (isMoving) return;

        if (track.children.length < 2) return;

        isMoving = true;

        const step = getStepSize();

        if (step <= 0) {
            finishMovement();
            return;
        }

        // Désactive temporairement les transitions
        track.style.transition = "none";

        // Récupère le dernier projet
        const lastCard = track.lastElementChild;

        // Le replace au début de la piste
        track.prepend(lastCard);

        // Positionne la piste avant le déplacement
        track.style.transform = `translateX(-${step}px)`;

        // Force l'application de cette position
        track.offsetHeight;

        // Réactive la transition CSS
        track.style.transition = "";

        // Prépare l'écouteur de fin de transition
        waitForTransition();

        // Lance l'animation vers la position initiale
        requestAnimationFrame(() => {

            track.style.transform = "translateX(0)";

        });

    }


    /* -------------------------------------
       7. ÉCOUTE DES CLICS
    ------------------------------------- */

    nextButton.addEventListener("click", moveNext);

    previousButton.addEventListener("click", movePrevious);


    /* -------------------------------------
       8. REDIMENSIONNEMENT
    ------------------------------------- */

    window.addEventListener("resize", () => {

        // Ne modifie pas la piste pendant une animation
        if (isMoving) return;

        // Réinitialise sa position
        track.style.transition = "none";
        track.style.transform = "translateX(0)";

        track.offsetHeight;

        track.style.transition = "";

    });

}
