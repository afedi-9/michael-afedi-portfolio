// Hide loading animation when page is ready
(function() {
    let loadingHidden = false;

    function hideLoading() {
        if (loadingHidden) return;
        const loading = document.getElementById('loading');
        if (!loading) {
            loadingHidden = true;
            return;
        }

        loadingHidden = true;
        loading.classList.add('fade-out');

        setTimeout(() => {
            loading.style.display = 'none';
        }, 600);
    }

    document.addEventListener('DOMContentLoaded', hideLoading);
    window.addEventListener('load', hideLoading);
    setTimeout(hideLoading, 2500);
})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const darkModeToggle = document.querySelector('#darkmode');
    const backToTopButton = document.getElementById('backToTop');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking a link
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Add 'scrolled' class to header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Handle scroll events with throttle for better performance
    let isScrolling;
    function handleScroll() {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);
        
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {
            // Toggle header shadow with smooth transition
            if (header) {
                const shouldShowShadow = window.scrollY > 10;
                header.style.transition = 'box-shadow 0.3s ease';
                header.classList.toggle('shadow', shouldShowShadow);
            }
            
            // Show/hide back to top button with fade effect
            if (backToTopButton) {
                const shouldShowButton = window.pageYOffset > 300;
                backToTopButton.classList.toggle('show', shouldShowButton);
            }
        }, 50); // Adjust the timeout as needed (in milliseconds)
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // Dark Mode Toggle
    const THEME_STORAGE_KEY = 'theme';
    const darkmode = document.querySelector('#darkmode');

    function setDarkMode(isDark) {
        document.body.classList.toggle('active', isDark);
        document.body.classList.toggle('dark', isDark);

        if (!darkmode) return;
        if (isDark) {
            if (darkmode.classList.contains('bx-moon')) darkmode.classList.replace('bx-moon', 'bx-sun');
            if (darkmode.classList.contains('bxs-moon')) darkmode.classList.replace('bxs-moon', 'bxs-sun');
            if (!darkmode.classList.contains('bx-sun') && !darkmode.classList.contains('bxs-sun')) {
                darkmode.classList.add('bxs-sun');
            }
        } else {
            if (darkmode.classList.contains('bx-sun')) darkmode.classList.replace('bx-sun', 'bx-moon');
            if (darkmode.classList.contains('bxs-sun')) darkmode.classList.replace('bxs-sun', 'bxs-moon');
            if (!darkmode.classList.contains('bx-moon') && !darkmode.classList.contains('bxs-moon')) {
                darkmode.classList.add('bxs-moon');
            }
        }
    }

    function getInitialTheme() {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'dark') return true;
        if (saved === 'light') return false;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setDarkMode(getInitialTheme());

    if (darkmode) {
        darkmode.addEventListener('click', () => {
            const isDark = !document.body.classList.contains('active');
            setDarkMode(isDark);
            localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
        });
    }
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});