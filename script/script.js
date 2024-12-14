const handleButtonState = (event, className) => {
    const target = event.target.closest('.button');
    if (target) target.classList[event.type === 'mousedown' || event.type === 'touchstart' ? 'add' : 'remove'](className);
};
document.querySelectorAll('.button').forEach(button => {
    ['mousedown', 'touchstart', 'mouseup', 'mouseleave', 'touchend'].forEach(eventType => {
        button.addEventListener(eventType, event => handleButtonState(event, 'clicked'));
    });
});

function checkScroll() {
    const header = document.querySelector('header');

    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener('scroll', checkScroll);

document.querySelectorAll('.link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, ' ');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const currentYearElement = document.querySelector('#current-year');
    const year = new Date().getFullYear();
    checkScroll();
    if (currentYearElement) {
        currentYearElement.textContent = year;
    }
});

window.addEventListener('load', () => {
    const allimages = document.querySelectorAll('img');
    const allatags = document.querySelectorAll('a');

    allimages.forEach(image => {
        image.addEventListener('dragstart', e => e.preventDefault());
    });

    allatags.forEach(aTag => {
        aTag.addEventListener('dragstart', e => e.preventDefault());
    });
});


document.addEventListener('DOMContentLoaded', function () {
    let loadingScreen = document.getElementById("loading-screen");
    let percentageElement = document.getElementById("percentage");

    let percentage = 0;

    let interval = setInterval(function () {
        percentage += 1;
        percentageElement.textContent = "% " + percentage;

        if (percentage >= 100) {
            clearInterval(interval);
            loadingScreen.style.opacity = "0";

            setTimeout(function () {
                loadingScreen.style.display = "none";
            }, 100);

            AOS.init({
                duration: 800,
            });

            const progressBar = document.querySelector(".progress-bar");
            const swiper = new Swiper(".swiper", {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                on: {
                    slideChangeTransitionStart: () => {
                        resetProgressBar();
                    },
                },
            });

            function resetProgressBar() {
                progressBar.style.transition = "none";
                progressBar.style.width = "0%";

                setTimeout(() => {
                    progressBar.style.transition = `width ${swiper.params.autoplay.delay}ms linear`;
                    progressBar.style.width = "100%";
                }, 50);
            }

            resetProgressBar();

            const cookieContainer = document.getElementById("cookie-container");
            const acceptButton = document.getElementById("cookie-confirm-button");

            if (!localStorage.getItem("cookieAccepted")) {
                setTimeout(() => {
                    cookieContainer.classList.add("cookie-visible");
                }, 1200);
            }

            acceptButton.addEventListener("click", function () {
                const expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 10);
                localStorage.setItem("cookieAccepted", expireDate.toISOString());
                cookieContainer.style.display = "none";
            });
        }
    }, 10);
});

const digital_catalog_close_button = document.querySelector('#digital-catalog-close-button');
const digital_catalog = document.querySelector('#digital-catalog-dropbox-container');

digital_catalog_close_button.addEventListener("click", () => {
    digital_catalog.classList.toggle('closed');
});

document.querySelector('#hamburger').addEventListener('click', function () {
    document.querySelector('#hamburger').classList.toggle('active');
    document.querySelector('#nav-container').classList.toggle('active');
});

SmoothScroll({
    animationTime: 1000,
    stepSize: 75,
    accelerationDelta: 90,
    accelerationMax: 2,
    keyboardSupport: true,
    arrowScroll: 70,
    pulseAlgorithm: true,
    pulseScale: 5,
    pulseNormalize: 1,
    touchpadSupport: true,
});