
var gameDesign = false;
var unity = false;
var web = false;
var travailPlastique = false;
var travailAudio = false;
var modelisation = false;
document.addEventListener('DOMContentLoaded', function () {

    //clic d'un tag (pas pareil que filtre, ca ne fait pas de on/off, juste on)
    var gameDesignTexts = document.querySelectorAll('.game-design-tag.pas-filter');
    var unityTexts = document.querySelectorAll('.unity-tag.pas-filter');
    var webTexts = document.querySelectorAll('.web-tag.pas-filter');
    var travailPlastiqueTexts = document.querySelectorAll('.travail-plastique-tag.pas-filter');
    var travailAudioTexts = document.querySelectorAll('.travail-audio-tag.pas-filter');
    var modelisationTexts = document.querySelectorAll('.modelisation-tag.pas-filter');

    var sectionGalerie = document.getElementById("galerie");
    

    gameDesignTexts.forEach(function (gameDesignText) {
        gameDesignText.addEventListener('click', function () {
            gameDesign = true;
            gameDesignFiltre.classList.add('color');
            cacherGaleriesProjet();
            sectionGalerie.scrollIntoView();
        });
    });
    unityTexts.forEach(function (unityText) {
        unityText.addEventListener('click', function () {
            unity = true;
            unityFiltre.classList.add('color');
            cacherGaleriesProjet();
            sectionGalerie.scrollIntoView();
        });
    })
    webTexts.forEach(function (webText) {
        webText.addEventListener('click', function () {
            web = true;
            webFiltre.classList.add('color');
            cacherGaleriesProjet();
            sectionGalerie.scrollIntoView();
        });
    });
    travailPlastiqueTexts.forEach(function (travailPlastiqueText) {
        travailPlastiqueText.addEventListener('click', function () {
            travailPlastique = true;
            travailPlastiqueFiltre.classList.add('color');
            cacherGaleriesProjet();
            sectionGalerie.scrollIntoView();
        });
    });
    travailAudioTexts.forEach(function (travailAudioText) {
        travailAudioText.addEventListener('click', function () {
            travailAudio = true;
            travailAudioFiltre.classList.add('color');
            cacherGaleriesProjet();
            sectionGalerie.scrollIntoView();
        });
    });
    modelisationTexts.forEach(function (modelisationText) {
        modelisationText.addEventListener('click', function () {
            modelisation = true;
            modelisationFiltre.classList.add('color');
            cacherGaleriesProjet();
            sectionGalerie.scrollIntoView();
        });
    });

    //clic d'un filtre (pas pareil que tag, c'est au dessus de la galerie)
    var gameDesignFiltre = document.querySelector('.game-design-tag.filter');
    var unityFiltre = document.querySelector('.unity-tag.filter');
    var webFiltre = document.querySelector('.web-tag.filter');
    var travailPlastiqueFiltre = document.querySelector('.travail-plastique-tag.filter');
    var travailAudioFiltre = document.querySelector('.travail-audio-tag.filter');
    var modelisationFiltre = document.querySelector('.modelisation-tag.filter');

    gameDesignFiltre.addEventListener('click', function () {
        gameDesignFiltre.classList.toggle('color');
        gameDesign = !gameDesign;
        cacherGaleriesProjet();
    });
    unityFiltre.addEventListener('click', function () {
        unityFiltre.classList.toggle('color');
        unity = !unity;
        cacherGaleriesProjet();
    });
    webFiltre.addEventListener('click', function () {
        webFiltre.classList.toggle('color');
        web = !web;
        cacherGaleriesProjet();
    });
    travailPlastiqueFiltre.addEventListener('click', function () {
        travailPlastiqueFiltre.classList.toggle('color');
        travailPlastique = !travailPlastique;
        cacherGaleriesProjet();
    });
    travailAudioFiltre.addEventListener('click', function () {
        travailAudioFiltre.classList.toggle('color');
        travailAudio = !travailAudio;
        cacherGaleriesProjet();
    });
    modelisationFiltre.addEventListener('click', function () {
        modelisationFiltre.classList.toggle('color');
        modelisation = !modelisation;
        cacherGaleriesProjet();
    });

});

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
