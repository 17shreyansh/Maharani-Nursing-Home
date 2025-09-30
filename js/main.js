// Mobile Navigation
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Gallery Slider
let currentSlideIndex = 0;
const totalSlides = 4;
const slidesToShow = window.innerWidth > 768 ? 3 : (window.innerWidth > 600 ? 2 : 1);
const maxSlideIndex = Math.max(0, totalSlides - slidesToShow);

function showSlide(index) {
    const slider = document.getElementById('gallerySlider');
    const counter = document.getElementById('galleryCounter');
    const dots = document.querySelectorAll('.gallery-dot');
    
    const currentSlidesToShow = window.innerWidth > 600 ? 2 : 1;
    const currentMaxIndex = Math.max(0, totalSlides - currentSlidesToShow);
    
    if (index > currentMaxIndex) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = currentMaxIndex;
    
    const slideWidth = window.innerWidth > 600 ? 50 : 100;
    slider.style.transform = `translateX(-${currentSlideIndex * slideWidth}%)`;
    
    const visibleRange = currentSlidesToShow;
    counter.textContent = `${currentSlideIndex + 1}-${Math.min(currentSlideIndex + visibleRange, totalSlides)} / ${totalSlides}`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i >= currentSlideIndex && i < currentSlideIndex + currentSlidesToShow);
    });
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Touch/Swipe functionality for gallery
let startX = 0;
let endX = 0;

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    endX = e.touches[0].clientX;
}

function handleTouchEnd() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}

// Auto-slide functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    
    if (galleryContainer) {
        // Add touch event listeners
        galleryContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        galleryContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
        galleryContainer.addEventListener('touchend', handleTouchEnd);
        
        // Start auto-slide
        startAutoSlide();
        
        // Pause auto-slide on hover/touch
        galleryContainer.addEventListener('mouseenter', stopAutoSlide);
        galleryContainer.addEventListener('mouseleave', startAutoSlide);
        galleryContainer.addEventListener('touchstart', stopAutoSlide);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (window.innerWidth > 900 && mobileMenu) {
        mobileMenu.classList.remove('active');
    }
});