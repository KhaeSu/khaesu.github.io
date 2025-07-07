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

    // Unified popup gallery (popupGallery1 to popupGallery66)
    if (/^popupGallery\d+$/.test(current.id)) {
        const total = 66; // Update if you add/remove images
        const index = parseInt(current.getAttribute("data-index"));
        if (e.key === "ArrowRight") {
            const next = index === total ? 1 : index + 1;
            window.location.hash = `#popupGallery${next}`;
        }
        if (e.key === "ArrowLeft") {
            const prev = index === 1 ? total : index - 1;
            window.location.hash = `#popupGallery${prev}`;
        }
        if (e.key === "Escape") {
            window.location.hash = "";
        }
        return;
    }

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

    // Add or update this block for Personalart popups
    if (/^popupPersonalart\d+$/.test(current.id)) {
        const total = 81;
        const index = parseInt(current.getAttribute("data-index"));
        if (e.key === "ArrowRight") {
            const next = index === total ? 1 : index + 1;
            window.location.hash = `#popupPersonalart${next}`;
        }
        if (e.key === "ArrowLeft") {
            const prev = index === 1 ? total : index - 1;
            window.location.hash = `#popupPersonalart${prev}`;
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
        const scrollAmount = window.innerWidth <= 768 ? 340 : 600;
        scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  });
  document.querySelectorAll('.scroll-arrow.left').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const scroller = btn.parentElement.querySelector('.image-scroller');
      if (scroller) {
        const scrollAmount = window.innerWidth <= 768 ? 340 : 600;
        scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
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
      closeMenu.style.display = 'none';
      document.body.classList.remove('nav-open');
    } else {
      hamburger.style.display = 'none';
      navLinks.style.display = '';
      closeMenu.style.display = 'none';
      document.body.classList.remove('nav-open');
    }
  }
  hamburger && hamburger.addEventListener('click', function() {
    var isOpen = document.body.classList.contains('nav-open');
    if (isOpen) {
      document.body.classList.remove('nav-open');
      navLinks.style.display = 'none';
      closeMenu.style.display = 'none';
    } else {
      document.body.classList.add('nav-open');
      navLinks.style.display = 'flex';
      closeMenu.style.display = 'block';
    }
  });
  closeMenu && closeMenu.addEventListener('click', function() {
    document.body.classList.remove('nav-open');
    navLinks.style.display = 'none';
    closeMenu.style.display = 'none';
  });
  document.querySelectorAll('.nav-links a, .nav-social a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        document.body.classList.remove('nav-open');
        navLinks.style.display = 'none';
        closeMenu.style.display = 'none';
      }
    });
  });
  window.addEventListener('resize', checkWidth);
  document.addEventListener('DOMContentLoaded', checkWidth);
}

// Filter functionality for masonry gallery
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const masonryItems = document.querySelectorAll('.masonry-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter masonry items with smooth transitions
      masonryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
          item.style.pointerEvents = 'auto';
          // Use setTimeout to ensure smooth transition
          setTimeout(() => {
            item.style.display = 'block';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          item.style.pointerEvents = 'none';
          // Hide after transition
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });
});

// Add captions and overlay to masonry gallery images on index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/khaesu.github.io/') {
  fetch('captions.json')
    .then(response => response.json())
    .then(captions => {
      document.querySelectorAll('.masonry-gallery .masonry-item').forEach(function(item) {
        var img = item.querySelector('img');
        if (!img) return;
        var src = img.getAttribute('src');
        var captionText = captions[src] || '';
        // Remove existing overlay and caption if any
        var oldOverlay = item.querySelector('.masonry-overlay');
        if (oldOverlay) oldOverlay.remove();
        var oldCaption = item.querySelector('.masonry-caption');
        if (oldCaption) oldCaption.remove();
        // Create and insert overlay directly after the image
        var overlay = document.createElement('div');
        overlay.className = 'masonry-overlay';
        img.insertAdjacentElement('afterend', overlay);
        // Create and insert caption directly after the overlay
        var caption = document.createElement('div');
        caption.className = 'masonry-caption';
        caption.innerHTML = captionText.replace(/\n/g, '<br>');
        overlay.insertAdjacentElement('afterend', caption);
      });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.masonry-item img').forEach(function(img) {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        img.classList.add('loaded');
      });
    }
  });
});

// Tap-to-show caption on mobile for masonry gallery
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/khaesu.github.io/') {
  function isMobile() {
    return window.matchMedia('(hover: none) and (pointer: coarse), (max-width: 768px)').matches;
  }
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.masonry-gallery .masonry-item img').forEach(function(img) {
      img.addEventListener('click', function(e) {
        if (isMobile()) {
          e.preventDefault();
          var item = img.closest('.masonry-item');
          if (item.classList.contains('show-caption')) {
            item.classList.remove('show-caption');
          } else {
            // Hide captions on all other items
            document.querySelectorAll('.masonry-gallery .masonry-item.show-caption').forEach(function(other) {
              other.classList.remove('show-caption');
            });
            item.classList.add('show-caption');
          }
        }
      });
    });
    // Optional: Hide caption if user taps anywhere else
    document.body.addEventListener('click', function(e) {
      if (isMobile()) {
        var masonryItem = e.target.closest('.masonry-item');
        if (!masonryItem) {
          document.querySelectorAll('.masonry-gallery .masonry-item.show-caption').forEach(function(item) {
            item.classList.remove('show-caption');
          });
        }
      }
    }, true);
  });
}