# Test Plan: AI Assistant & Notification System

This document provides a step-by-step guide to test the functionality of the AI assistant and the notification system.

## 1. Visitor Experience Testing

### a. Chat Widget and Interaction

1.  **Open the portfolio website.**
2.  **Verify the floating chat button is visible** on the bottom-right of the screen.
3.  **Click the chat button.**
    -   **Expected:** The chat panel opens.
4.  **Verify the welcome message is displayed.**
5.  **Click a quick reply button (e.g., "What are his skills?").**
    -   **Expected:** The message is sent, a typing indicator appears, and the AI responds with relevant information.
6.  **Type a custom message** in the input field and press Enter or click the send button.
    -   **Expected:** The message is sent, a typing indicator appears, and the AI responds.
7.  **Verify timestamps are visible** on all messages.
8.  **Click the close button (`×`) on the chat header.**
    -   **Expected:** The chat panel closes.

### b. Visitor Push Notifications

1.  **Open the chat for the first time.**
    -   **Expected:** A notification permission prompt appears.
2.  **Click "Allow" on the prompt.**
3.  **Send a message to the AI.**
4.  **Switch to a different browser tab** so the portfolio page is not in focus.
    -   **Expected:** When the AI's reply arrives, a push notification appears on your screen.
5.  **Click the "notification settings" link** in the chat footer.
    -   **Expected:** Instructions on how to manage notification settings in the browser are displayed (or the settings are directly opened, depending on implementation).

## 2. Admin Notification Testing

### a. Event-Triggered Notifications

1.  **Open the portfolio website in a new incognito window.**
    -   **Expected:** You receive an admin notification on your configured channel (e.g., ntfy.sh, Telegram) about a "New Visitor".
2.  **Click the chat button to open the chat panel.**
    -   **Expected:** You receive an admin notification for "Visitor opened chat".
3.  **Send your first message to the assistant.**
    -   **Expected:** You receive an admin notification for "Visitor sent first message".

### b. Rate Limiting

1.  **Rapidly refresh the portfolio page several times.**
    -   **Expected:** You should only receive one "New Visitor" notification per session, not for every refresh, demonstrating that rate-limiting is working.

## 3. Accessibility Testing

1.  **Navigate the website using only the Tab key.**
2.  **Tab to the chat toggle button and press Enter.**
    -   **Expected:** The chat panel opens.
3.  **Tab through the chat panel.**
    -   **Expected:** Focus moves logically between the close button, message history, quick reply buttons, input field, and send button.
4.  **Use the arrow keys to navigate the quick reply buttons.**
5.  **Use a screen reader (e.g., NVDA, VoiceOver) to navigate the chat widget.**
    -   **Expected:** All interactive elements have proper ARIA labels.
