// ============================================
// DOM Elements
// ============================================

const preloader = document.querySelector('.preloader');
const navbar = document.querySelector('.navbar');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const backToTop = document.getElementById('backToTop');
const circuitZoomBtn = document.getElementById('zoomCircuit');
const circuitModal = document.getElementById('circuitModal');
const modalClose = document.getElementById('modalClose');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const copyButtons = document.querySelectorAll('.btn-copy');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryThumbnails = document.querySelectorAll('.thumbnail');
const galleryImages = document.querySelectorAll('.gallery-image');
const downloadReportBtn = document.getElementById('downloadReport');
const revealElements = document.querySelectorAll('.reveal-text');
const flowSteps = document.querySelectorAll('.flow-step');
const timelineMarkers = document.querySelectorAll('.timeline-marker');
const timelineBar = document.querySelector('.timeline-bar');
const metricFills = document.querySelectorAll('.metric-fill');

// ============================================
// Preloader
// ============================================

window.addEventListener('load', () => {
    // Hide preloader after page loads
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// ============================================
// Theme Toggle
// ============================================

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const icon = mobileMenuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.querySelector('i').classList.remove('fa-times');
        mobileMenuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// ============================================
// Scroll Progress Indicator
// ============================================

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (scrollProgressBar) {
        scrollProgressBar.style.width = scrolled + '%';
    }
    
    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Animate methodology steps
    animateMethodologySteps();
    
    // Animate metric bars
    animateMetricBars();
});

// ============================================
// Back to Top Button
// ============================================

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Active Navigation Link Update
// ============================================

function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Circuit Diagram Zoom Modal
// ============================================

if (circuitZoomBtn) {
    circuitZoomBtn.addEventListener('click', () => {
        circuitModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        circuitModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
circuitModal.addEventListener('click', (e) => {
    if (e.target === circuitModal) {
        circuitModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// Tab System for Code Section
// ============================================

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// ============================================
// Copy to Clipboard Functionality
// ============================================

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const codeElement = document.getElementById(targetId);
        const codeText = codeElement.textContent;
        
        // Use Clipboard API to copy text
        navigator.clipboard.writeText(codeText).then(() => {
            // Visual feedback
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.classList.add('copied');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.innerHTML = '<i class="far fa-copy"></i> Copy';
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
            
            setTimeout(() => {
                button.innerHTML = '<i class="far fa-copy"></i> Copy';
            }, 2000);
        });
    });
});

// ============================================
// Image Gallery
// ============================================

let currentGalleryIndex = 0;

function updateGallery(index) {
    // Remove active class from all images and thumbnails
    galleryImages.forEach(img => img.classList.remove('active'));
    galleryThumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to current image and thumbnail
    galleryImages[index].classList.add('active');
    galleryThumbnails[index].classList.add('active');
    currentGalleryIndex = index;
}

if (galleryPrev && galleryNext) {
    galleryPrev.addEventListener('click', () => {
        let newIndex = currentGalleryIndex - 1;
        if (newIndex < 0) newIndex = galleryImages.length - 1;
        updateGallery(newIndex);
    });
    
    galleryNext.addEventListener('click', () => {
        let newIndex = currentGalleryIndex + 1;
        if (newIndex >= galleryImages.length) newIndex = 0;
        updateGallery(newIndex);
    });
}

// Thumbnail click events
galleryThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        updateGallery(index);
    });
});

// ============================================
// Download Report Button
// ============================================

if (downloadReportBtn) {
    downloadReportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // In a real implementation, this would link to an actual PDF
        // For demo purposes, we'll show an alert
        alert('Download functionality would link to a PDF file in a real implementation. For this demo, the download is simulated.');
        
        // You could implement actual download like this:
        // window.open('path/to/report.pdf', '_blank');
    });
}

// ============================================
// Scroll Animation with Intersection Observer
// ============================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with reveal-text class
revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ============================================
// Methodology Steps Animation
// ============================================

function animateMethodologySteps() {
    const methodologySection = document.querySelector('.methodology-section');
    if (!methodologySection) return;
    
    const sectionTop = methodologySection.offsetTop;
    const sectionHeight = methodologySection.clientHeight;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Check if methodology section is in view
    if (scrollPosition > sectionTop - windowHeight * 0.8 && 
        scrollPosition < sectionTop + sectionHeight) {
        
        // Calculate progress through the section (0 to 1)
        const progress = Math.min(1, Math.max(0, 
            (scrollPosition - sectionTop + windowHeight * 0.5) / (sectionHeight * 0.7)));
        
        // Update timeline bar
        if (timelineBar) {
            timelineBar.style.width = `${progress * 100}%`;
        }
        
        // Show steps based on progress
        const stepCount = flowSteps.length;
        const visibleStep = Math.floor(progress * stepCount);
        
        flowSteps.forEach((step, index) => {
            if (index <= visibleStep) {
                step.classList.add('visible');
            } else {
                step.classList.remove('visible');
            }
        });
        
        // Update timeline markers
        timelineMarkers.forEach((marker, index) => {
            if (index <= visibleStep) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }
}

// ============================================
// Animate Metric Bars
// ============================================

function animateMetricBars() {
    const calculationsSection = document.querySelector('.calculations-section');
    if (!calculationsSection) return;
    
    const sectionTop = calculationsSection.offsetTop;
    const sectionHeight = calculationsSection.clientHeight;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Check if calculations section is in view
    if (scrollPosition > sectionTop - windowHeight * 0.7) {
        metricFills.forEach(fill => {
            // Set width to the computed style width (already set via inline style)
            // This triggers the CSS transition
            fill.style.width = fill.style.width;
        });
    }
}

// ============================================
// Initialize Animations on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initial active nav link
    updateActiveNavLink();
    
    // Initialize metric bars with 0 width
    metricFills.forEach(fill => {
        fill.style.width = '0%';
    });
    
    // Check for animations on initial load if section is in view
    setTimeout(() => {
        animateMethodologySteps();
        animateMetricBars();
        
        // Check for reveal elements in view on load
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    }, 100);
});

// ============================================
// Responsive Adjustments
// ============================================

window.addEventListener('resize', () => {
    // Update any layout-dependent calculations
    animateMethodologySteps();
});

// ============================================
// Keyboard Navigation
// ============================================

document.addEventListener('keydown', (e) => {
    // Escape key closes modal
    if (e.key === 'Escape' && circuitModal.classList.contains('active')) {
        circuitModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Arrow keys for gallery navigation
    if (e.key === 'ArrowLeft') {
        galleryPrev.click();
    } else if (e.key === 'ArrowRight') {
        galleryNext.click();
    }
});

// ============================================
// Print-Friendly Page
// ============================================

// Add print button functionality (optional)
const printButton = document.createElement('button');
printButton.innerHTML = '<i class="fas fa-print"></i> Print Page';
printButton.className = 'btn btn-secondary';
printButton.style.position = 'fixed';
printButton.style.bottom = '100px';
printButton.style.right = '20px';
printButton.style.zIndex = '99';

printButton.addEventListener('click', () => {
    window.print();
});

// Uncomment to add print button
// document.body.appendChild(printButton);