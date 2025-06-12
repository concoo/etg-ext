document.addEventListener("DOMContentLoaded", () => {
    const phrases = {
        "Hold": "Ok please give me 5 minutes to review your reservation information",
        "Confirm": "Your reservation is now confirmed. Let me know if you need anything else!",
        "Delay": "Unfortunately, there is a delay in processing. We appreciate your patience!"
    };

    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "8px";

    Object.keys(phrases).forEach(shortText => {
        const button = document.createElement("button");
        button.textContent = shortText;
        button.style.padding = "5px";
        button.style.cursor = "pointer";
        button.addEventListener("click", () => {
            textarea.value += ` ${phrases[shortText]}`;
        });
        container.appendChild(button);
    });

    textarea.parentNode.insertBefore(container, textarea);
});
