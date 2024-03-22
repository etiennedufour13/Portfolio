
//bool de si un type de projet est affiché dans la galerie
var gameDesign = false;
var unity = false;
var web = false;
var travailPlastique = false;
var travailAudio = false;
var modelisation = false;

//section de la galerie (pour y scroller dans la page automatiquement)
var sectionGalerie = document.getElementById("galerie");

document.addEventListener('DOMContentLoaded', function () {

    //tous les textes de tags
    var gameDesignTexts = document.querySelectorAll('.game-design-tag.pas-filter');
    var unityTexts = document.querySelectorAll('.unity-tag.pas-filter');
    var webTexts = document.querySelectorAll('.web-tag.pas-filter');
    var travailPlastiqueTexts = document.querySelectorAll('.travail-plastique-tag.pas-filter');
    var travailAudioTexts = document.querySelectorAll('.travail-audio-tag.pas-filter');
    var modelisationTexts = document.querySelectorAll('.modelisation-tag.pas-filter');

    //les filtres qui sont en on/off
    var gameDesignFiltre = document.querySelector('.game-design-tag.filter');
    var unityFiltre = document.querySelector('.unity-tag.filter');
    var webFiltre = document.querySelector('.web-tag.filter');
    var travailPlastiqueFiltre = document.querySelector('.travail-plastique-tag.filter');
    var travailAudioFiltre = document.querySelector('.travail-audio-tag.filter');
    var modelisationFiltre = document.querySelector('.modelisation-tag.filter');

    //les tags de base (qui resent actifs même si on clic 2 fois sur le même)
    gameDesignTexts.forEach(function (gameDesignText) {
        gameDesignText.addEventListener('click', function () {
            //enlever les bool puis réactiver la concernée (pour le filtrage des projet)
            DesactiverLesFiltres();
            gameDesign = true;

            //aller vers la galerie
            sectionGalerie.scrollIntoView();

            //activer et desactiver visuelement les filtres
            gameDesignFiltre.classList.add('color');
            unityFiltre.classList.remove('color');
            webFiltre.classList.remove('color');
            travailPlastiqueFiltre.classList.remove('color');
            travailAudioFiltre.classList.remove('color');
            modelisationFiltre.classList.remove('color');

            //faire le tri de galerie
            cacherGaleriesProjet();
        });
    });
    unityTexts.forEach(function (unityText) {
        unityText.addEventListener('click', function () {
            DesactiverLesFiltres();
            unity = true;

            sectionGalerie.scrollIntoView();

            gameDesignFiltre.classList.remove('color');
            unityFiltre.classList.add('color');
            webFiltre.classList.remove('color');
            travailPlastiqueFiltre.classList.remove('color');
            travailAudioFiltre.classList.remove('color');
            modelisationFiltre.classList.remove('color');

            cacherGaleriesProjet();
        });
    })
    webTexts.forEach(function (webText) {
        webText.addEventListener('click', function () {
            DesactiverLesFiltres();
            web = true;

            sectionGalerie.scrollIntoView();

            gameDesignFiltre.classList.remove('color');
            unityFiltre.classList.remove('color');
            webFiltre.classList.add('color');
            travailPlastiqueFiltre.classList.remove('color');
            travailAudioFiltre.classList.remove('color');
            modelisationFiltre.classList.remove('color');

            cacherGaleriesProjet();
        });
    });
    travailPlastiqueTexts.forEach(function (travailPlastiqueText) {
        travailPlastiqueText.addEventListener('click', function () {
            DesactiverLesFiltres();
            travailPlastique = true;

            sectionGalerie.scrollIntoView();

            gameDesignFiltre.classList.remove('color');
            unityFiltre.classList.remove('color');
            webFiltre.classList.remove('color');
            travailPlastiqueFiltre.classList.add('color');
            travailAudioFiltre.classList.remove('color');
            modelisationFiltre.classList.remove('color');

            cacherGaleriesProjet();
        });
    });
    travailAudioTexts.forEach(function (travailAudioText) {
        travailAudioText.addEventListener('click', function () {
            DesactiverLesFiltres();
            travailAudio = true;

            sectionGalerie.scrollIntoView();

            gameDesignFiltre.classList.remove('color');
            unityFiltre.classList.remove('color');
            webFiltre.classList.remove('color');
            travailPlastiqueFiltre.classList.remove('color');
            travailAudioFiltre.classList.add('color');
            modelisationFiltre.classList.remove('color');

            cacherGaleriesProjet();
        });
    });
    modelisationTexts.forEach(function (modelisationText) {
        modelisationText.addEventListener('click', function () {
            DesactiverLesFiltres();
            modelisation = true;

            sectionGalerie.scrollIntoView();

            gameDesignFiltre.classList.remove('color');
            unityFiltre.classList.remove('color');
            webFiltre.classList.remove('color');
            travailPlastiqueFiltre.classList.remove('color');
            travailAudioFiltre.classList.remove('color');
            modelisationFiltre.classList.add('color');

            cacherGaleriesProjet();
        });
    });

    //les filtres (qui se désactivent en toggle)
    gameDesignFiltre.addEventListener('click', function () {
        //enlever les bool puis réactiver la concernée (pour le filtrage des projet)
        DesactiverLesFiltres();
        gameDesign = !gameDesign;

        //aller vers la galerie
        sectionGalerie.scrollIntoView();

        //activer et desactiver visuelement les filtres
        gameDesignFiltre.classList.toggle('color');
        unityFiltre.classList.remove('color');
        webFiltre.classList.remove('color');
        travailPlastiqueFiltre.classList.remove('color');
        travailAudioFiltre.classList.remove('color');
        modelisationFiltre.classList.remove('color');

        //faire le tri de galerie
        cacherGaleriesProjet();
    });
    unityFiltre.addEventListener('click', function () {
        DesactiverLesFiltres();
        unity = !unity;

        sectionGalerie.scrollIntoView();

        gameDesignFiltre.classList.remove('color');
        unityFiltre.classList.toggle('color');
        webFiltre.classList.remove('color');
        travailPlastiqueFiltre.classList.remove('color');
        travailAudioFiltre.classList.remove('color');
        modelisationFiltre.classList.remove('color');

        cacherGaleriesProjet();
    });
    webFiltre.addEventListener('click', function () {
        DesactiverLesFiltres();
        web = !web;

        sectionGalerie.scrollIntoView();

        gameDesignFiltre.classList.remove('color');
        unityFiltre.classList.remove('color');
        webFiltre.classList.toggle('color');
        travailPlastiqueFiltre.classList.remove('color');
        travailAudioFiltre.classList.remove('color');
        modelisationFiltre.classList.remove('color');

        cacherGaleriesProjet();
    });
    travailPlastiqueFiltre.addEventListener('click', function () {
        DesactiverLesFiltres();
        travailPlastique = !travailPlastique;

        sectionGalerie.scrollIntoView();

        gameDesignFiltre.classList.remove('color');
        unityFiltre.classList.remove('color');
        webFiltre.classList.remove('color');
        travailPlastiqueFiltre.classList.toggle('color');
        travailAudioFiltre.classList.remove('color');
        modelisationFiltre.classList.remove('color');

        cacherGaleriesProjet();
    });
    travailAudioFiltre.addEventListener('click', function () {
        DesactiverLesFiltres();
        travailAudio = !travailAudio;

        sectionGalerie.scrollIntoView();

        gameDesignFiltre.classList.remove('color');
        unityFiltre.classList.remove('color');
        webFiltre.classList.remove('color');
        travailPlastiqueFiltre.classList.remove('color');
        travailAudioFiltre.classList.toggle('color');
        modelisationFiltre.classList.remove('color');

        cacherGaleriesProjet();
    });
    modelisationFiltre.addEventListener('click', function () {
        DesactiverLesFiltres();
        modelisation = !modelisation;

        sectionGalerie.scrollIntoView();

        gameDesignFiltre.classList.remove('color');
        unityFiltre.classList.remove('color');
        webFiltre.classList.remove('color');
        travailPlastiqueFiltre.classList.remove('color');
        travailAudioFiltre.classList.remove('color');
        modelisationFiltre.classList.toggle('color');

        cacherGaleriesProjet();
    });
});

