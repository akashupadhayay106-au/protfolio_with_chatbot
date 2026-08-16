document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. CHATBOT (rule-based, local, no API)
    // -------------------------------------------------------------------------
    const portfolioData = {
        name: "Kalicharan Upadhayay",
        role: "Data Science Professional",
        location: "Pune, Maharashtra",
        phone: "+91-9823865388",
        email: "kalicharanupadhayayofficial@gmail.com",
        linkedin: "https://www.linkedin.com/in/kalicharan-upadhayay-2637b4324/",
        github: "https://github.com/akashupadhayay106-au",
        summary: "Data Science professional with experience in Python, SQL, Machine Learning, Power BI, and Generative AI. Experienced in delivering technical training and building AI applications using LLMs, Docker, and REST APIs.",
        skills: [
            "Python",
            "SQL",
            "Pandas",
            "NumPy",
            "EDA",
            "Data Cleaning",
            "Feature Engineering",
            "Scikit-learn",
            "Regression",
            "Classification",
            "Clustering",
            "LLMs",
            "Prompt Engineering",
            "Power BI",
            "Tableau",
            "Matplotlib",
            "Seaborn",
            "Docker",
            "REST APIs",
            "Git",
            "GitHub"
        ],
        experience: [
            {
                title: "Data Science Trainer",
                company: "Skillected JSSAV Education Pvt. Ltd., Pune",
                duration: "Feb 2026 - Present",
                points: [
                    "Delivered 100+ instructor-led sessions on Python, SQL, Data Analysis, Machine Learning, Power BI, and Generative AI.",
                    "Mentored 500+ students through projects, EDA, dashboards, and predictive modeling.",
                    "Designed assignments, coding assessments, and mock interviews."
                ]
            },
            {
                title: "Data Analyst Trainer",
                company: "Defence Guru Cyber Education, Pune",
                duration: "Jun 2025 - Dec 2025",
                points: [
                    "Trained 500+ students in Python, SQL, Excel, Power BI, and Data Analysis.",
                    "Conducted project-based learning using real-world datasets.",
                    "Created coding assignments and interview-focused practice material."
                ]
            },
            {
                title: "Data Operations Associate",
                company: "Nandini Enterprises, Kurkumb | Client: Cipla Ltd.",
                duration: "Mar 2023 - Aug 2024",
                points: [
                    "Managed and validated 10K+ production records while maintaining high data accuracy.",
                    "Performed data validation, quality checks, and Excel-based reporting.",
                    "Collaborated with cross-functional teams to support reliable business reporting."
                ]
            }
        ],
        projects: [
            {
                name: "Prompt Shield - AI Security Framework",
                details: "Developed an AI security framework to detect prompt injection and jailbreak attacks in LLM applications.",
                tech: ["LLMs", "Machine Learning", "Docker", "REST APIs"],
                impact: "Improved secure AI interactions through prompt validation, request filtering, and monitoring dashboards."
            },
            {
                name: "Cloud FinOps AI Assistant",
                details: "Built a RAG-based AI assistant integrating four LLM APIs for cloud cost optimization.",
                tech: ["RAG", "Prompt Engineering", "Docker", "APIs"],
                impact: "Reduced token consumption and supported better cloud efficiency decisions."
            }
        ],
        education: [
            "Bachelor of Business Administration (Computer Applications), E.S. Divekar College, Pune University, CGPA 6.83.",
            "Higher Secondary Certificate (PCMB), Percentage 62.37%."
        ],
        certifications: [
            "Data Science Certification",
            "Python Programming",
            "SQL for Data Analytics",
            "Microsoft Power BI",
            "Machine Learning Fundamentals",
            "Generative AI Fundamentals"
        ],
        achievements: [
            "Delivered 100+ technical sessions.",
            "Mentored 500+ students.",
            "Built AI applications using RAG, LLMs, Docker, and REST APIs."
        ],
        languages: ["English", "Hindi", "Marathi"]
    };

    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const quickReplyButtons = document.getElementById('quick-reply-buttons');

    if (chatbotToggle && chatbotWidget) {
        const openChatbot = () => {
            chatbotWidget.removeAttribute('hidden');
            chatbotWidget.style.display = 'flex';
        };
        const closeChatbot = () => {
            chatbotWidget.style.display = 'none';
        };
        const isChatbotOpen = () => chatbotWidget.style.display === 'flex';

        chatbotToggle.addEventListener('click', () => {
            if (isChatbotOpen()) closeChatbot(); else openChatbot();
        });

        chatbotClose.addEventListener('click', closeChatbot);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isChatbotOpen()) closeChatbot();
        });

        document.addEventListener('click', (e) => {
            if (isChatbotOpen() &&
                !chatbotWidget.contains(e.target) &&
                !chatbotToggle.contains(e.target)) {
                closeChatbot();
            }
        });

        const addMessage = (message, isUser) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chatbot-msg ${isUser ? 'user' : 'bot'}`;
            msgDiv.innerHTML = `<p>${message}</p><span class="timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;
            chatbotBody.appendChild(msgDiv);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        };

        const addLoadingMessage = () => {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'chatbot-msg bot loading-msg';
            loadingDiv.innerHTML = `<p><span class="dot"></span><span class="dot"></span><span class="dot"></span></p>`;
            loadingDiv.id = 'chatbot-loading';
            chatbotBody.appendChild(loadingDiv);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        };

        const removeLoadingMessage = () => {
            const loadingDiv = document.getElementById('chatbot-loading');
            if (loadingDiv) loadingDiv.remove();
        };

        const fallbackResponse = (userMessage) => {
            const query = userMessage.toLowerCase();

            if (query.includes("contact") || query.includes("email") || query.includes("phone")) {
                return `You can contact ${portfolioData.name} at ${portfolioData.email} or ${portfolioData.phone}. LinkedIn: ${portfolioData.linkedin} | GitHub: ${portfolioData.github}`;
            }

            if (query.includes("skill") || query.includes("tool") || query.includes("technology")) {
                return `${portfolioData.name} works with ${portfolioData.skills.join(", ")}. He is especially focused on Python, SQL, Machine Learning, Power BI, and Generative AI workflows.`;
            }

            if (query.includes("project") || query.includes("ai") || query.includes("rag")) {
                return `Featured projects include ${portfolioData.projects[0].name} and ${portfolioData.projects[1].name}. One focuses on LLM security, and the other is a RAG-based FinOps assistant that integrates multiple LLM APIs.`;
            }

            if (query.includes("experience") || query.includes("trainer") || query.includes("work")) {
                return `${portfolioData.name} currently works as a Data Science Trainer and previously worked as a Data Analyst Trainer and Data Operations Associate. He has delivered 100+ sessions and mentored 500+ students.`;
            }

            if (query.includes("education") || query.includes("college")) {
                return `${portfolioData.name} completed a Bachelor of Business Administration in Computer Applications from E.S. Divekar College, Pune University, with a CGPA of 6.83.`;
            }

            if (query.includes("certification") || query.includes("certificate")) {
                return `Certifications include ${portfolioData.certifications.join(", ")}.`;
            }

            if (query.includes("language")) {
                return `${portfolioData.name} can communicate in ${portfolioData.languages.join(", ")}.`;
            }

            return `${portfolioData.name} is a ${portfolioData.role} based in ${portfolioData.location}, with experience in analytics, training, machine learning, Power BI, and Generative AI solutions. Ask me about his skills, experience, projects, certifications, or contact details.`;
        };

        const sendMessage = (message) => {
            if (!message.trim()) return;
            addMessage(message, true);
            chatbotInput.value = '';
            addLoadingMessage();
            
            setTimeout(() => {
                removeLoadingMessage();
                const reply = fallbackResponse(message);
                addMessage(reply, false);
            }, 800);
        };

        chatbotSend.addEventListener('click', () => {
            sendMessage(chatbotInput.value);
        });

        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage(chatbotInput.value);
            }
        });

        if (quickReplyButtons) {
            quickReplyButtons.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    sendMessage(e.target.textContent);
                }
            });
        }
    }

    // -------------------------------------------------------------------------
    // 2. DARK/LIGHT MODE TOGGLE (Base is Dark, Toggle adds body.light-mode)
    // -------------------------------------------------------------------------
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const updateThemeIcon = (isLight) => {
        if (darkModeToggle) {
            // Sun icon for dark mode (default), Moon icon for light mode
            darkModeToggle.innerHTML = isLight 
                ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        }
    };

    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('themeMode', isLight ? 'light' : 'dark');
            updateThemeIcon(isLight);
        });
    }

    // -------------------------------------------------------------------------
    // 3. TYPED ROLE ANIMATION
    // -------------------------------------------------------------------------
    const typedRole = document.getElementById('typed-role');
    if (typedRole) {
        const roles = ["Data Science Trainer", "Machine Learning Practitioner", "Power BI Analyst", "Generative AI Builder"];
        let roleIndex = 0;
        
        setInterval(() => {
            typedRole.style.opacity = 0;
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                typedRole.textContent = roles[roleIndex];
                typedRole.style.opacity = 1;
            }, 500); // Wait for fade out
        }, 2600);
    }

    // -------------------------------------------------------------------------
    // 4. SCROLL REVEAL
    // -------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    // -------------------------------------------------------------------------
    // 5. PROFILE PHOTO FALLBACK
    // -------------------------------------------------------------------------
    const profilePhotos = document.querySelectorAll('.profile-photo');
    profilePhotos.forEach(photo => {
        photo.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('profile-photo-fallback')) {
                fallback.style.display = 'flex';
            }
        });
    });

    // -------------------------------------------------------------------------
    // 6. CAROUSEL
    // -------------------------------------------------------------------------
    const track = document.getElementById('projects-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.getElementById('projects-dots');
    
    if (track && prevBtn && nextBtn && dotsContainer) {
        const slides = Array.from(track.children);
        let currentIndex = 0;
        
        // Create dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => goToSlide(idx));
        });
        
        const dots = Array.from(dotsContainer.children);
        
        const goToSlide = (index) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            currentIndex = index;
            const percentage = -(currentIndex * 100);
            track.style.transform = `translateX(${percentage}%)`;
            
            dots.forEach(d => d.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        };
        
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        // Touch/Swipe
        let startX = 0;
        let isSwiping = false;
        let prevTranslate = 0;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
            track.style.transition = 'none';
            prevTranslate = -(currentIndex * track.clientWidth);
        }, {passive: true});
        
        track.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            const currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            track.style.transform = `translateX(${prevTranslate + diff}px)`;
        }, {passive: true});
        
        track.addEventListener('touchend', (e) => {
            isSwiping = false;
            track.style.transition = 'transform 0.5s ease-in-out';
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) goToSlide(currentIndex - 1);
                else goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex);
            }
        });
        
        // Keyboard Support
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.setAttribute('tabindex', '0');
            carouselContainer.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
                if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
            });
        }
        
        // Resize Handler
        window.addEventListener('resize', () => {
            track.style.transition = 'none';
            goToSlide(currentIndex);
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        });
    }

    // -------------------------------------------------------------------------
    // 7. ANIMATED COUNTERS
    // -------------------------------------------------------------------------
    const statNums = document.querySelectorAll('.stat-num[data-target]');
    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    const hasPlus = el.nextElementSibling && el.nextElementSibling.classList.contains('stat-plus');
                    let current = 0;
                    const increment = Math.max(1, target / 60);

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            el.textContent = Math.ceil(current).toString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.textContent = target.toString();
                            el.classList.add('counted');
                        }
                    };
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNums.forEach(num => statsObserver.observe(num));
    }

    // -------------------------------------------------------------------------
    // 7b. TOAST NOTIFICATIONS
    // -------------------------------------------------------------------------
    const toastEl = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimer;

    const showToast = (message, variant = 'success') => {
        if (!toastEl) return;
        if (toastTimer) clearTimeout(toastTimer);
        if (toastMessage) toastMessage.textContent = message;
        toastEl.classList.remove('success', 'error');
        toastEl.classList.add(variant, 'visible');
        toastTimer = setTimeout(() => {
            toastEl.classList.remove('visible');
        }, 2600);
    };

    // -------------------------------------------------------------------------
    // 7c. COPY EMAIL BUTTON
    // -------------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'kalicharanupadhayayofficial@gmail.com';
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const ta = document.createElement('textarea');
                    ta.value = email;
                    ta.setAttribute('readonly', '');
                    ta.style.position = 'absolute';
                    ta.style.left = '-9999px';
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                }
                showToast('Email copied!');
            } catch (err) {
                showToast('Unable to copy email automatically.', 'error');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 7d. DESKTOP-ONLY MAGNETIC BUTTON EFFECT
    // -------------------------------------------------------------------------
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const magnetic = document.querySelectorAll('.btn-primary, .btn-secondary, .resume-btn, .contact-card');
        magnetic.forEach(el => {
            const strength = el.classList.contains('contact-card') ? 6 : 10;
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                const clampedX = Math.max(-strength, Math.min(strength, x * 0.25));
                const clampedY = Math.max(-strength, Math.min(strength, y * 0.25));
                el.style.setProperty('--mag-x', `${clampedX}px`);
                el.style.setProperty('--mag-y', `${clampedY}px`);
                el.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
                el.style.transition = 'transform 120ms ease-out';
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
                el.style.transition = 'transform 320ms ease';
            });
        });
    }

    // -------------------------------------------------------------------------
    // 8. ACCORDIONS
    // -------------------------------------------------------------------------
    const accordions = document.querySelectorAll('.timeline-card, .edu-card');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Close others
            accordions.forEach(other => {
                if (other !== this && other.classList.contains('expanded')) {
                    other.classList.remove('expanded');
                }
            });
            this.classList.toggle('expanded');
        });
    });

    // -------------------------------------------------------------------------
    // 9. CHART.JS RADAR
    // -------------------------------------------------------------------------
    const skillsCanvas = document.getElementById('skillsChart');
    if (skillsCanvas && typeof Chart !== 'undefined') {
        const ctx = skillsCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Python', 'SQL', 'Data Analysis', 'Machine Learning', 'Generative AI', 'Visualization', 'DevOps'],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 85, 95, 80, 75, 85, 70],
                    backgroundColor: 'rgba(103, 232, 249, 0.2)',
                    borderColor: 'rgba(103, 232, 249, 1)',
                    pointBackgroundColor: 'rgba(103, 232, 249, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(148, 163, 184, 0.15)' },
                        grid: { color: 'rgba(148, 163, 184, 0.15)' },
                        pointLabels: {
                            color: '#8b9dba',
                            font: { size: 12, family: "'Inter', sans-serif" }
                        },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // -------------------------------------------------------------------------
    // 10. PROJECT MODAL
    // -------------------------------------------------------------------------
    let projectModal = document.getElementById('project-modal');
    if (!projectModal) {
        projectModal = document.createElement('div');
        projectModal.id = 'project-modal';
        projectModal.className = 'modal';
        projectModal.innerHTML = `
            <div class="modal-content" role="dialog" aria-modal="true">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <h3 class="modal-title"></h3>
                <p class="modal-desc"></p>
                <div class="modal-tech"></div>
            </div>
        `;
        document.body.appendChild(projectModal);
    }
    
    const modalClose = projectModal.querySelector('.modal-close');
    const modalTitle = projectModal.querySelector('.modal-title');
    const modalDesc = projectModal.querySelector('.modal-desc');
    const modalTech = projectModal.querySelector('.modal-tech');
    let lastFocusedElement;

    const closeModal = () => {
        projectModal.style.display = 'none';
        if (lastFocusedElement) lastFocusedElement.focus();
    };

    modalClose.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.style.display === 'flex') {
            closeModal();
        }
    });

    const projectCards = document.querySelectorAll('#projects-track .project-card');
    projectCards.forEach(card => {
        let viewBtn = card.querySelector('.view-details-btn');
        if (!viewBtn) {
            viewBtn = document.createElement('button');
            viewBtn.className = 'view-details-btn btn btn-outline';
            viewBtn.type = 'button';
            viewBtn.textContent = 'View Details';
            viewBtn.style.margin = '0 1.5rem 1.5rem';
            card.appendChild(viewBtn);
        }

        viewBtn.addEventListener('click', () => {
            lastFocusedElement = document.activeElement;
            const title = card.querySelector('.project-top h3')?.textContent || 'Project';
            const summary = card.querySelector('.project-top .project-summary')?.textContent || '';
            const bulletEls = card.querySelectorAll('ul li');
            const bullets = Array.from(bulletEls).map(li => li.textContent.trim());
            const techItems = Array.from(card.querySelectorAll('.tech-stack span')).map(t => t.textContent.trim());

            modalTitle.textContent = title;
            const descHtml = [summary].concat(bullets.map(b => `• ${b}`)).filter(Boolean).join('<br>');
            modalDesc.innerHTML = descHtml;
            modalTech.innerHTML = techItems.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

            projectModal.style.display = 'flex';
            modalClose.focus();
        });
    });

    // -------------------------------------------------------------------------
    // 11. MOBILE NAV
    // -------------------------------------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('menu-open', isOpen);
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // -------------------------------------------------------------------------
    // 12. SCROLL PROGRESS BAR & 13. BACK TO TOP
    // -------------------------------------------------------------------------
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Progress bar
        if (scrollProgress) {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Back to top
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.style.display = 'flex';
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 400) backToTop.style.display = 'none';
                }, 300);
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // -------------------------------------------------------------------------
    // 14. ACTIVE NAV HIGHLIGHTING
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const highlightActiveNav = () => {
        let scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // offset for fixed header
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', highlightActiveNav);

    // -------------------------------------------------------------------------
    // 15. ENHANCED NETWORK CANVAS BACKGROUND — Data-Flow Animation
    // -------------------------------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let flowingNodes = [];
        let gridAxes = [];
        let animationFrameId;
        let isRunning = false;
        
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 20 : 55;
        const maxDist = isMobile ? 120 : 160;
        
        const colors = [
            { r: 103, g: 232, b: 249, a: 0.55 },  // cyan
            { r: 56, g: 189, b: 248, a: 0.35 },   // blue
            { r: 139, g: 92, b: 246, a: 0.35 }    // violet
        ];

        const speedLayers = [0.25, 0.5, 0.85];

        const initCanvas = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            
            particles = [];
            flowingNodes = [];
            gridAxes = [];

            for (let i = 0; i < particleCount; i++) {
                const layer = i % 3;
                particles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * speedLayers[layer],
                    vy: (Math.random() - 0.5) * speedLayers[layer],
                    baseRadius: Math.random() * 1.2 + 0.6,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    angle: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.02 + 0.01,
                    layer: layer,
                    highlightChance: Math.random()
                });
            }

            for (let i = 0; i < (isMobile ? 3 : 6); i++) {
                flowingNodes.push({
                    progress: Math.random(),
                    fromIdx: Math.floor(Math.random() * particles.length),
                    toIdx: Math.floor(Math.random() * particles.length),
                    speed: 0.0025 + Math.random() * 0.004,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }

            const w = window.innerWidth;
            const h = window.innerHeight;
            gridAxes = [
                { x1: 0, y1: h * 0.35, x2: w, y2: h * 0.35, opacity: 0.06 },
                { x1: 0, y1: h * 0.65, x2: w, y2: h * 0.65, opacity: 0.05 },
                { x1: w * 0.28, y1: 0, x2: w * 0.28, y2: h, opacity: 0.05 },
                { x1: w * 0.72, y1: 0, x2: w * 0.72, y2: h, opacity: 0.06 }
            ];
        };

        let highlightTimer = 0;
        let highlightPair = null;

        const drawParticles = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            const w = window.innerWidth;
            const h = window.innerHeight;

            gridAxes.forEach(axis => {
                const grad = ctx.createLinearGradient(axis.x1, axis.y1, axis.x2, axis.y2);
                grad.addColorStop(0, `rgba(103, 232, 249, 0)`);
                grad.addColorStop(0.3, `rgba(103, 232, 249, ${axis.opacity})`);
                grad.addColorStop(0.7, `rgba(139, 92, 246, ${axis.opacity * 0.8})`);
                grad.addColorStop(1, `rgba(56, 189, 248, 0)`);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(axis.x1, axis.y1);
                ctx.lineTo(axis.x2, axis.y2);
                ctx.stroke();
            });
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < maxDist) {
                        const opacity = 1 - (dist / maxDist);
                        const isHighlighted = highlightPair &&
                            ((highlightPair.i === i && highlightPair.j === j) ||
                             (highlightPair.i === j && highlightPair.j === i));

                        const finalOpacity = isHighlighted
                            ? Math.min(0.55, opacity * 2.5)
                            : opacity * 0.16;

                        if (isHighlighted) {
                            ctx.shadowColor = 'rgba(103, 232, 249, 0.8)';
                            ctx.shadowBlur = 8;
                        }

                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(103, 232, 249, ${finalOpacity})`;
                        ctx.lineWidth = isHighlighted ? 1.5 : 0.8;
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                    }
                }
            }

            flowingNodes.forEach(node => {
                node.progress += node.speed;
                if (node.progress >= 1) {
                    node.progress = 0;
                    node.fromIdx = Math.floor(Math.random() * particles.length);
                    node.toIdx = Math.floor(Math.random() * particles.length);
                    while (node.toIdx === node.fromIdx) {
                        node.toIdx = Math.floor(Math.random() * particles.length);
                    }
                }

                const from = particles[node.fromIdx];
                const to = particles[node.toIdx];
                const ex = from.x + (to.x - from.x) * node.progress;
                const ey = from.y + (to.y - from.y) * node.progress;

                const pulseSize = 2.2 + Math.sin(node.progress * Math.PI * 6) * 0.8;

                ctx.shadowColor = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.9)`;
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(ex, ey, pulseSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.95)`;
                ctx.fill();
                ctx.shadowBlur = 0;

                ctx.beginPath();
                ctx.arc(ex, ey, pulseSize * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.1)`;
                ctx.fill();
            });

            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                p.angle += p.speed;
                const pulse = Math.sin(p.angle);
                const r = p.baseRadius + pulse * 0.7;

                const glowChance = (Date.now() / 1000 + idx) % 6 < 0.4;

                if (glowChance || p.highlightChance > 0.92) {
                    ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.7)`;
                    ctx.shadowBlur = 10;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(0.1, r), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a})`;
                ctx.fill();
                ctx.shadowBlur = 0;

                if (p.layer === 0) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.max(0.1, r * 2.2), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.05)`;
                    ctx.fill();
                }
            });

            highlightTimer -= 1;
            if (highlightTimer <= 0) {
                highlightTimer = 120 + Math.floor(Math.random() * 180);
                const i = Math.floor(Math.random() * particles.length);
                let j = Math.floor(Math.random() * particles.length);
                while (j === i) j = Math.floor(Math.random() * particles.length);
                highlightPair = { i, j, timer: 60 };
            }
            if (highlightPair) {
                highlightPair.timer -= 1;
                if (highlightPair.timer <= 0) highlightPair = null;
            }
        };

        const animate = () => {
            if (!isRunning) return;
            drawParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const heroSection = document.getElementById('home');

        const checkViewport = () => {
            if (!heroSection) return true;
            const rect = heroSection.getBoundingClientRect();
            return rect.bottom > 0 && rect.top < window.innerHeight;
        };
        
        const startAnimation = () => {
            if (!isRunning && !prefersReducedMotion.matches && !document.hidden) {
                isRunning = true;
                animate();
            }
        };
        
        const stopAnimation = () => {
            isRunning = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };

        initCanvas();
        if (checkViewport()) startAnimation();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAnimation();
            } else {
                if (checkViewport()) startAnimation();
            }
        });

        let scrollCheckRAF;
        window.addEventListener('scroll', () => {
            if (scrollCheckRAF) return;
            scrollCheckRAF = requestAnimationFrame(() => {
                scrollCheckRAF = null;
                if (checkViewport()) startAnimation();
                else stopAnimation();
            });
        }, { passive: true });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            stopAnimation();
            resizeTimeout = setTimeout(() => {
                initCanvas();
                if (checkViewport()) startAnimation();
            }, 250);
        });
        
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) stopAnimation();
            else if (checkViewport()) startAnimation();
        });
    }

    // -------------------------------------------------------------------------
    // 15b. HERO CANVAS FALLBACK — Concentrated network data pulse
    // -------------------------------------------------------------------------
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const hCtx = heroCanvas.getContext('2d');
        let hParticles = [];
        let hFrame;
        let hRunning = false;
        const heroEl = document.getElementById('home');
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

        const initHero = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = heroEl ? heroEl.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
            heroCanvas.width = rect.width * dpr;
            heroCanvas.height = rect.height * dpr;
            heroCanvas.style.width = rect.width + 'px';
            heroCanvas.style.height = rect.height + 'px';
            hCtx.scale(dpr, dpr);

            hParticles = [];
            const mobile = window.innerWidth < 768;
            const count = mobile ? 18 : 32;
            for (let i = 0; i < count; i++) {
                hParticles.push({
                    x: Math.random() * rect.width,
                    y: Math.random() * rect.height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    r: Math.random() * 1.4 + 0.6,
                    hue: Math.random() < 0.5 ? 'cyan' : (Math.random() < 0.5 ? 'violet' : 'blue'),
                    pulse: Math.random() * Math.PI * 2
                });
            }
        };

        const drawHero = () => {
            const rect = heroEl ? heroEl.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
            hCtx.clearRect(0, 0, rect.width, rect.height);
            const w = rect.width;
            const h = rect.height;
            const maxD = 110;

            const colorMap = {
                cyan: { r: 103, g: 232, b: 249 },
                violet: { r: 139, g: 92, b: 246 },
                blue: { r: 56, g: 189, b: 248 }
            };

            for (let i = 0; i < hParticles.length; i++) {
                for (let j = i + 1; j < hParticles.length; j++) {
                    const a = hParticles[i];
                    const b = hParticles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < maxD) {
                        const alpha = (1 - d / maxD) * 0.22;
                        hCtx.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
                        hCtx.lineWidth = 0.7;
                        hCtx.beginPath();
                        hCtx.moveTo(a.x, a.y);
                        hCtx.lineTo(b.x, b.y);
                        hCtx.stroke();
                    }
                }
            }

            hParticles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                p.pulse += 0.03;

                const c = colorMap[p.hue];
                const rad = p.r + Math.sin(p.pulse) * 0.5;
                hCtx.shadowColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.75)`;
                hCtx.shadowBlur = 8;
                hCtx.beginPath();
                hCtx.arc(p.x, p.y, rad, 0, Math.PI * 2);
                hCtx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.75)`;
                hCtx.fill();
                hCtx.shadowBlur = 0;
            });
        };

        const hAnimate = () => {
            if (!hRunning) return;
            drawHero();
            hFrame = requestAnimationFrame(hAnimate);
        };

        const heroInView = () => {
            if (!heroEl) return true;
            const r = heroEl.getBoundingClientRect();
            return r.bottom > 50 && r.top < window.innerHeight;
        };

        const startHero = () => {
            if (!hRunning && !prefersReduced.matches && !document.hidden) {
                hRunning = true;
                hAnimate();
            }
        };
        const stopHero = () => {
            hRunning = false;
            if (hFrame) cancelAnimationFrame(hFrame);
        };

        initHero();
        if (heroInView()) startHero();

        window.addEventListener('scroll', () => {
            if (heroInView()) startHero();
            else stopHero();
        }, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopHero();
            else if (heroInView()) startHero();
        });

        window.addEventListener('resize', () => {
            initHero();
        });

        prefersReduced.addEventListener('change', e => {
            if (e.matches) stopHero();
            else if (heroInView()) startHero();
        });
    }

    // -------------------------------------------------------------------------
    // 15c. HERO VIDEO PAUSE WHEN OFFSCREEN (Future-proofing if video added)
    // -------------------------------------------------------------------------
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        const heroEl = document.getElementById('home');
        const stopIfNeeded = () => {
            if (!heroEl) return;
            const r = heroEl.getBoundingClientRect();
            const inView = r.bottom > 0 && r.top < window.innerHeight;
            if (inView && !document.hidden && !heroVideo.paused) return;
            if (inView && !document.hidden) {
                heroVideo.play().catch(() => {});
            } else {
                heroVideo.pause();
            }
        };
        window.addEventListener('scroll', stopIfNeeded, { passive: true });
        document.addEventListener('visibilitychange', stopIfNeeded);
    }

    // -------------------------------------------------------------------------
    // 16. WORKFLOW STAGE INTERACTIONS (Enhanced keyboard + click)
    // -------------------------------------------------------------------------
    const wfStages = document.querySelectorAll('.wf-stage');
    const wfPanels = document.querySelectorAll('.wf-panel');
    if (wfStages.length && wfPanels.length) {
        const toggleStage = (stageEl) => {
            const idx = Number(stageEl.dataset.stage || 0);
            const isExpanded = stageEl.getAttribute('aria-expanded') === 'true';

            wfStages.forEach(s => s.setAttribute('aria-expanded', 'false'));
            wfPanels.forEach(p => p.hidden = true);

            if (!isExpanded) {
                stageEl.setAttribute('aria-expanded', 'true');
                const panel = document.getElementById(`wf-panel-${idx}`);
                if (panel) panel.hidden = false;
            }
        };

        wfStages.forEach(stage => {
            stage.addEventListener('click', () => toggleStage(stage));
            stage.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleStage(stage);
                }
            });
        });

        if (wfStages[0]) {
            setTimeout(() => toggleStage(wfStages[0]), 900);
        }
    }

    // -------------------------------------------------------------------------
    // 17. SKILL CARD CLICK-TO-HIGHLIGHT
    // -------------------------------------------------------------------------
    const skillCards = document.querySelectorAll('#skills .skill-card');
    skillCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        const toggleHighlight = () => {
            const active = card.classList.contains('active-highlight');
            skillCards.forEach(c => c.classList.remove('active-highlight'));
            if (!active) card.classList.add('active-highlight');
        };
        card.addEventListener('click', toggleHighlight);
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleHighlight();
            }
        });
    });

    // -------------------------------------------------------------------------
    // 18. RESUME BUTTON — Toast on successful click
    // -------------------------------------------------------------------------
    document.querySelectorAll('.resume-btn, .nav-resume-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            try {
                if (typeof showToast === 'function') {
                    setTimeout(() => {
                        showToast('Resume download started!');
                    }, 120);
                }
            } catch (_) { /* no-op */ }
        });
    });

    // -------------------------------------------------------------------------
    // 19. ACCORDION ARIA SUPPORT ENHANCEMENT
    // -------------------------------------------------------------------------
    const ariaAccordions = document.querySelectorAll('.timeline-card, .edu-card');
    ariaAccordions.forEach((acc, idx) => {
        const panel = acc.querySelector('ul, .expandable-content');
        const head = acc.querySelector('.timeline-head, h4');
        if (panel) {
            const panelId = `acc-panel-${idx}`;
            const headId = `acc-head-${idx}`;
            if (head) head.id = headId;
            panel.id = panelId;
            acc.setAttribute('aria-controls', panelId);
            if (head) panel.setAttribute('aria-labelledby', headId);
            acc.setAttribute('aria-expanded', acc.classList.contains('expanded') ? 'true' : 'false');
        }
        acc.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (document.activeElement === acc) {
                    e.preventDefault();
                    acc.click();
                }
            }
        });
    });

    const syncAria = () => {
        ariaAccordions.forEach(acc => {
            acc.setAttribute('aria-expanded', acc.classList.contains('expanded') ? 'true' : 'false');
        });
    };
    const observer = new MutationObserver(syncAria);
    ariaAccordions.forEach(acc => observer.observe(acc, { attributes: true, attributeFilter: ['class'] }));

    // -------------------------------------------------------------------------
    // 16. MOUSE SPOTLIGHT (kept from original numbering consistency)
    // Moved below to keep order clean in source.
    const spotlight = document.querySelector('.mouse-spotlight');
    if (spotlight && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let isSpotlightRunning = false;
        let mouseX = 0;
        let mouseY = 0;

        const updateSpotlight = () => {
            spotlight.style.setProperty('--spotlight-x', `${mouseX}px`);
            spotlight.style.setProperty('--spotlight-y', `${mouseY}px`);
            isSpotlightRunning = false;
        };

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isSpotlightRunning) {
                isSpotlightRunning = true;
                requestAnimationFrame(updateSpotlight);
            }
        });
    }

    // -------------------------------------------------------------------------
    // 17. DESKTOP-ONLY 3D TILT + SPOTLIGHT VARS
    // -------------------------------------------------------------------------
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

        const tiltCards = document.querySelectorAll('.skill-card, .highlight-card, .project-card, .edu-card, .info-card, .contact-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                const clampX = Math.max(-5, Math.min(5, rotateX));
                const clampY = Math.max(-5, Math.min(5, rotateY));
                const pctX = (x / rect.width) * 100;
                const pctY = (y / rect.height) * 100;

                card.style.setProperty('--tilt-x', `${x}px`);
                card.style.setProperty('--tilt-y', `${y}px`);
                card.style.setProperty('--tilt-pct-x', `${pctX}%`);
                card.style.setProperty('--tilt-pct-y', `${pctY}%`);
                card.style.transform = `perspective(900px) rotateX(${clampX}deg) rotateY(${clampY}deg) translateZ(8px)`;
                card.style.transition = 'transform 120ms ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                card.style.transition = 'transform 420ms ease';
            });
        });
    }
});
