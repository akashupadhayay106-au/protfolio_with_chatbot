document.addEventListener("DOMContentLoaded", () => {
    const chatbotWidget = document.getElementById("chatbot-widget");
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotBody = document.getElementById("chatbot-body");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");
    const quickReplyButtons = document.getElementById("quick-reply-buttons");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const notificationSettingsLink = document.getElementById("notification-settings");
    const animatedSkill = document.getElementById("typed-role");
    const revealItems = document.querySelectorAll(".reveal");

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

    let conversationHistory = [];
    let firstMessageSent = false;


    function addMessage(message, isUser) {
        if (!chatbotBody) {
            return;
        }

        const msgDiv = document.createElement("div");
        msgDiv.className = isUser ? "chatbot-msg user" : "chatbot-msg bot";

        const msgContent = document.createElement("span");
        msgContent.textContent = message;
        msgDiv.appendChild(msgContent);

        const timestamp = document.createElement("span");
        timestamp.className = "timestamp";
        timestamp.textContent = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
        msgDiv.appendChild(timestamp);

        chatbotBody.appendChild(msgDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function addLoadingMessage() {
        if (!chatbotBody) {
            return;
        }

        const msgDiv = document.createElement("div");
        msgDiv.className = "chatbot-msg loading";
        msgDiv.id = "loading-msg";
        msgDiv.innerHTML = "<span></span><span></span><span></span>";
        chatbotBody.appendChild(msgDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function removeLoadingMessage() {
        const loadingMsg = document.getElementById("loading-msg");
        if (loadingMsg) {
            loadingMsg.remove();
        }
    }

    function fallbackResponse(userMessage) {
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
    }


    async function sendMessage(message) {
        const userMessage = (message || chatbotInput?.value || "").trim();
        if (!userMessage) {
            return;
        }

        addMessage(userMessage, true);
        if (chatbotInput && !message) {
            chatbotInput.value = "";
        }

        if (chatbotInput) {
            chatbotInput.disabled = true;
        }
        if (chatbotSend) {
            chatbotSend.disabled = true;
        }
        if (quickReplyButtons) {
            quickReplyButtons.style.display = "none";
        }

        if (!firstMessageSent) {
            firstMessageSent = true;
        }

        conversationHistory.push({ role: "user", text: userMessage });
        addLoadingMessage();

        try {
            // Simulated delay for realistic typing effect
            await new Promise(resolve => setTimeout(resolve, 800));
            let replyText = fallbackResponse(userMessage);

            removeLoadingMessage();
            addMessage(replyText, false);
            conversationHistory.push({ role: "assistant", text: replyText });

            if (conversationHistory.length > 12) {
                conversationHistory = conversationHistory.slice(-12);
            }
        } catch (error) {
            removeLoadingMessage();
            addMessage("Sorry, I could not process that request right now. Please try again in a moment.", false);
            console.error("Chatbot error:", error);
        } finally {
            if (chatbotInput) {
                chatbotInput.disabled = false;
                chatbotInput.focus();
            }
            if (chatbotSend) {
                chatbotSend.disabled = false;
            }
        }
    }

    if (chatbotToggle && chatbotWidget) {
        chatbotToggle.addEventListener("click", () => {
            chatbotWidget.style.display = "flex";
            if (chatbotInput) {
                chatbotInput.focus();
            }
        });
    }

    if (chatbotClose && chatbotWidget) {
        chatbotClose.addEventListener("click", () => {
            chatbotWidget.style.display = "none";
        });
    }

    document.addEventListener("mousedown", (event) => {
        if (
            chatbotWidget &&
            chatbotToggle &&
            chatbotWidget.style.display === "flex" &&
            !chatbotWidget.contains(event.target) &&
            !chatbotToggle.contains(event.target)
        ) {
            chatbotWidget.style.display = "none";
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && chatbotWidget && chatbotWidget.style.display === "flex") {
            chatbotWidget.style.display = "none";
        }
    });

    if (chatbotSend) {
        chatbotSend.addEventListener("click", () => sendMessage());
    }

    if (chatbotInput) {
        chatbotInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    if (quickReplyButtons) {
        quickReplyButtons.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON") {
                sendMessage(event.target.textContent);
            }
        });
    }

    if (notificationSettingsLink) {
        notificationSettingsLink.addEventListener("click", (event) => {
            event.preventDefault();
            addMessage("The portfolio assistant is active. You can ask about skills, projects, experience, certifications, or contact details.", false);
        });
    }

    if (darkModeToggle) {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const darkEnabled = document.body.classList.contains("dark-mode");
            localStorage.setItem("darkMode", darkEnabled ? "enabled" : "disabled");
            darkModeToggle.innerHTML = darkEnabled
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        });
    }

    const rotatingSkills = [
        "Data Science Trainer",
        "Machine Learning Practitioner",
        "Power BI Analyst",
        "Generative AI Builder"
    ];
    let skillIndex = 0;

    if (animatedSkill) {
        animatedSkill.textContent = rotatingSkills[0];
        setInterval(() => {
            animatedSkill.style.opacity = "0";
            setTimeout(() => {
                skillIndex = (skillIndex + 1) % rotatingSkills.length;
                animatedSkill.textContent = rotatingSkills[skillIndex];
                animatedSkill.style.opacity = "1";
            }, 250);
        }, 2600);
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18 }
        );

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    // Profile photo fallback
    const profileImg = document.querySelector('.profile-photo');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.classList.add('is-missing');
        });
    }

    // Carousel Logic
    const track = document.getElementById('projects-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.getElementById('projects-dots');
    
    if (track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        // Create dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to project ${idx + 1}`);
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.children);

        function updateCarousel() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = 24; // Adjust based on gap in CSS (1.5rem = 24px)
            track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
            
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex >= slides.length) currentIndex = slides.length - 1;
            track.style.transition = 'transform 0.4s ease-in-out';
            updateCarousel();
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        window.addEventListener('resize', updateCarousel);

        // Touch/Swipe Support
        track.addEventListener('touchstart', touchStart);
        track.addEventListener('touchend', touchEnd);
        track.addEventListener('touchmove', touchMove);

        // Keyboard Support
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.setAttribute('tabindex', '0');
            carouselContainer.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
                if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
            });
        }

        function touchStart(index) {
            return function(event) {
                isDragging = true;
                startPos = getPositionX(event);
                animationID = requestAnimationFrame(animation);
            }
        }

        function touchMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
        }

        function touchEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            
            const movedBy = currentTranslate - prevTranslate;
            
            if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
            if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
            
            goToSlide(currentIndex);
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }

        function animation() {
            if (isDragging) {
                // Remove transition while dragging
                track.style.transition = 'none';
                track.style.transform = `translateX(${currentTranslate}px)`;
                requestAnimationFrame(animation);
            }
        }
        
        // initialize touch listeners properly
        track.addEventListener('touchstart', (e) => {
            isDragging = true;
            startPos = getPositionX(e);
            
            // Calculate starting translate
            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = 24;
            prevTranslate = -(currentIndex * (slideWidth + gap));
        }, {passive: true});
    }
});

    // Animated Counters
    const statCards = document.querySelectorAll('.stat-card');
    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numEl = entry.target.querySelector('.stat-num');
                    if (numEl && !numEl.classList.contains('counted')) {
                        const target = parseInt(numEl.getAttribute('data-target'));
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;
                        const updateCounter = () => {
                            current += step;
                            if (current < target) {
                                numEl.textContent = Math.ceil(current).toLocaleString();
                                requestAnimationFrame(updateCounter);
                            } else {
                                numEl.textContent = target.toLocaleString();
                                numEl.classList.add('counted');
                            }
                        };
                        requestAnimationFrame(updateCounter);
                    }
                }
            });
        }, { threshold: 0.5 });
        statCards.forEach(card => statsObserver.observe(card));
    }

    // Accordions for Timeline and Education
    const timelineCards = document.querySelectorAll('.timeline-card, .edu-card');
    timelineCards.forEach(card => {
        card.addEventListener('click', () => {
            // close others
            timelineCards.forEach(c => {
                if (c !== card) c.classList.remove('expanded');
            });
            card.classList.toggle('expanded');
        });
    });

    // Chart.js Visualization
    const ctx = document.getElementById('skillsChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Python', 'SQL', 'Data Analysis', 'Machine Learning', 'Generative AI', 'Visualization', 'DevOps'],
                datasets: [{
                    label: 'Proficiency',
                    data: [90, 85, 95, 80, 75, 85, 70],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(148, 163, 184, 0.2)' },
                        grid: { color: 'rgba(148, 163, 184, 0.2)' },
                        pointLabels: {
                            color: '#94a3b8',
                            font: { size: 12, family: 'Inter' }
                        },
                        ticks: { display: false, max: 100, min: 0 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Modal Logic
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `<div class="modal-content">
        <button class="close-modal" aria-label="Close modal">&times;</button>
        <h3 id="modal-title">Project Title</h3>
        <p id="modal-desc">Overview</p>
        <div id="modal-tools" class="tech-stack" style="margin: 1rem 0;"></div>
        <div class="modal-actions">
            <a href="#" id="modal-github" class="btn btn-outline" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        </div>
    </div>`;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('.project-summary').textContent;
        const toolsHtml = card.querySelector('.tech-stack').innerHTML;
        
        // add a view details button
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline';
        btn.style.marginTop = '1rem';
        btn.textContent = 'View Details';
        btn.addEventListener('click', () => {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-desc').textContent = desc;
            document.getElementById('modal-tools').innerHTML = toolsHtml;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            closeBtn.focus();
        });
        card.appendChild(btn);
    });

// Phase 11: Browser Notifications
document.addEventListener('DOMContentLoaded', () => {
    const contactCard = document.querySelector('.contact-card');
    if (contactCard && 'Notification' in window) {
        const notifBtn = document.createElement('button');
        notifBtn.className = 'btn btn-outline';
        notifBtn.innerHTML = "<i class='fas fa-bell'></i> Enable site notifications";
        notifBtn.style.marginTop = '1rem';
        
        const ctaRow = contactCard.querySelector('.cta-row');
        if(ctaRow) ctaRow.appendChild(notifBtn);

        notifBtn.addEventListener('click', () => {
            if (Notification.permission === 'granted') {
                alert('Notifications are already enabled!');
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification("Welcome to Kalicharan's Portfolio!", {
                            body: 'Thank you for enabling notifications.',
                            icon: './assets/images/profile.jpeg'
                        });
                        localStorage.setItem('site_notifications', 'enabled');
                    } else {
                        alert("Notifications permission denied. That's totally fine!");
                    }
                });
            } else {
                alert('Notifications have been disabled in your browser settings.');
            }
        });
    }
});

