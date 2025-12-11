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