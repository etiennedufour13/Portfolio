// =========================================
// 1. CONFIGURATION
// =========================================

// Temps pendant lequel chaque vidéo reste active
const backgroundInterval = 3500;

// Durée du fondu CSS entre deux vidéos
const fadeDuration = 1000;


// =========================================
// 2. RÉCUPÉRATION DES VIDÉOS
// =========================================

const backgroundVideos = document.querySelectorAll(".background-gif");

let currentVideo = 0;


// =========================================
// 3. INITIALISATION
// =========================================

backgroundVideos.forEach((video, index) => {

    video.muted = true;
    video.playsInline = true;
    video.loop = false;

    // Seule la première vidéo est visible et lancée
    if (index === 0) {
        video.classList.add("active");
        video.currentTime = 0;
        video.play();
    } else {
        video.classList.remove("active");
        video.pause();
    }

});


// =========================================
// 4. CHANGEMENT DE VIDÉO
// =========================================

function changeBackground() {

    const previousVideo = backgroundVideos[currentVideo];

    // Masquer la vidéo actuelle
    previousVideo.classList.remove("active");

    // Passer à la vidéo suivante
    currentVideo = (currentVideo + 1) % backgroundVideos.length;

    const nextVideo = backgroundVideos[currentVideo];

    // Repartir du début à chaque activation
    nextVideo.currentTime = 0;

    // Afficher et lancer la nouvelle vidéo
    nextVideo.classList.add("active");
    nextVideo.play();

    // Arrêter l'ancienne vidéo après son fondu de sortie
    setTimeout(() => {
        previousVideo.pause();
    }, fadeDuration);

}


// =========================================
// 5. LANCEMENT AUTOMATIQUE
// =========================================

if (backgroundVideos.length > 1) {
    setInterval(changeBackground, backgroundInterval);
}