// Phase 7 & 8: Network Canvas & Spotlight Logic
document.addEventListener("DOMContentLoaded", () => {
    // Spotlight
    const spotlight = document.querySelector('.mouse-spotlight');
    if (spotlight) {
        document.addEventListener('mousemove', (e) => {
            if(window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                requestAnimationFrame(() => {
                    spotlight.style.setProperty('--spotlight-x', e.clientX + 'px');
                    spotlight.style.setProperty('--spotlight-y', e.clientY + 'px');
                });
            }
        });
    }

    // Network Canvas
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    let animationFrameId;
    let isVisible = true;
    
    // Performance configs
    const connectionDistance = 150;
    
    function init() {
        width = canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
        height = canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 30 : 80;
        
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5,
                pulseSpeed: Math.random() * 0.05,
                pulseAngle: Math.random() * Math.PI * 2
            });
        }
    }
    
    function animate() {
        if (!isVisible) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }
        
        ctx.clearRect(0, 0, width, height);
        
        // Update & Draw particles
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.pulseAngle += p.pulseSpeed;
            p.y += p.vy;
            
            // Bounce
            if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
            if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + Math.sin(p.pulseAngle) * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(103, 232, 249, 0.5)';
            ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let distSq = dx * dx + dy * dy;
                
                if (distSq < connectionDistance * connectionDistance) {
                    let opacity = 1 - Math.sqrt(distSq) / connectionDistance;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(103, 232, 249, ${opacity * 0.2})`;
                    ctx.stroke();
                }
            }
        }
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReducedMotion.matches) {
        init();
        animate();
    }
    
    window.addEventListener('resize', () => {
        if (!prefersReducedMotion.matches) {
            cancelAnimationFrame(animationFrameId);
            init();
            animate();
        }
    });
    
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
    });
});
