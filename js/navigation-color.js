//ptit code simplement pour lancer le changement de couleur de la barre de nav dans la zone de la galerie

const navigation = document.querySelector(".main-navigation");
const gallerySection = document.querySelector(".gallery-section");

const galleryObserver = new IntersectionObserver(
    ([entry]) => {
        navigation.classList.toggle("gallery-active", entry.isIntersecting);
    },
    {
        threshold: 0.5
    }
);

if (navigation && gallerySection) {
    galleryObserver.observe(gallerySection);
}