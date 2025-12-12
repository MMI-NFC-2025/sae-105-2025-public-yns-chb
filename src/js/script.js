/**
 * Interactions JavaScript du site.
 * Visible sur :
 * - Ouverture/fermeture du menu et navigation : https://localhost/ (toutes les pages avec l’en-tête)
 * - Carrousel de galerie : https://localhost/Drake.html, https://localhost/William.html, https://localhost/theodora.html, https://localhost/RemyBond.html
 */
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

/**
 * Filtres du programme (genre, horaire, scène)
 * Visible sur : https://localhost/programme.html
 * Attendu dans le HTML :
 * - Contrôles avec les IDs `filter-genre`, `filter-scene`, `filter-time`
 * - Éléments du programme `.programme__item` avec
 *   `data-genre="..."`, `data-scene="..."`, `data-time="HH:MM"`
 */
(function () {
    const list = document.querySelector(".programme__list");
    const items = document.querySelectorAll(".programme__item");
    const genreSelect = document.getElementById("filter-genre");
    const sceneSelect = document.getElementById("filter-scene");
    const timeSelect = document.getElementById("filter-time");

    if (!list || items.length === 0) return; // Pas sur la page programme

    function isTimeInRange(time, start, end) {
        function toMin(x) {
            var parts = (x || "0:0").split(":");
            var h = parseInt(parts[0] || "0", 10);
            var m = parseInt(parts[1] || "0", 10);
            return h * 60 + m;
        }
        var t = toMin(time);
        var s = toMin(start);
        var e = toMin(end);
        return t >= s && t <= e;
    }

    function matchesFilters(el) {
        var g = (el.dataset.genre || "").toLowerCase();
        var s = (el.dataset.scene || "").toLowerCase();
        var t = el.dataset.time || ""; // HH:MM

        var genreVal = (genreSelect && genreSelect.value ? genreSelect.value : "").toLowerCase();
        var sceneVal = (sceneSelect && sceneSelect.value ? sceneSelect.value : "").toLowerCase();
        var timeVal = timeSelect && timeSelect.value ? timeSelect.value : ""; // "morning" | "afternoon" | "evening" | "HH:MM-HH:MM"

        var genreOk = !genreVal || g === genreVal;
        var sceneOk = !sceneVal || s === sceneVal;

        var timeOk = true;
        if (timeVal) {
            if (timeVal.indexOf("-") !== -1) {
                var parts = timeVal.split("-");
                timeOk = isTimeInRange(t, parts[0], parts[1]);
            } else {
                var hour = parseInt((t.split(":")[0] || "0"), 10);
                if (timeVal === "morning") timeOk = hour >= 6 && hour < 12;
                else if (timeVal === "afternoon") timeOk = hour >= 12 && hour < 18;
                else if (timeVal === "evening") timeOk = hour >= 18 && hour < 24;
                else timeOk = true;
            }
        }

        return genreOk && sceneOk && timeOk;
    }

    function applyFilters() {
        items.forEach(function (el) {
            var show = matchesFilters(el);
            el.style.display = show ? "" : "none";
        });
    }

    if (genreSelect) genreSelect.addEventListener("change", applyFilters);
    if (sceneSelect) sceneSelect.addEventListener("change", applyFilters);
    if (timeSelect) timeSelect.addEventListener("change", applyFilters);

    // Initial
    applyFilters();
})();