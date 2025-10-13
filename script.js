document.addEventListener("DOMContentLoaded", function () {
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const quickReplyButtons = document.getElementById('quick-reply-buttons');
    // VAPID public key for push notifications (replace with your actual key)
    // const VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY';

    const API_KEY = 'AIzaSyBN82AK7MFWulkGAPDJhLBj63FTV3A3P_o';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

    const portfolioContext = `You are an AI assistant for Kalicharan Upadhayay's portfolio website. Here is the information about him:

Name: Kalicharan Upadhayay
Location: kadethan ,taluka:-Daund,District PUNE
Profile: Data Science Enthusiast

About Me:
I am a Data Science enthusiast passionate about turning data into meaningful insights.

Education:
- Varvand Gram Shikshan Sansthas Eiknath Sitaram Divekar College: Bachelor of Business Administration (Computer Applications), Jul 2022 - May 2025, CGPA: 6.83. Coursework includes Data Analysis with Python, Advanced Excel, SQL, Power BI, Tableau, Business Analytics, Digital Marketing, AWS Fundamentals, and Project Management.
- Gopinath Secondary And Higher Secondary School: HSC(PCMB), Jun 2021 - Apr 2022, Percentage: 62.37%.

Professional Experience:
- Nandini Enterprises (Mar 2023 - Aug 2024): Data Entry Operator. Managed and analyzed production and inventory data with high accuracy using Excel and Power BI. Maintained large datasets and collaborated with teams to ensure data integrity.
- Defence Guru Cyber Education Institute (Jun 2025 - Present): Data Analytics Trainee. Performing data cleaning, analysis, and visualization on cybersecurity datasets using Python, SQL, and Excel. Developing dashboards in Power BI and Tableau.

Technical Skills:
1. Python: Core Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, Data Cleaning, Data Manipulation, Data Visualization
2. Machine Learning & AI: Linear Regression, Logistic Regression, Decision Trees, Random Forest, SVM, K-Means Clustering, PCA, Model Evaluation, Hyperparameter Tuning
3. Deep Learning: Neural Networks basics, Keras, TensorFlow (Beginner)
4. SQL: Data Querying, Joins, Aggregations, Subqueries
5. Statistics: Descriptive & Inferential Statistics, Probability, Hypothesis Testing
6. Data Visualization: Matplotlib, Seaborn, Power BI, Tableau (Basic)

Projects:
1. Sales & Inventory Analysis – Online Medical Store (Aug 2023 - Sep 2023): Collected, cleaned, and analyzed sales and inventory data using Python, Pandas, and MySQL to support business decisions.
2. Impact Analysis of Good Thought NGO Initiatives (Aug 2025 - Sep 2025): Used SQL to analyze 13 years of project data to uncover insights on effectiveness and social outcomes.

Hobbies: Reading, Coding, Traveling, Photography

Contact:
- Email: kalicharanupadhayayofficial@gmail.com
- LinkedIn: linkedin.com/in/kalicharan-upadhayay-2637b4324
- GitHub: github.com/akashupadhayay106-au

Answer questions naturally and helpfully. Keep responses concise and friendly.`;

    let conversationHistory = [];

    // Open chatbot
    chatbotToggle.onclick = function () {
        chatbotWidget.style.display = 'flex';
        chatbotInput.focus();

        // The notification prompt has been disabled.
        // if (Notification.permission === 'default' && !localStorage.getItem('notificationPromptShown')) {
        //     notificationPrompt.style.display = 'block';
        // }

        if (window.innerWidth < 700) {
            setTimeout(() => {
                chatbotWidget.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 200);
        }
        // Notify admin that chat was opened
        fetch('https://ntfy.sh/kalicharan-portfolio-visits', {
            method: 'POST',
            body: 'Visitor opened the chat panel.',
            headers: {
                'Title': 'Portfolio Chat Opened',
                'Priority': 'default',
                'Tags': 'speech_balloon',
                'Email': 'kalicharanupadhayayofficial@gmail.com'
            }
        }).catch(error => console.error('Error sending notification:', error));
    };

    // Close chatbot
    chatbotClose.onclick = function () {
        chatbotWidget.style.display = 'none';
    };

    // Close on outside click
    document.addEventListener('mousedown', function (e) {
        if (
            chatbotWidget.style.display === 'flex' &&
            !chatbotWidget.contains(e.target) &&
            !chatbotToggle.contains(e.target)
        ) {
            chatbotWidget.style.display = 'none';
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape" && chatbotWidget.style.display === 'flex') {
            chatbotWidget.style.display = 'none';
        }
    });

    // Add message to chat
    function addMessage(message, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser ? 'chatbot-msg user' : 'chatbot-msg bot';
        
        const msgContent = document.createElement('span');
        msgContent.textContent = message;
        msgDiv.appendChild(msgContent);

        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msgDiv.appendChild(timestamp);

        chatbotBody.appendChild(msgDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    // Add loading indicator
    function addLoadingMessage() {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chatbot-msg loading';
        msgDiv.id = 'loading-msg';
        msgDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        chatbotBody.appendChild(msgDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    // Remove loading indicator
    function removeLoadingMessage() {
        const loadingMsg = document.getElementById('loading-msg');
        if (loadingMsg) {
            loadingMsg.remove();
        }
    }

    // Send message to AI
    async function sendMessage(message) {
        const userMessage = message || chatbotInput.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, true);
        if(!message) chatbotInput.value = '';
        chatbotInput.disabled = true;
        chatbotSend.disabled = true;
        quickReplyButtons.style.display = 'none';

        if (conversationHistory.length === 0) {
            // Notify admin of first message
            fetch('https://ntfy.sh/kalicharan-portfolio-visits', {
                method: 'POST',
                body: `Visitor sent first message: "${userMessage}"`,
                headers: {
                    'Title': 'Portfolio - First Message',
                    'Priority': 'high',
                    'Tags': 'email',
                    'Email': 'kalicharanupadhayayofficial@gmail.com'
                }
            }).catch(error => console.error('Error sending notification:', error));
        }

        conversationHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        addLoadingMessage();

        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-goog-api-key": API_KEY,
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ 
                                text: portfolioContext + '\n\nUser: ' + userMessage
                            }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800,
                    }
                })
            });

            removeLoadingMessage();

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API request failed with status ${response.status}: ${errorData.error.message}`);
            }

            const data = await response.json();
            if (!data.candidates || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
                throw new Error('Invalid API response format');
            }
            const aiResponse = data.candidates[0].content.parts[0].text;

            addMessage(aiResponse, false);

            conversationHistory.push({
                role: 'model',
                parts: [{ text: aiResponse }]
            });

            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-20);
            }

        } catch (error) {
            removeLoadingMessage();
            addMessage(`Sorry, I encountered an error: ${error.message}. Please check the API key and try again.`, false);
            console.error('Chatbot error:', error);
        } finally {
            chatbotInput.disabled = false;
            chatbotSend.disabled = false;
            chatbotInput.focus();
        }
    }

    // Send button click
    chatbotSend.onclick = () => sendMessage();

    // Enter key press
    chatbotInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Quick reply button click
    quickReplyButtons.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            sendMessage(e.target.textContent);
        }
    });

    // --- Notification Logic (Disabled) ---
    // The visitor-facing notification system has been disabled to avoid confusion.
    // The owner notifications are handled by ntfy.sh via notification.js.

    // --- Animated Skill ---
    const skills = ["Data Analyst", "BI Developer", "ML Learner"];
    let skillIndex = 0;
    const animatedSkill = document.getElementById('animated-skill');

    function changeSkill() {
        animatedSkill.style.opacity = 0;
        setTimeout(() => {
            skillIndex = (skillIndex + 1) % skills.length;
            animatedSkill.textContent = skills[skillIndex];
            animatedSkill.style.opacity = 1;
        }, 500);
    }

    if (animatedSkill) {
        animatedSkill.textContent = skills[skillIndex];
        setInterval(changeSkill, 3000);
    }

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});
