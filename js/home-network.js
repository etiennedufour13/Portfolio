
/* =========================================
   ÉLÉMENTS DE TAGS SUR LA PAGE D'ACCEUIL
========================================= */


/* -----------------------------------------
   CONFIG.
----------------------------------------- */

// Les texts qui apparaissent :
const networkTexts = [
    "Game Design",
    "UR / Recherche",
    "Travail plastique",
    "Programmation",
    "Realisation video",
    "Design objet"
];

// Liste de couleurs
const networkColors = [
    "rgba(255, 107, 36, 0.85)",
    "rgba(90, 85, 192, 0.85)",
    "rgba(60, 195, 168, 0.85)",
    "rgba(84, 153, 238, 0.85)"
];

// Coordonnées dispos (en %)
const networkPositions = [
    { x: 12, y: 32},
    { x: 30, y: 15 },
    { x: 60, y: 32 },
    { x: 75, y: 26 },
    { x: 85, y: 50 },
    { x: 18, y: 60 },
    { x: 35, y: 75 },
    { x: 55, y: 70 },
    { x: 70, y: 80 }

];

// Nb d'élément affichés
const networkItemCount = 6;

// Amplitude max du floatement
const floatAmplitude = 7;

// Vitesse floatement
const floatSpeed = 0.0005;


/* -----------------------------------------
   RÉCUP. DES ÉLÉMENTS
----------------------------------------- */

const homeSection = document.querySelector(".home-section");
const networkContainer = document.querySelector(".home-network-elements");
const networkSvg = document.querySelector(".home-network-lines");

if (homeSection && networkContainer && networkSvg) {


    /* -------------------------------------
       SÉLECTION ALÉATOIRE
    ------------------------------------- */

    function shuffleArray(array) {

        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

        }

        return shuffled;

    }

    // (évite les doublons là)
    const selectedPositions = shuffleArray(networkPositions)
        .slice(0, Math.min(networkItemCount, networkPositions.length));


    /* -------------------------------------
       CRÉATION DES ÉLÉMENTS
    ------------------------------------- */

    const selectedTexts = shuffleArray(networkTexts);

    const items = [];

    selectedPositions.forEach((position, index) => {

        // Créa du bloc textuel
        const element = document.createElement("div");

        element.classList.add("home-network-item");

        // Attribution texte et couleur
        element.textContent = selectedTexts[index % selectedTexts.length];

        element.style.setProperty(
            "--item-color",
            networkColors[Math.floor(Math.random() * networkColors.length)]
        );

        // Mise dans le conteneur
        networkContainer.appendChild(element);

        // Paramètres indiv du flottement
        items.push({

            element,

            // Pos initiale en %
            x: position.x,
            y: position.y,

            //randomisation (vitesse etc)
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            speedX: 0.7 + Math.random() * 0.6,
            speedY: 0.7 + Math.random() * 0.6

        });

    });


    /* -------------------------------------
       CRÉATION DES CONNEXIONS
    ------------------------------------- */

    const connections = [];

    items.forEach((item, index) => {

        if (items.length < 2) return;

        // Éléments dispos pour la connexion
        const availableItems = items.filter(
            (otherItem, otherIndex) => otherIndex !== index
        );

        // Choix aléatoire d'une destination
        const destination = availableItems[
            Math.floor(Math.random() * availableItems.length)
        ];

        // Évite 2x la même connextion
        const alreadyConnected = connections.some(connection =>
            (connection.from === item && connection.to === destination) ||
            (connection.from === destination && connection.to === item)
        );

        if (alreadyConnected) return;

        // Création ligne SVG
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        networkSvg.appendChild(line);

        connections.push({
            from: item,
            to: destination,
            line
        });

    });

    // X2 pour les lignes
    items.forEach((item, index) => {

        if (items.length < 2) return;

        // Éléments dispos pour la connexion
        const availableItems = items.filter(
            (otherItem, otherIndex) => otherIndex !== index
        );

        // Choix aléatoire d'une destination
        const destination = availableItems[
            Math.floor(Math.random() * availableItems.length)
        ];

        // Évite 2x la même connextion
        const alreadyConnected = connections.some(connection =>
            (connection.from === item && connection.to === destination) ||
            (connection.from === destination && connection.to === item)
        );

        if (alreadyConnected) return;

        // Création ligne SVG
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        networkSvg.appendChild(line);

        connections.push({
            from: item,
            to: destination,
            line
        });

    });


    /* -------------------------------------
       ANIM FLOTTEMENT
    ------------------------------------- */

    let animationStart = null;

    function animateNetwork(timestamp) {

        if (!animationStart) animationStart = timestamp;

        const time = timestamp - animationStart;

        const sectionRect = homeSection.getBoundingClientRect();

        const width = sectionRect.width;
        const height = sectionRect.height;


        // Déplacement de chaque élément
        items.forEach(item => {

            const offsetX = Math.sin(
                time * floatSpeed * item.speedX + item.phaseX
            ) * floatAmplitude;

            const offsetY = Math.sin(
                time * floatSpeed * item.speedY + item.phaseY
            ) * floatAmplitude;

            // Position en pixels
            const x = (item.x / 100) * width + offsetX;
            const y = (item.y / 100) * height + offsetY;

            // Positionnement du bloc
            item.element.style.transform =
                `translate(${x}px, ${y}px) translate(-50%, -50%)`;

            // Mémorisation de la position pour les lignes
            item.currentX = x;
            item.currentY = y;

        });


        /* ---------------------------------
           MAJ DES LIGNES
        --------------------------------- */

        connections.forEach(connection => {

            const from = connection.from;
            const to = connection.to;

            // Centre des boites
            connection.line.setAttribute("x1", from.currentX);
            connection.line.setAttribute("y1", from.currentY);

            connection.line.setAttribute("x2", to.currentX);
            connection.line.setAttribute("y2", to.currentY);

        });


        // Boucle d'anim
        requestAnimationFrame(animateNetwork);

    }

    // Démarrage de l'anim
    requestAnimationFrame(animateNetwork);

}
