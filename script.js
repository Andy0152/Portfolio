
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(
        ".project-card, .gallery-item, .web-card"
    );

    // Respecter les préférences d'accessibilité
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        return;
    }

    // Activer les animations uniquement si JavaScript fonctionne
    document.body.classList.add("motion-ready");

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elements.forEach((element) => {
        element.classList.add("js-reveal");
        observer.observe(element);
    });
});


```javascript
// =====================================
// GALERIE GRAPHIQUE — AGRANDISSEMENT
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("lightbox-close");

    // Si la galerie n'existe pas sur la page, on arrête cette fonction
    if (!lightbox || !lightboxImage || !closeButton) {
        return;
    }

    const galleryImages = document.querySelectorAll(".gallery-item img");

    // Ouvrir une image en grand
    galleryImages.forEach((img) => {
        img.addEventListener("click", () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent =
                img.closest(".gallery-item")?.querySelector("h3")?.textContent || img.alt;

            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";

            closeButton.focus();
        });
    });

    // Fermer la fenêtre
    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        lightboxImage.src = "";
    }

    closeButton.addEventListener("click", closeLightbox);

    // Fermer en cliquant sur le fond sombre
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
});
```

