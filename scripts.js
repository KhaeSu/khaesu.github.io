window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Determine which page we're on and set popup navigation variables accordingly
let totalImages = 4;
let popupPrefix = '#popup';
if (window.location.pathname.includes('work.html')) {
    totalImages = 6;
    popupPrefix = '#popup';
} else if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/khaesu.github.io/') {
    totalImages = 4;
    popupPrefix = '#popup';
}

document.addEventListener("keydown", function (e) {
    const current = document.querySelector(".popup:target");
    if (!current) return;

    // Standard popups (cs images)
    if (/^popup\d+$/.test(current.id)) {
        const index = parseInt(current.getAttribute("data-index"));
        if (e.key === "ArrowRight") {
            const next = index === totalImages ? 1 : index + 1;
            window.location.hash = `${popupPrefix}${next}`;
        }
        if (e.key === "ArrowLeft") {
            const prev = index === 1 ? totalImages : index - 1;
            window.location.hash = `${popupPrefix}${prev}`;
        }
        if (e.key === "Escape") {
            window.location.hash = "";
        }
        return;
    }

    // BLP popups
    if (/^popupBLP\d+$/.test(current.id)) {
        const blpTotal = 4;
        const index = parseInt(current.getAttribute("data-index"));
        if (e.key === "ArrowRight") {
            const next = index === blpTotal ? 1 : index + 1;
            window.location.hash = `#popupBLP${next}`;
        }
        if (e.key === "ArrowLeft") {
            const prev = index === 1 ? blpTotal : index - 1;
            window.location.hash = `#popupBLP${prev}`;
        }
        if (e.key === "Escape") {
            window.location.hash = "";
        }
        return;
    }

    // Comic popups
    if (/^popupComic\d+$/.test(current.id)) {
        const comicTotal = 7; // 7 comic popups
        const index = parseInt(current.getAttribute("data-index"));
        if (e.key === "ArrowRight") {
            const next = index === comicTotal ? 1 : index + 1;
            window.location.hash = `#popupComic${next}`;
        }
        if (e.key === "ArrowLeft") {
            const prev = index === 1 ? comicTotal : index - 1;
            window.location.hash = `#popupComic${prev}`;
        }
        if (e.key === "Escape") {
            window.location.hash = "";
        }
        return;
    }

    // ICLA popups (skip 6)
    if (/^popupIcla\d+$/.test(current.id)) {
        const iclaIndexes = [1,2,3,4,5,7];
        const index = parseInt(current.getAttribute("data-index"));
        const currentPos = iclaIndexes.indexOf(index);
        if (e.key === "ArrowRight") {
            const nextPos = (currentPos + 1) % iclaIndexes.length;
            window.location.hash = `#popupIcla${iclaIndexes[nextPos]}`;
        }
        if (e.key === "ArrowLeft") {
            const prevPos = (currentPos - 1 + iclaIndexes.length) % iclaIndexes.length;
            window.location.hash = `#popupIcla${iclaIndexes[prevPos]}`;
        }
        if (e.key === "Escape") {
            window.location.hash = "";
        }
        return;
    }

    // Fame popups
    if (/^popupFame\d+$/.test(current.id)) {
        const fameTotal = 3; // 3 Fame popups
        const index = parseInt(current.getAttribute("data-index"));
        if (e.key === "ArrowRight") {
            const next = index === fameTotal ? 1 : index + 1;
            window.location.hash = `#popupFame${next}`;
        }
        if (e.key === "ArrowLeft") {
            const prev = index === 1 ? fameTotal : index - 1;
            window.location.hash = `#popupFame${prev}`;
        }
        if (e.key === "Escape") {
            window.location.hash = "";
        }
        return;
    }
});

// Scroll arrow functionality for work section
if (document.querySelector('.scroll-arrow.right') || document.querySelector('.scroll-arrow.left')) {
  document.querySelectorAll('.scroll-arrow.right').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const scroller = btn.parentElement.querySelector('.image-scroller');
      if (scroller) {
        scroller.scrollBy({ left: 600, behavior: 'smooth' });
      }
    });
  });
  document.querySelectorAll('.scroll-arrow.left').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const scroller = btn.parentElement.querySelector('.image-scroller');
      if (scroller) {
        scroller.scrollBy({ left: -600, behavior: 'smooth' });
      }
    });
  });
}

function updateArrows(tileImages) {
  const scroller = tileImages.querySelector('.image-scroller');
  const leftArrow = tileImages.querySelector('.scroll-arrow.left');
  const rightArrow = tileImages.querySelector('.scroll-arrow.right');
  if (!scroller || !leftArrow || !rightArrow) return;

  // Only show arrows if scrolling is possible (robust check)
  if (scroller.scrollWidth - scroller.clientWidth > 1) {
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
  } else {
    // Hide both arrows if no scrolling is possible
    leftArrow.classList.add('hidden');
    rightArrow.classList.add('hidden');
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

  // Update after all images load
  const images = scroller.querySelectorAll('img');
  let loadedCount = 0;
  images.forEach(function(img) {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener('load', function() {
        loadedCount++;
        if (loadedCount === images.length) {
          updateArrows(tileImages);
        }
      });
    }
  });
  // If all images were already loaded
  if (loadedCount === images.length) {
    updateArrows(tileImages);
  }
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

// Prevent scroll-to-top when opening popups from image links
let lastScrollY = 0;
document.querySelectorAll('.tile-images a[href^="#popup"]').forEach(link => {
  link.addEventListener('click', function(e) {
    lastScrollY = window.scrollY;
    setTimeout(() => window.scrollTo(0, lastScrollY), 1);
  });
});

// Restore scroll position when closing popup
window.addEventListener('hashchange', function() {
  if (!location.hash || !location.hash.startsWith('#popup')) {
    setTimeout(() => window.scrollTo(0, lastScrollY), 1);
  }
});

function initMenu() {
  var hamburger = document.getElementById('hamburger-menu');
  var navLinks = document.querySelector('.nav-links');
  var navSocial = document.querySelector('.nav-social');
  var closeMenu = document.getElementById('close-menu');
  function checkWidth() {
    if (window.innerWidth <= 768) {
      hamburger.style.display = 'block';
      navLinks.style.display = 'none';
      navSocial.style.display = 'none';
      closeMenu.style.display = 'none';
      document.body.classList.remove('nav-open');
    } else {
      hamburger.style.display = 'none';
      navLinks.style.display = '';
      navSocial.style.display = '';
      closeMenu.style.display = 'none';
      document.body.classList.remove('nav-open');
    }
  }
  hamburger && hamburger.addEventListener('click', function() {
    var isOpen = document.body.classList.contains('nav-open');
    if (isOpen) {
      document.body.classList.remove('nav-open');
      navLinks.style.display = 'none';
      navSocial.style.display = 'none';
      closeMenu.style.display = 'none';
    } else {
      document.body.classList.add('nav-open');
      navLinks.style.display = 'flex';
      navSocial.style.display = 'flex';
      closeMenu.style.display = 'block';
    }
  });
  closeMenu && closeMenu.addEventListener('click', function() {
    document.body.classList.remove('nav-open');
    navLinks.style.display = 'none';
    navSocial.style.display = 'none';
    closeMenu.style.display = 'none';
  });
  document.querySelectorAll('.nav-links a, .nav-social a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        document.body.classList.remove('nav-open');
        navLinks.style.display = 'none';
        navSocial.style.display = 'none';
        closeMenu.style.display = 'none';
      }
    });
  });
  window.addEventListener('resize', checkWidth);
  document.addEventListener('DOMContentLoaded', checkWidth);
}