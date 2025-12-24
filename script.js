document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Custom Cursor (Desktop only)
    const cursor = {
        dot: document.querySelector('[data-cursor-dot]'),
        outline: document.querySelector('[data-cursor-outline]')
    };

    if (cursor.dot && cursor.outline && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.dot.style.left = mouseX + 'px';
            cursor.dot.style.top = mouseY + 'px';
            cursor.dot.style.opacity = '1';
        });

        // Smooth cursor outline animation
        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            
            cursor.outline.style.left = outlineX + 'px';
            cursor.outline.style.top = outlineY + 'px';
            cursor.outline.style.opacity = '1';
            
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.outline.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.outline.classList.remove('hovered');
            });
        });
    }

    // Particles.js initialization
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animated counters
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const current = parseInt(counter.textContent) || 0;
            const increment = target / 50;
            
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(() => animateCounters(), 50);
            } else {
                counter.textContent = target + (target === 50 ? '+' : target === 100 ? '+' : '+');
            }
        });
    };

    // Trigger counter animation on scroll
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
        observer.observe(heroStats);
    }

    // Skills progress bars animation
    const animateSkillBars = () => {
        const progressBars = document.querySelectorAll('.progress-fill[data-width]');
        
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        });
    };

    const skillsSection = document.querySelector('.skills-progress');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkillBars();
                observer.disconnect();
            }
        });
        observer.observe(skillsSection);
    }

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Project Modal
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const projectData = {
        ecommerce: {
            title: 'E-Commerce Platform',
            image: 'https://via.placeholder.com/600x400/007bff/ffffff?text=E-Commerce+Platform',
            description: 'A comprehensive e-commerce solution built with modern technologies. Features include user authentication, secure payment processing, inventory management, and a powerful admin dashboard.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Redux'],
            features: [
                'User authentication and authorization',
                'Secure payment processing with Stripe',
                'Real-time inventory management',
                'Admin dashboard with analytics',
                'Responsive design for all devices',
                'SEO optimization'
            ],
            github: '#',
            demo: '#'
        },
        taskmanager: {
            title: 'Task Management App',
            image: 'https://via.placeholder.com/600x400/28a745/ffffff?text=Task+Manager',
            description: 'A collaborative workspace application with advanced project management features. Includes drag-and-drop functionality, real-time updates, and comprehensive analytics.',
            tech: ['Vue.js', 'Vuex', 'Socket.io', 'Chart.js', 'Express', 'MongoDB'],
            features: [
                'Drag-and-drop task management',
                'Real-time collaboration',
                'Project analytics and reporting',
                'Team member management',
                'File sharing and comments',
                'Mobile-responsive interface'
            ],
            github: '#',
            demo: '#'
        },
        weather: {
            title: 'Weather Dashboard',
            image: 'https://via.placeholder.com/600x400/dc3545/ffffff?text=Weather+App',
            description: 'A progressive web application providing comprehensive weather information with interactive maps, forecasts, and location-based alerts.',
            tech: ['React Native', 'PWA', 'Weather API', 'Charts.js', 'Geolocation'],
            features: [
                'Real-time weather data',
                'Interactive weather maps',
                '7-day weather forecasts',
                'Location-based notifications',
                'Offline functionality (PWA)',
                'Cross-platform compatibility'
            ],
            github: '#',
            demo: '#'
        }
    };

    // Project modal handlers
    document.querySelectorAll('[data-project]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = btn.getAttribute('data-project');
            const project = projectData[projectKey];
            
            if (project) {
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalImage').src = project.image;
                document.getElementById('modalDescription').textContent = project.description;
                
                // Tech stack
                const techContainer = document.getElementById('modalTech');
                techContainer.innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');
                
                // Features
                const featuresContainer = document.getElementById('modalFeatures');
                featuresContainer.innerHTML = `
                    <h4>Key Features</h4>
                    <ul>${project.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
                `;
                
                // Links
                document.getElementById('modalGithub').href = project.github;
                document.getElementById('modalDemo').href = project.demo;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalClose?.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Testimonials slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    nextBtn?.addEventListener('click', nextTestimonial);
    prevBtn?.addEventListener('click', prevTestimonial);

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);

    // Ripple effect for buttons
    document.querySelectorAll('.ripple-effect').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Download CV functionality
    document.getElementById('downloadCV')?.addEventListener('click', (e) => {
        e.preventDefault();
        // Simulate CV download
        alert('CV download would start here. Please add your actual CV file.');
    });

    // Contact Form Enhancement
    const contactForm = document.getElementById('contactForm');
    
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMessage(text, type) {
        const existingMessage = document.querySelector('.form-message');
        existingMessage?.remove();
        
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        message.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 5px;
            font-weight: 500;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
            animation: slideInUp 0.3s ease;
        `;
        
        contactForm.parentNode.insertBefore(message, contactForm.nextSibling);
        
        setTimeout(() => message?.remove(), 5000);
    }

    // Scroll indicator functionality
    document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});