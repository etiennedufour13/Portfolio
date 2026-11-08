/* =========================================
   GESTION DU SCROLL ENTRE LES SECTIONS
========================================= */


/* -----------------------------------------
   1. RÉCUPÉRATION DES SECTIONS
----------------------------------------- */

// Récupération de toutes les sections dans leur ordre HTML
const sections = Array.from(
    document.querySelectorAll(".section")
);

// Position initiale de la section active
let currentSection = Math.round(
    window.scrollY / window.innerHeight
);


/* -----------------------------------------
   2. PARAMÈTRES
----------------------------------------- */

// Distance cumulée nécessaire pour changer de section
const scrollThreshold = 400;

// Temps d'inactivité avant le recentrage
const scrollResetDelay = 200;

// Durée du verrouillage après un changement de section
const scrollLockDuration = 500;


/* -----------------------------------------
   3. VARIABLES INTERNES
----------------------------------------- */

// Accumulation des mouvements de scroll
let scrollAccumulator = 0;

// Empêche plusieurs changements successifs
let scrollLocked = false;

// Identifiant du délai de recentrage
let scrollResetTimer = null;

// Identifiant du verrouillage
let scrollLockTimer = null;


/* -----------------------------------------
   4. DÉPLACEMENT ENTRE LES SECTIONS
----------------------------------------- */

function goToSection(index) {

    // Empêche de dépasser les limites de la page
    index = Math.max(0, Math.min(index, sections.length - 1));

    // Mise à jour de la section active
    currentSection = index;

    // Réinitialisation de l'accumulation
    scrollAccumulator = 0;

    // Annulation du précédent délai de recentrage
    clearTimeout(scrollResetTimer);

    // Déplacement fluide vers la section ciblée
    sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    // Verrouillage temporaire du système
    scrollLocked = true;

    // Libération du verrouillage après la transition
    clearTimeout(scrollLockTimer);

    scrollLockTimer = setTimeout(() => {
        scrollLocked = false;
    }, scrollLockDuration);

}


/* -----------------------------------------
   5. RECENTRAGE SUR LA SECTION ACTIVE
----------------------------------------- */

function recenterSection() {

    // Retour progressif à la section active
    sections[currentSection].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* -----------------------------------------
   6. DÉTECTION DU MOUVEMENT DE SOURIS
----------------------------------------- */

window.addEventListener("wheel", (event) => {

    // Ignore les mouvements horizontaux dominants
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
    }

    // Pendant une transition, empêche les nouveaux mouvements
    if (scrollLocked) {
        event.preventDefault();
        return;
    }

    // Accumulation des mouvements verticaux
    scrollAccumulator += event.deltaY;

    // Annulation du précédent délai d'inactivité
    clearTimeout(scrollResetTimer);


    // Vérification du dépassement du seuil
    if (Math.abs(scrollAccumulator) >= scrollThreshold) {

        // Empêche le mouvement natif supplémentaire
        event.preventDefault();

        // Détermine la direction du changement
        const direction = scrollAccumulator > 0 ? 1 : -1;

        // Passe à la section suivante ou précédente
        goToSection(currentSection + direction);

        return;
    }


    // Si le seuil n'est pas atteint,
    // le navigateur continue son scroll natif.

    // Au bout du délai d'inactivité,
    // on recentre la page sur la section active.

    scrollResetTimer = setTimeout(() => {

        recenterSection();

        // Réinitialisation de l'accumulation
        scrollAccumulator = 0;

    }, scrollResetDelay);

}, { passive: false });


/* -----------------------------------------
   7. GESTION DE LA NAVIGATION TEXTUELLE
----------------------------------------- */

// Récupération des liens de navigation
const navigationLinks = document.querySelectorAll(
    ".main-navigation a"
);

navigationLinks.forEach((link, index) => {

    link.addEventListener("click", (event) => {

        // Empêche le comportement natif du lien
        event.preventDefault();

        // Déplacement vers la section correspondante
        goToSection(index);

    });

});
