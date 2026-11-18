
window.PLUS_MEDISTOCK_API_URL = "https://script.google.com/macros/s/AKfycbwF_3Ncy-J9aO4ZdY-VG5fBVdabXZwiEfZsG_kiYkxw6IBKP2CTH8s0W9ClC_p2OfA/exec";

// Backend API
window.apiRequest = async function(action, payload = {}) {
    const response = await fetch(window.PLUS_MEDISTOCK_API_URL, {
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
};

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

    // Active navigation
    const path = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(a => {
        if (a.getAttribute("href") === path) {
            a.classList.add("active");
        }
    });

    // Login form
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;
            const button = document.getElementById("loginButton");
            const message = document.getElementById("loginMessage");

            button.disabled = true;
            button.textContent = "Signing in...";
            message.textContent = "";

            try {
                const data = await window.apiRequest("login", {
                    email: email,
                    password: password
                });

                if (data.token) {
                    localStorage.setItem("plusmedistock_token", data.token);
                }

                if (data.user) {
                    localStorage.setItem(
                        "plusmedistock_user",
                        JSON.stringify(data.user)
                    );
                }

                message.textContent = "Login successful. Opening dashboard...";

                window.location.href = "dashboard.html";

            } catch (error) {
                console.error("Login Error:", error);

                message.textContent = error.message || "Unable to login.";

                button.disabled = false;
                button.textContent = "Sign in →";
            }
        });
    }

});
