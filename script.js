/* =====================================================
   MOBILE MENU
===================================================== */

const btn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const header = document.querySelector(".site-header");

if (btn && header) {
    btn.onclick = () => {
        header.classList.toggle("menu-open");

        if (nav) {
            nav.classList.toggle("open");
        }

        btn.setAttribute(
            "aria-expanded",
            header.classList.contains("menu-open") ? "true" : "false"
        );
    };
}



/* =====================================================
   MENU ZOOM / WRAP PREVENTION
   Exact auto mode: hamburger only when menu cannot fit in one line.
===================================================== */
function preventMenuWrapOnZoom() {
    if (!header || !nav) {
        return;
    }

    const strip = header.querySelector(".nav-strip");
    const links = Array.from(nav.querySelectorAll("a"));

    if (!strip || !links.length) {
        return;
    }

    const wasHamburger = header.classList.contains("nav-hamburger");
    const wasOpen = header.classList.contains("menu-open");

    header.classList.remove("nav-hamburger");
    header.classList.remove("menu-open");
    nav.classList.remove("open");

    strip.style.display = "block";
    nav.style.flexWrap = "nowrap";

    const navStyle = window.getComputedStyle(nav);
    const gap = parseFloat(navStyle.columnGap || navStyle.gap || 0) || 0;
    const linksWidth = links.reduce((total, link) => {
        return total + link.getBoundingClientRect().width;
    }, 0);
    const requiredWidth = linksWidth + (gap * Math.max(0, links.length - 1));
    const availableWidth = strip.getBoundingClientRect().width - 12;

    const shouldHamburger = requiredWidth > availableWidth;

    if (shouldHamburger) {
        header.classList.add("nav-hamburger");
        if (wasHamburger && wasOpen) {
            header.classList.add("menu-open");
            nav.classList.add("open");
        }
    }

    if (btn) {
        btn.setAttribute(
            "aria-expanded",
            header.classList.contains("menu-open") ? "true" : "false"
        );
    }
}

window.addEventListener("load", preventMenuWrapOnZoom);
window.addEventListener("resize", preventMenuWrapOnZoom);
window.addEventListener("orientationchange", preventMenuWrapOnZoom);

if (window.ResizeObserver && header) {
    const menuObserver = new ResizeObserver(preventMenuWrapOnZoom);
    menuObserver.observe(header);
}

if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(preventMenuWrapOnZoom);
}

requestAnimationFrame(preventMenuWrapOnZoom);
setTimeout(preventMenuWrapOnZoom, 250);

/* =====================================================
   BACK TO TOP BUTTON
===================================================== */

const topBtn = document.getElementById("toTop");

window.addEventListener("scroll", () => {
    if (topBtn) {
        topBtn.style.display = scrollY > 350 ? "block" : "none";
    }
});

if (topBtn) {
    topBtn.onclick = () => {
        scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}

/* =====================================================
   HEADER HIDE ON SCROLL DOWN
===================================================== */

let last = 0;

window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (header) {
        if (
            y > last &&
            y > 180 &&
            !header.classList.contains("menu-open")
        ) {
            header.classList.add("hide-header");
        } else {
            header.classList.remove("hide-header");
        }
    }

    last = y;
});

/* =====================================================
   CLEAR REWRITE TYPING EFFECT
===================================================== */

const typingTarget = document.getElementById("typingText");

const typingWords = [
    "TOGETHER WE HEAL",
    "मिलकर जीवन संवारें"
];

let typingWordIndex = 0;
let typingCharIndex = 0;
let typingDeleting = false;

function runTypingEffect() {

    if (!typingTarget) {
        return;
    }

    const currentWord = typingWords[typingWordIndex];

    /* ===== Typing ===== */
    if (!typingDeleting) {

        typingTarget.textContent = currentWord.substring(
            0,
            typingCharIndex + 1
        );

        typingCharIndex++;

        /* Full word typed */
        if (typingCharIndex === currentWord.length) {

            typingDeleting = true;

            setTimeout(runTypingEffect, 1600);

            return;
        }

    }

    /* ===== Deleting ===== */
    else {

        typingTarget.textContent = currentWord.substring(
            0,
            typingCharIndex - 1
        );

        typingCharIndex--;

        /* Word fully deleted */
        if (typingCharIndex === 0) {

            typingDeleting = false;

            typingWordIndex =
                (typingWordIndex + 1) % typingWords.length;
        }
    }

    setTimeout(
        runTypingEffect,
        typingDeleting ? 45 : 85
    );
}

