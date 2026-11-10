
/* =========================================
   ÉQUILIBRAGE AUTOMATIQUE DES RANGÉES
========================================= */

/* Calcule la largeur adaptée de chaque image
   lorsqu'elle accompagne un bloc de texte. */

function updateProjectLayout() {

    // Parcourt toutes les rangées de contenus
    document.querySelectorAll(".content-row").forEach(row => {

        const text = row.querySelector(".text-block");
        const media = row.querySelectorAll(".media-block");

        // Sans texte ou avec plusieurs médias :
        // on conserve la disposition CSS classique
        if (!text || media.length !== 1) {
            media.forEach(block => {
                block.style.removeProperty("--media-width");
            });
            return;
        }

        const imageBlock = media[0];
        const image = imageBlock.querySelector("img");

        // Attend que les dimensions naturelles de l'image soient disponibles
        if (!image || !image.complete || !image.naturalWidth) return;

        // Hauteur réelle du texte
        const textHeight = text.getBoundingClientRect().height;

        // Ratio largeur / hauteur de l'image
        const imageRatio = image.naturalWidth / image.naturalHeight;

        // Largeur théorique permettant à l'image
        // d'avoir une hauteur proche de celle du texte
        const idealWidth = textHeight * imageRatio;

        // Limites de largeur pour conserver un équilibre visuel
        const maxWidth = row.getBoundingClientRect().width * 0.45;
        const minWidth = Math.min(160, maxWidth);

        // Largeur finale encadrée
        const finalWidth = Math.max(
            minWidth,
            Math.min(idealWidth, maxWidth)
        );

        // Transmet la largeur calculée au CSS
        imageBlock.style.setProperty(
            "--media-width",
            `${finalWidth}px`
        );

    });
}


/* -----------------------------------------
   INITIALISATION
------------------------------------------ */

// Attend le chargement complet des ressources
window.addEventListener("load", updateProjectLayout);

// Recalcule après un redimensionnement
window.addEventListener("resize", updateProjectLayout);

// Recalcule lorsque les polices sont chargées,
// car elles peuvent modifier la hauteur des textes
if (document.fonts) {
    document.fonts.ready.then(updateProjectLayout);
}

// Recalcule lorsque les images terminent leur chargement
document.querySelectorAll(".media-block img").forEach(image => {
    image.addEventListener("load", updateProjectLayout);
});