//désactive tous les filtres
function DesactiverLesFiltres() {
    gameDesign = false;
    unity = false;
    web = false;
    travailPlastique = false;
    travailAudio = false;
    modelisation = false;
}

//appliquer le changement de filtre (pour le filtre)
function ChangeDeFiltre(FiltreVisuel) {

}

//changer la galerie
var messageVide = document.querySelector(".vide");
function cacherGaleriesProjet() {
    var galeriesProjet = document.querySelectorAll(".galerie-projet");

    // Vérifie si toutes les variables sont fausses 
    if (!gameDesign && !unity && !web && !travailPlastique && !travailAudio && !modelisation) {
        // Affiche tous les galeriesProjet
        galeriesProjet.forEach(function (galerie) {
            galerie.style.display = "block";
            cacherMessageVide(true);
        });
    }
    else {
        // Cache les galeriesProjet qui ne correspondent pas aux variables vraies
        var cacherOuPas = false;
        galeriesProjet.forEach(function (galerie) {
            if ((gameDesign && !galerie.classList.contains("game-design")) ||
                (unity && !galerie.classList.contains("unity")) ||
                (web && !galerie.classList.contains("web")) ||
                (travailPlastique && !galerie.classList.contains("travail-plastique")) ||
                (travailAudio && !galerie.classList.contains("travail-audio")) ||
                (modelisation && !galerie.classList.contains("modelisation"))
            ) {
                galerie.style.display = "none";
            }
            else {
                galerie.style.display = "block";
                cacherOuPas = true;
            }
        });

        cacherMessageVide(cacherOuPas);
    }
}

function cacherMessageVide(cacher) {
    if (cacher) {
        messageVide.style.visibility = "hidden";
        messageVide.style.width = '0%';
        messageVide.style.height = '0%';
        messageVide.style.marginTop = '0';
    }
    else {
        messageVide.style.visibility = "visible";
        messageVide.style.width = '100%';
        messageVide.style.height = '100%';
        messageVide.style.marginTop = '10vh';
    }
}
