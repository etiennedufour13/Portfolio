/* =========================================
   CHARGEMENT INTELLIGENT DES FONDS VIDÉO
========================================= */

// Récupération des vidéos présentes dans les sections.
const sectionVideos = document.querySelectorAll(
    ".section-background-video"
);

// Respect des préférences de réduction des animations.
const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// Vérification de la préférence d'économie de données.
const saveData = navigator.connection?.saveData ?? false;


/* -----------------------------------------
   1. CHARGEMENT D'UNE VIDÉO
----------------------------------------- */

function loadVideo(video) {

    // Évite de charger plusieurs fois les mêmes sources.
    if (!video.dataset.loaded) {

        video.querySelectorAll("source[data-src]").forEach(source => {
            source.src = source.dataset.src;
            source.removeAttribute("data-src");
        });

        video.dataset.loaded = "true";
        video.load();
    }

    // Lance la lecture après le chargement.
    video.play().catch(error => {
        console.warn("Lecture vidéo impossible :", error);
    });
}


/* -----------------------------------------
   2. ACTIVATION SELON LA VISIBILITÉ
----------------------------------------- */

// Les vidéos ne sont chargées que lorsque leur section
// approche du viewport.
if (!reducedMotion && !saveData) {

    const videoObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            const video = entry.target;

            if (entry.isIntersecting) {

                // Charge et lance la vidéo à proximité de l'écran.
                loadVideo(video);

            } else {

                // Suspend la lecture hors de l'écran.
                video.pause();
            }

        });

    }, {
        rootMargin: "100px 0px"
    });

    sectionVideos.forEach(video => {
        videoObserver.observe(video);
    });

}