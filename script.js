
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("active");
});

// Close menu after clicking a link
const links = document.querySelectorAll(".navbar a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        navbar.classList.remove("active");
    });
});

// MENU FILTER SYSTEM

const filterButtons = document.querySelectorAll(".filter-btn");

const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // 1. Supprimer active des anciens boutons
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // 2. Ajouter active au bouton sélectionné
        button.classList.add("active");

        // 3. Récupérer la catégorie
        const category = button.dataset.filter;

        // 4. Filtrer les cartes
        menuCards.forEach(function(card) {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});

/* ===== SCROLL ANIMATION ===== */

// Select elements
const revealElements = document.querySelectorAll(
    ".about, .section-title, .menu-card, .gallery-container img, .contact-content"
);

// Add reveal class
revealElements.forEach(function(element) {
    element.classList.add("reveal");
});

// Create observer
const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

// Observe elements
revealElements.forEach(function(element) {
    observer.observe(element);
});

// ===== RESERVATION FORM =====

const reservationForm = document.getElementById("reservation-form");

const dateInput = document.getElementById("date");
const phoneInput = document.getElementById("telephone");
const message = document.getElementById("form-message");

// Empêcher de choisir une date passée
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;



reservationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const date = document.getElementById("date").value;
    const heure = document.getElementById("heure").value;
    const personnes = document.getElementById("personnes").value;

    const telephoneValide = /^0[67][0-9]{8}$/.test(telephone);

    if (!nom || !telephone || !date || !heure || !personnes) {
        message.textContent = "Veuillez remplir tous les champs.";
        message.style.color = "red";
        return;
    }

    if (!telephoneValide) {
        message.textContent = "Numéro de téléphone invalide.";
        message.style.color = "red";
        return;
    }

    const texte =
        "Bonjour Dar Zellij !\n\n" +
        "Je souhaite réserver une table.\n\n" +
        "Nom : " + nom + "\n" +
        "Téléphone : " + telephone + "\n" +
        "Date : " + date + "\n" +
        "Heure : " + heure + "\n" +
        "Nombre de personnes : " + personnes + "\n\n" +
        "Merci de confirmer ma réservation.";

    const numeroWhatsApp = "212621171484";

    const url = "https://wa.me/" + numeroWhatsApp +
        "?text=" + encodeURIComponent(texte);

    window.open(url, "_blank");

    message.textContent =
        "Votre demande est prête à être envoyée sur WhatsApp.";

    message.style.color = "#d9aa45";

});



