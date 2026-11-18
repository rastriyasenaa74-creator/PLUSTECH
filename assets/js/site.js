
const API_URL = "https://script.google.com/macros/s/AKfycbwF_3Ncy-J9aO4ZdY-VG5fBVdabXZwiEfZsG_kiYkxw6IBKP2CTH8s0W9ClC_p2OfA/exec";

// Backend API request
async function apiRequest(action, payload = {}) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                action: action,
                payload: payload
            })
        });

        const result = await response.json();

        if (!result.ok) {
            throw new Error(result.message || "Backend request failed");
        }

        return result.data;

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

// Menu, year and forms
document.addEventListener("DOMContentLoaded", () => {

    // Mobile menu
    const toggle = document.querySelector(".menu-toggle");
    const links = document.querySelector(".nav-links");

    if (toggle && links) {
        toggle.addEventListener("click", () => {
            links.classList.toggle("open");

            toggle.setAttribute(
                "aria-expanded",
                links.classList.contains("open") ? "true" : "false"
            );
        });
    }

    // Automatic year
    document.querySelectorAll("[data-year]").forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Active navigation link
    const path = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(a => {
        const href = a.getAttribute("href");

        if (href === path) {
            a.classList.add("active");
        }
    });

    // Demo forms
    document.querySelectorAll("[data-demo-form]").forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const msg = form.querySelector("[data-form-message]");

            if (msg) {
                msg.textContent = "Please wait...";
            }

            // अभी demo form के लिए कोई backend action निर्धारित नहीं है।
            if (msg) {
                msg.textContent =
                    "Form backend action is not configured yet.";
            }
        });
    });
});
