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

// Scroll arrow functionality for work section
if (document.querySelector('.scroll-arrow.right') || document.querySelector('.scroll-arrow.left')) {
  document.querySelectorAll('.scroll-arrow.right').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const scroller = btn.parentElement.querySelector('.image-scroller');
      if (scroller) {
        scroller.scrollBy({ left: 300, behavior: 'smooth' });
      }
    });
  });
  document.querySelectorAll('.scroll-arrow.left').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const scroller = btn.parentElement.querySelector('.image-scroller');
      if (scroller) {
        scroller.scrollBy({ left: -300, behavior: 'smooth' });
      }
    });
  });
}

function updateArrows(tileImages) {
  const scroller = tileImages.querySelector('.image-scroller');
  const leftArrow = tileImages.querySelector('.scroll-arrow.left');
  const rightArrow = tileImages.querySelector('.scroll-arrow.right');
  if (!scroller || !leftArrow || !rightArrow) return;
  // Check scroll positions
  if (scroller.scrollLeft <= 2) {
    leftArrow.classList.add('hidden');
  } else {
    leftArrow.classList.remove('hidden');
  }
  if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2) {
    rightArrow.classList.add('hidden');
  } else {
    rightArrow.classList.remove('hidden');
  }
}

document.querySelectorAll('.tile-images').forEach(function(tileImages) {
  const scroller = tileImages.querySelector('.image-scroller');
  if (!scroller) return;
  // Initial update
  updateArrows(tileImages);
  // Update on scroll
  scroller.addEventListener('scroll', function() {
    updateArrows(tileImages);
  });
  // Update on window resize
  window.addEventListener('resize', function() {
    updateArrows(tileImages);
  });
});

// Popup navigation for preview arrows
function setupPopupArrows() {
  document.querySelectorAll('.popup-arrow.left').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      const prev = btn.getAttribute('data-prev');
      if (prev) location.hash = prev;
    });
  });
  document.querySelectorAll('.popup-arrow.right').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      const next = btn.getAttribute('data-next');
      if (next) location.hash = next;
    });
  });
}
setupPopupArrows();