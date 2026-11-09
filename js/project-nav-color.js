document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".project-header");
    const hero = document.querySelector(".project-hero");

    if (!header || !hero) return;

    let observer;

    function createObserver() {

        if (observer) observer.disconnect();

        const headerHeight = header.offsetHeight;

        observer = new IntersectionObserver(
            ([entry]) => {

                header.classList.toggle(
                    "is-scrolled",
                    !entry.isIntersecting
                );

            },
            {
                rootMargin: `-${headerHeight}px 0px 0px 0px`,
                threshold: 0
            }
        );

        observer.observe(hero);

    }

    createObserver();

    window.addEventListener("resize", createObserver);

});