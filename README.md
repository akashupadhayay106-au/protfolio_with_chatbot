# Portfolio AI Assistant - Backend Documentation

This document outlines the backend endpoints required for the AI assistant and notification system on the portfolio website.

## Endpoints

### 1. Handle Chat Messages

-   **Endpoint:** `/api/chat`
-   **Method:** `POST`
-   **Description:** Receives a user's message, interacts with the AI model, and returns the assistant's response.
-   **Payload Example:**
    ```json
    {
        "message": "Tell me about your projects.",
        "history": [
            { "role": "user", "parts": [{ "text": "Hi" }] },
            { "role": "model", "parts": [{ "text": "Hello! How can I help you?" }] }
        ]
    }
    ```
-   **Response Example:**
    ```json
    {
        "reply": "Kalicharan has worked on several projects, including a Sales & Inventory Analysis for an online medical store. Would you like to know more about a specific project?"
    }
    ```

### 2. Save Push Subscription

-   **Endpoint:** `/api/save-subscription`
-   **Method:** `POST`
-   **Description:** Saves a visitor's web push subscription object to the database.
-   **Payload Example:**
    ```json
    {
        "endpoint": "https://fcm.googleapis.com/fcm/send/...",
        "expirationTime": null,
        "keys": {
            "p256dh": "...",
            "auth": "..."
        }
    }
    ```
-   **Response Example:**
    ```json
    {
        "success": true,
        "message": "Subscription saved."
    }
    ```

### 3. Get VAPID Public Key

-   **Endpoint:** `/api/vapid-public-key`
-   **Method:** `GET`
-   **Description:** Returns the VAPID public key required for the frontend to subscribe to push notifications.
-   **Response Example:**
    ```json
    {
        "publicKey": "YOUR_VAPID_PUBLIC_KEY"
    }
    ```

### 4. Send Admin Notification

-   **Endpoint:** `/api/notify-admin`
-   **Method:** `POST`
-   **Description:** Triggers a notification to the site owner about a visitor event.
-   **Payload Example:**
    ```json
    {
        "event": "New Visitor",
        "details": "A new visitor has landed on the homepage."
    }
    ```
-   **Response Example:**
    ```json
    {
        "success": true,
        "message": "Admin notification sent."
    }
    ```

## Admin Notification Channels

The backend should be configurable to send admin notifications via one of the following channels, set by an environment variable (e.g., `ADMIN_NOTIFICATION_CHANNEL=ntfy`):

-   **ntfy.sh:** (Default) Send a POST request to a specified ntfy.sh topic.
-   **Telegram:** Send a message to a Telegram chat via a bot.
-   **Email:** Send an email using an SMTP server.

## Environment Variables

-   `PORT`: The port for the server to run on (e.g., 3000).
-   `VAPID_PUBLIC_KEY`: Your VAPID public key.
-   `VAPID_PRIVATE_KEY`: Your VAPID private key.
-   `ADMIN_NOTIFICATION_CHANNEL`: The channel for admin notifications (`ntfy`, `telegram`, `email`).
-   `NTFY_TOPIC`: The ntfy.sh topic to send notifications to.
-   `TELEGRAM_BOT_TOKEN`: Your Telegram bot token.
-   `TELEGRAM_CHAT_ID`: The chat ID to send Telegram messages to.
-   `SMTP_HOST`: Your SMTP server host.
-   `SMTP_PORT`: Your SMTP server port.
-   `SMTP_USER`: Your SMTP server username.
-   `SMTP_PASS`: Your SMTP server password.
-   `EMAIL_TO`: The email address to send notifications to.