/* ===== Start Effect ===== */
runTypingEffect();

/* =====================================================
   HOME PAGE 5 PHOTO AUTO SLIDER
===================================================== */

const sliderImages = document.querySelectorAll(".slider-track img");
const sliderDots = document.querySelectorAll(".slider-dots button");

let currentSlide = 0;

function showSlide(index) {
    if (!sliderImages.length) {
        return;
    }

    sliderImages[currentSlide].classList.remove("active");

    if (sliderDots[currentSlide]) {
        sliderDots[currentSlide].classList.remove("active");
    }

    currentSlide = (index + sliderImages.length) % sliderImages.length;

    sliderImages[currentSlide].classList.add("active");

    if (sliderDots[currentSlide]) {
        sliderDots[currentSlide].classList.add("active");
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

if (sliderImages.length) {
    let sliderTimer = setInterval(nextSlide, 3000);

    sliderDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            clearInterval(sliderTimer);

            showSlide(index);

            sliderTimer = setInterval(nextSlide, 3000);
        });
    });
}

/* =====================================================
   CCTV DEMO FUNCTION
===================================================== */

function loadDemoCCTV() {
    const ph = document.querySelector(".camera-placeholder");

    if (ph) {
        ph.innerHTML = `
            <b>Integration Area Active</b>
            <span>
                Ab actual CCTV URL ko iframe/video source me replace karna hoga.
            </span>
        `;
    }
}

/* =====================================================
   BASIC WEBSITE PROTECTION
   - Right Click Protection
   - Copy Protection
   - Cut Protection
   - Text Selection Protection
   - Image Drag Protection
   - Keyboard Shortcut Protection
===================================================== */

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

document.addEventListener("copy", (event) => {
    event.preventDefault();
});

document.addEventListener("cut", (event) => {
    event.preventDefault();
});

document.addEventListener("selectstart", (event) => {
    event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
    if (event.target.tagName === "IMG") {
        event.preventDefault();
    }
});

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (
        event.ctrlKey &&
        (
            key === "u" ||
            key === "s" ||
            key === "c" ||
            key === "x" ||
            key === "a" ||
            key === "p"
        )
    ) {
        event.preventDefault();
    }

    if (
        event.ctrlKey &&
        event.shiftKey &&
        (
            key === "i" ||
            key === "j" ||
            key === "c"
        )
    ) {
        event.preventDefault();
    }

    if (event.key === "F12") {
        event.preventDefault();
    }
});

/* =====================================================
   CONTINUOUS NEWS LOOP
===================================================== */

const ticker = document.querySelector(
    ".news-ticker-content"
);

if (ticker) {

    ticker.innerHTML += ticker.innerHTML;

}
/* LIVE DATE + CLOCK */
function updateHeaderDateTime() {
    const dateEl = document.getElementById("headerDate");
    const timeEl = document.getElementById("headerTime");

    if (!dateEl || !timeEl) return;

    const now = new Date();

    dateEl.textContent = "📅 " + now.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    timeEl.textContent = "⌚ " + now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateHeaderDateTime();
    setInterval(updateHeaderDateTime, 1000);
});
/* =====================================================
   INDEX PAGE LOGO PREVIEW POPUP
===================================================== */
const logoPopupTrigger = document.querySelector(".logo-popup-trigger");
const logoPreviewModal = document.getElementById("logoPreviewModal");
const logoPreviewClose = document.querySelector(".logo-preview-close");

if (logoPopupTrigger && logoPreviewModal) {
    logoPopupTrigger.addEventListener("click", (event) => {
        event.preventDefault();
        logoPreviewModal.classList.add("show");
        logoPreviewModal.setAttribute("aria-hidden", "false");
    });
}

function closeLogoPreview() {
    if (!logoPreviewModal) {
        return;
    }

    logoPreviewModal.classList.remove("show");
    logoPreviewModal.setAttribute("aria-hidden", "true");
}

if (logoPreviewClose) {
    logoPreviewClose.addEventListener("click", closeLogoPreview);
}

if (logoPreviewModal) {
    logoPreviewModal.addEventListener("click", (event) => {
        if (event.target === logoPreviewModal) {
            closeLogoPreview();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLogoPreview();
    }
});
