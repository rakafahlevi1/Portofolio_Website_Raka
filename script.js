document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('mobile-active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer && navLinksContainer.classList.contains('mobile-active')) {
                navLinksContainer.classList.remove('mobile-active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    });

    // 2. Navigation Active Scroll Spy
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                if (entry.target.id === 'skills') {
                    animateProgressBars();
                }
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    function animateProgressBars() {
        const progresses = document.querySelectorAll('.progress');
        progresses.forEach(progress => {
            const targetWidth = progress.style.width;
            progress.style.width = '0px';
            setTimeout(() => {
                progress.style.width = targetWidth;
            }, 100);
        });
    }

    // 4. Projects Grid Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // 5. Contact Form Simulation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');
            
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Mengirim...';
            submitBtnIcon.className = 'fa-solid fa-spinner fa-spin';
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Kirim Pesan';
                submitBtnIcon.className = 'fa-solid fa-paper-plane';
                
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Terima kasih! Pesan Anda berhasil dikirim (simulasi).';
                
                contactForm.reset();
            }, 1800);
        });
    }

    // 6. Interactive 3D Parallax Tilt Effect on Hero Visual
    const heroVisual = document.querySelector('.hero-visual');
    const visualBox = document.querySelector('.visual-box');
    const visualIcon = document.querySelector('.visual-icon');

    if (heroVisual && visualBox) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Limit the tilt angle up to 20 degrees
            const rotateX = ((y - centerY) / centerY) * -20;
            const rotateY = ((x - centerX) / centerX) * 20;
            
            visualBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Bring the astronaut icon slightly forward
            if (visualIcon) {
                visualIcon.style.transform = `translateZ(30px) scale(1.05)`;
            }
        });

        heroVisual.addEventListener('mouseleave', () => {
            visualBox.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            visualBox.style.transform = 'rotateX(0deg) rotateY(0deg)';
            if (visualIcon) {
                visualIcon.style.transform = 'translateZ(25px) scale(1)';
            }
            
            setTimeout(() => {
                visualBox.style.transition = 'transform 0.1s ease';
            }, 500);
        });
    }

});
