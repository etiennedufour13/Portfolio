document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll("section");
    var nav1 = document.querySelector('.nav-presentation');
    var nav2 = document.querySelector('.nav-projets');
    var nav3 = document.querySelector('.nav-galerie');
    var nav4 = document.querySelector('.nav-contact');


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id == 'presentation') {
                    nav1.classList.add("active");
                    nav2.classList.remove("active");
                    nav3.classList.remove("active")
                    nav4.classList.remove("active");
                }
                else if (entry.target.id == 'projets') {
                    nav1.classList.remove("active");
                    nav2.classList.add("active");
                    nav3.classList.remove("active")
                    nav4.classList.remove("active");
                }
                else if (entry.target.id == 'galerie') {
                    nav1.classList.remove("active");
                    nav2.classList.remove("active");
                    nav3.classList.add("active")
                    nav4.classList.remove("active");
                }
                else if (entry.target.id == 'contact') {
                    nav1.classList.remove("active");
                    nav2.classList.remove("active");
                    nav3.classList.remove("active")
                    nav4.classList.add("active");
                }
            }
        });
    }, {
        threshold: 0.5 // La section est considérée comme visible si plus de 40% de celle-ci est visible dans la fenêtre
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});