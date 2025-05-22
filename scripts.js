window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

const totalImages = 4;
document.addEventListener("keydown", function (e) {
    const current = document.querySelector(".popup:target");
    if (!current) return;

    const index = parseInt(current.getAttribute("data-index"));

    if (e.key === "ArrowRight") {
        const next = index === totalImages ? 1 : index + 1;
        window.location.hash = `#popup${next}`;
    }

    if (e.key === "ArrowLeft") {
        const prev = index === 1 ? totalImages : index - 1;
        window.location.hash = `#popup${prev}`;
    }

    if (e.key === "Escape") {
        window.location.hash = "";
    }
});