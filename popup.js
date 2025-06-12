const phrases = {
    "Hold": "Ok please give me 5 minutes to review your reservation information.",
    "Confirm": "Your reservation is now confirmed. Let me know if you need anything else!",
    "Delay": "Unfortunately, there is a delay in processing. We appreciate your patience!"
};

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("buttons-container");

    Object.keys(phrases).forEach(shortText => {
        const button = document.createElement("button");
        button.textContent = shortText;
        button.addEventListener("click", () => {
            sendTextToPage(phrases[shortText]);
        });
        container.appendChild(button);
    });
});

function sendTextToPage(text) {
    chrome.scripting.executeScript({
        target: { tabId: chrome.tabs.query({ active: true, currentWindow: true })[0].id },
        func: (msg) => {
            const textarea = document.querySelector("textarea");
            if (textarea) textarea.value += ` ${msg}`;
        },
        args: [text]
    });
}
