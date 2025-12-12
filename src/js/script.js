const toggles = document.querySelectorAll(".menu-btn");
const nav = document.querySelector(".menu");
const logo = document.querySelector(".header__logo");
const page = document.body;

// Vérifie si les éléments existent avant d'ajouter l'événement
if (toggles.length && nav) {
    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const isOpen = toggle.ariaExpanded === "true";
            const isClosed = !isOpen;

            // Mise à jour des attributs ARIA pour tous les boutons
            toggles.forEach(btn => {
                btn.ariaExpanded = isClosed;
            });

            nav.hidden = isOpen;
            if (logo) {
                logo.classList.toggle("header__logo--extend", isClosed);
            }
            page.classList.toggle("u-noscroll", isClosed);
        });
    });

    // Ferme le menu quand on clique sur un lien
    const menuLinks = nav.querySelectorAll(".menu__link");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            toggles.forEach(toggle => {
                toggle.ariaExpanded = false;
            });
            nav.hidden = true;
            if (logo) {
                logo.classList.remove("header__logo--extend");
            }
            page.classList.remove("u-noscroll");
        });
    });
}

/* Gallery Carousel */
const galleryItems = document.querySelectorAll(".gallery__item");
const prevBtn = document.querySelector(".gallery__button--prev");
const nextBtn = document.querySelector(".gallery__button--next");

if (galleryItems.length > 0) {
    let currentIndex = 0;

    function showImage(index) {
        galleryItems.forEach((item, i) => {
            item.classList.toggle("active", i === index);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showImage(currentIndex);
    }

    // Affiche la première image
    showImage(0);

    // Boutons de navigation
    if (nextBtn) nextBtn.addEventListener("click", nextImage);
    if (prevBtn) prevBtn.addEventListener("click", prevImage);

    // Navigation au clavier
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });
}