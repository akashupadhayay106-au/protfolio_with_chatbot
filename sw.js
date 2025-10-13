// Service Worker for Push Notifications

self.addEventListener('push', function(event) {
    const data = event.data.json();
    console.log('New notification', data);

    const options = {
        body: data.body,
        icon: 'images/icon.png', // Optional: Add an icon
        badge: 'images/badge.png' // Optional: Add a badge
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
