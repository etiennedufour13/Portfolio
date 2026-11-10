/* =========================================
   COPIE DES INFORMATIONS DE CONTACT
========================================= */

// Chaque lien copie son contenu dans le presse-papiers.
document.querySelectorAll(".copy-link").forEach(link => {

    link.addEventListener("click", async (event) => {

        event.preventDefault();

        const textToCopy = link.dataset.copy;

        try {
            await navigator.clipboard.writeText(textToCopy);

            // Feedback visuel temporaire après la copie.
            const originalText = link.textContent;
            link.textContent = "Copié !";

            setTimeout(() => {
                link.textContent = originalText;
            }, 1200);

        } catch (error) {
            console.error("Impossible de copier cette information :", error);
        }

    });

});