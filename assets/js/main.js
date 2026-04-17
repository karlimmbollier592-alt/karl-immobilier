document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Animation du hamburger (optionnel)
            const spans = menuToggle.querySelectorAll('span');
            if (mainNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Fermer le menu lors d'un clic sur un lien
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Header au scroll
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll pour les ancres (déjà géré par CSS html { scroll-behavior: smooth; } mais fallback utile)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore les liens vides

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Compense la hauteur du header fixe (environ 80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion Smooth Toggle (Modern CSS Grid approach)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');
            
            // Fermer les autres (effet accordéon)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('is-open');
            });

            // Ouvrir/Fermer l'élément cliqué
            if (!isOpen) {
                item.classList.add('is-open');
            }
        });
    });

    // Mise à jour de l'année automatique (fuseau horaire de Montréal)
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        const montrealDate = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Toronto"}));
        yearSpan.textContent = montrealDate.getFullYear();
    }

    // Soumission du formulaire vers Monday CRM
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById('btn-submit');
            const successMsg = document.getElementById('form-success');
            const errorMsg = document.getElementById('form-error');

            const nom = document.getElementById('nom').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const adresse = document.getElementById('adresse').value.trim();

            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';
            btn.disabled = true;
            btn.querySelector('.btn-text').textContent = 'Envoi en cours...';

            try {
                const response = await fetch('/.netlify/functions/monday-lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nom, telephone, adresse }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    contactForm.reset();
                    // Afficher le modal de succès au lieu du petit message
                    const successModal = document.getElementById('success-modal');
                    if (successModal) {
                        successModal.style.display = 'flex';
                    } else {
                        successMsg.style.display = 'block'; // Fallback
                    }
                } else {
                    errorMsg.style.display = 'block';
                }
            } catch {
                errorMsg.style.display = 'block';
            } finally {
                btn.disabled = false;
                btn.querySelector('.btn-text').textContent = 'Obtenir mon offre gratuite';
            }
        });
    }

    // Gestion de la fermeture du Modal
    const modal = document.getElementById('success-modal');
    if (modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const returnBtn = modal.querySelector('.modal-btn-close');

        const closeModal = () => {
            modal.style.display = 'none';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (returnBtn) returnBtn.addEventListener('click', closeModal);

        // Fermer si on clique à l'extérieur du contenu
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
