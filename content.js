// === CONFIGURE THIS SELECTOR to match your notification element(s) ===
const NOTIFICATION_SELECTOR = '.notification, .badge, [aria-label*="notification"]';

let originalTitle = document.title;
let blinkInterval = null;
let blinkState = false;

function startBlinking() {
  if (blinkInterval) return; // already blinking
  blinkInterval = setInterval(() => {
    document.title = blinkState ? "🔔 New Notification!" : originalTitle;
    blinkState = !blinkState;
  }, 1000);
}

function stopBlinking() {
  if (blinkInterval) {
    clearInterval(blinkInterval);
    blinkInterval = null;
    document.title = originalTitle;
  }
}

function checkForNotification() {
  const notifEl = document.querySelector(NOTIFICATION_SELECTOR);
  if (notifEl && notifEl.offsetParent !== null) {
    startBlinking();
  } else {
    stopBlinking();
  }
}

// Observe DOM changes for notification appearance/disappearance
const observer = new MutationObserver(checkForNotification);
observer.observe(document.body, { childList: true, subtree: true, attributes: true });

// Also check on page load
window.addEventListener('DOMContentLoaded', checkForNotification);
// For SPAs or AJAX sites, check periodically as fallback
setInterval(checkForNotification, 5000);