document.addEventListener("DOMContentLoaded", function() {
    fetch('https://ntfy.sh/kalicharan-portfolio-visits', {
        method: 'POST',
        body: 'Someone just visited your portfolio website!',
        headers: {
            'Title': 'New Portfolio Visitor',
            'Priority': 'default',
            'Tags': 'tada',
            'Email': 'kalicharanupadhayayofficial@gmail.com'
        }
    }).catch(error => console.error('Error sending notification:', error));
});
