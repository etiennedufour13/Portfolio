const introConfig = {
    // Nombre de pixels horizontaux pour chaque étape
    pixelLevels: [8, 16, 32, 64, 128],

    // Durée d'affichage de chaque niveau de pixellisation
    pixelDuration: 120,

    // Temps d'attente avant l'apparition du titre
    titleDelay: 5,

    // Vitesse d'apparition des lettres
    typingSpeed: 65,

    // Vitesse d'apparition/disparition du point
    dotDuration: 80,

    // Nombre de clignotements du point
    dotCount: 4
};


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function createPixelCanvas(card, image) {
    const canvas = document.createElement("canvas");
    canvas.classList.add("project-pixel-canvas");

    image.insertAdjacentElement("afterend", canvas);

    const context = canvas.getContext("2d");

    if (!context) {
        canvas.remove();
        return null;
    }

    card.classList.add("has-pixel-canvas");

    return { canvas, context };
}


function drawPixelImage(context, image, width, height) {
    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;

    if (!sourceWidth || !sourceHeight) return;

    const sourceRatio = sourceWidth / sourceHeight;
    const targetRatio = width / height;

    let sx = 0;
    let sy = 0;
    let sw = sourceWidth;
    let sh = sourceHeight;

    if (sourceRatio > targetRatio) {
        sw = sourceHeight * targetRatio;
        sx = (sourceWidth - sw) / 2;
    } else {
        sh = sourceWidth / targetRatio;
        sy = (sourceHeight - sh) / 2;
    }

    context.clearRect(0, 0, width, height);
    context.imageSmoothingEnabled = false;

    context.drawImage(
        image,
        sx, sy, sw, sh,
        0, 0, width, height
    );
}


function setPixelLevel(canvas, context, image, resolution) {
    const card = canvas.closest(".project-card");

    const width = card.clientWidth;
    const height = card.clientHeight;

    if (!width || !height) return;

    const ratio = height / width;

    let canvasWidth;
    let canvasHeight;

    if (resolution === "full") {
        const dpr = window.devicePixelRatio || 1;

        canvasWidth = Math.round(width * dpr);
        canvasHeight = Math.round(height * dpr);
    } else {
        canvasWidth = resolution;
        canvasHeight = Math.max(1, Math.round(resolution * ratio));
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    drawPixelImage(context, image, canvasWidth, canvasHeight);
}


function isCurrentRun(card, runId) {
    return card._introRunId === runId;
}


async function animateTitle(card, runId) {
    const title = card.querySelector(".project-title");

    if (!title) return;

    const originalTitle = card._originalTitle;
    const upperTitle = originalTitle.toUpperCase();

    title.textContent = "";

    const textNode = document.createTextNode("");

    const dot = document.createElement("span");
    dot.classList.add("typing-dot");
    dot.textContent = ".";

    title.appendChild(textNode);
    title.appendChild(dot);

    card.classList.add("is-typing");

    for (let i = 0; i < upperTitle.length; i++) {
        if (!isCurrentRun(card, runId)) return;

        textNode.textContent += upperTitle[i];

        await wait(introConfig.typingSpeed);
    }

    if (!isCurrentRun(card, runId)) return;

    for (let i = 0; i < introConfig.dotCount; i++) {
        dot.style.opacity = "1";
        await wait(introConfig.dotDuration);

        if (!isCurrentRun(card, runId)) return;

        dot.style.opacity = "0";
        await wait(introConfig.dotDuration);
    }

    if (!isCurrentRun(card, runId)) return;

    title.textContent = originalTitle;

    card.classList.remove("is-typing");
}


async function animateCard(card) {
    const image = card.querySelector(".project-image");
    const title = card.querySelector(".project-title");

    if (!image || !title) return;

    const runId = ++card._introRunId;

    card.classList.add("is-intro-active", "is-intro");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        card.classList.remove("is-intro-active", "is-intro");
        return;
    }

    try {
        await image.decode();
    } catch (error) {
        if (!image.naturalWidth) {
            card.classList.remove("is-intro-active", "is-intro");
            return;
        }
    }

    if (!isCurrentRun(card, runId)) return;

    if (!card._pixelCanvas) {
        card._pixelCanvas = createPixelCanvas(card, image);
    }

    if (!card._pixelCanvas) {
        card.classList.remove("is-intro-active", "is-intro");
        return;
    }

    const { canvas, context } = card._pixelCanvas;

    // Parcours de tous les niveaux définis dans pixelLevels
    for (const level of introConfig.pixelLevels) {
        if (!isCurrentRun(card, runId)) return;

        setPixelLevel(canvas, context, image, level);

        await wait(introConfig.pixelDuration);
    }

    if (!isCurrentRun(card, runId)) return;

    // Retour à la résolution normale
    setPixelLevel(canvas, context, image, "full");

    await wait(introConfig.titleDelay);

    if (!isCurrentRun(card, runId)) return;

    await animateTitle(card, runId);

    if (!isCurrentRun(card, runId)) return;

    card.classList.remove("is-intro-active", "is-intro");
}


function resetCardIntro(card) {
    // Invalide toute animation encore en cours
    card._introRunId++;

    const title = card.querySelector(".project-title");

    if (title && card._originalTitle) {
        title.textContent = card._originalTitle;
    }

    card.classList.remove(
        "is-intro-active",
        "is-intro",
        "is-typing"
    );

    // L'image reste affichée à sa résolution normale
    if (card._pixelCanvas) {
        const { canvas, context } = card._pixelCanvas;
        const image = card.querySelector(".project-image");

        setPixelLevel(canvas, context, image, "full");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const viewport = document.querySelector(".gallery-viewport");
    const cards = document.querySelectorAll(".project-card");

    if (!viewport || !cards.length) return;

    cards.forEach(card => {
        const title = card.querySelector(".project-title");

        card._introRunId = 0;
        card._pixelCanvas = null;
        card._originalTitle = title ? title.textContent.trim() : "";
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const card = entry.target;

            if (entry.isIntersecting) {
                animateCard(card);
            } else {
                resetCardIntro(card);
            }
        });
    }, {
        root: viewport,
        threshold: 0.15
    });

    cards.forEach(card => observer.observe(card));
});