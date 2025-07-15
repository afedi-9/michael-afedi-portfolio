// Hide loading animation when page is fully loaded
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const darkModeToggle = document.querySelector('#darkmode');
    
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
    
    // Mobile menu toggle with animation
    if (menu && navbar && overlay) {
        let isMenuOpen = false;
        let isAnimating = false;
        const ANIMATION_DURATION = 300; // ms
        
        // Make sure menu icon is visible on mobile and hidden on desktop
        function updateMenuVisibility() {
            if (window.innerWidth <= 991) {
                menu.style.display = 'flex';
                navbar.style.display = 'none';
            } else {
                menu.style.display = 'none';
                navbar.style.display = 'flex';
            }
        }
        
        // Initial setup
        updateMenuVisibility();
        window.addEventListener('resize', updateMenuVisibility);
        
        // Initialize menu state based on screen size
        function initMenu() {
            if (window.innerWidth > 991) {
                // Desktop view - always show navbar
                navbar.style.display = 'flex';
                navbar.style.transform = 'none';
                overlay.style.display = 'none';
                document.body.style.overflow = '';
                navbar.classList.remove('active');
                overlay.classList.remove('active');
                menu.classList.remove('active');
                isMenuOpen = false;
            } else {
                // Mobile view - hide by default
                navbar.style.display = 'flex';
                navbar.style.transform = 'translateX(100%)';
                overlay.style.display = 'none';
                navbar.classList.remove('active');
                overlay.classList.remove('active');
                menu.classList.remove('active');
                isMenuOpen = false;
            }
        }
        
        // Call once on load
        initMenu();
        
        // Handle window resize
        function handleResize() {
            if (window.innerWidth > 991) {
                // Desktop view
                navbar.style.display = 'flex';
                navbar.style.transform = 'none';
                overlay.style.display = 'none';
                document.body.style.overflow = '';
                navbar.classList.remove('active');
                overlay.classList.remove('active');
                menu.classList.remove('active');
                isMenuOpen = false;
            } else if (isMenuOpen) {
                // If mobile menu was open before resize
                navbar.style.display = 'flex';
                navbar.style.transform = 'translateX(0)';
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
                navbar.classList.add('active');
                overlay.classList.add('active');
                menu.classList.add('active');
            } else {
                // Mobile view - hide menu
                navbar.style.display = 'flex';
                navbar.style.transform = 'translateX(100%)';
                overlay.style.display = 'none';
                document.body.style.overflow = '';
                navbar.classList.remove('active');
                overlay.classList.remove('active');
                menu.classList.remove('active');
            }
        }
        
        // Add resize event listener
        window.addEventListener('resize', handleResize);
        
        // Variables are already declared at the top of the if block
        
        // Function to show menu
        const showMenu = () => {
            if (isAnimating || isMenuOpen) return;
            isAnimating = true;
            isMenuOpen = true;
            
            // Show overlay and navbar
            overlay.style.display = 'block';
            navbar.style.display = 'flex';
            
            // Add active classes
            navbar.classList.add('active');
            overlay.classList.add('active');
            menu.classList.add('active');
            menu.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            
            // Prevent scrolling on body
            document.documentElement.style.overflow = 'hidden';
            
            isAnimating = false;
        };
        
        // Function to hide menu
        const hideMenu = () => {
            if (isAnimating || !isMenuOpen) return;
            isAnimating = true;
            isMenuOpen = false;
            
            // Remove active classes
            navbar.classList.remove('active');
            overlay.classList.remove('active');
            menu.classList.remove('active');
            menu.setAttribute('aria-expanded', 'false');
            
            // Re-enable scrolling
            document.documentElement.style.overflow = '';
            
            // Hide overlay after transition
            setTimeout(() => {
                overlay.style.display = 'none';
                navbar.style.display = 'none';
                document.body.style.overflow = '';
                isAnimating = false;
            }, ANIMATION_DURATION);
        };
        
        // Toggle menu function
        const toggleMenu = (event) => {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Prevent toggling during animation
            if (isAnimating) return;
            
            if (isMenuOpen) {
                hideMenu();
            } else {
                showMenu();
            }
        };
        
        // Close menu when clicking outside
        const closeOnClickOutside = (event) => {
            const isClickInsideMenu = navbar.contains(event.target);
            const isClickOnMenuIcon = menu.contains(event.target);
            
            if (isMenuOpen && !isClickInsideMenu && !isClickOnMenuIcon) {
                hideMenu();
            }
        };
        
        // Close menu on Escape key
        const closeOnEscape = (event) => {
            if (event.key === 'Escape' && isMenuOpen) {
                hideMenu();
            }
        };
        
        // Add event listeners
        menu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = link.getAttribute('href');
                
                // Only hide menu if it's open
                if (isMenuOpen) {
                    hideMenu();
                }
                
                // Then scroll to section after a small delay
                if (targetId && targetId !== '#') {
                    setTimeout(() => {
                        const targetSection = document.querySelector(targetId);
                        if (targetSection) {
                            window.scrollTo({
                                top: targetSection.offsetTop - 80, // Adjust for header
                                behavior: 'smooth'
                            });
                        }
                    }, isMenuOpen ? ANIMATION_DURATION / 2 : 0);
                }
            });
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', hideMenu);
        
        // Initialize menu state
        navbar.style.display = 'none';
        overlay.style.display = 'none';
        
        // Add animation delay to menu items
        navLinks.forEach((link, index) => {
            link.style.setProperty('--i', index);
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    // Add a small delay before closing to allow the click to register
                    setTimeout(toggleMenu, 300);
                }
            });
        });
        
        // Prevent body scroll when menu is open
        document.body.addEventListener('touchmove', (e) => {
            if (isMenuOpen) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
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
            const backToTopButton = document.getElementById('backToTop');
            if (backToTopButton) {
                const shouldShowButton = window.pageYOffset > 300;
                backToTopButton.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
                
                if (shouldShowButton) {
                    backToTopButton.style.opacity = '1';
                    backToTopButton.style.visibility = 'visible';
                } else {
                    backToTopButton.style.opacity = '0';
                    backToTopButton.style.visibility = 'hidden';
                }
            }
            
            // Close mobile menu on scroll if open
            if (navbar && navbar.classList.contains('active')) {
                // Add a small delay to allow scroll to complete
                setTimeout(() => {
                    document.querySelector('#menu-icon').click();
                }, 100);
            }
        }, 50); // Adjust the timeout as needed (in milliseconds)
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Dark Mode Toggle
    let darkmode = document.querySelector('#darkmode');
    if (darkmode) {
        darkmode.onclick = () => {
            if (darkmode.classList.contains('bx-moon')) {
                darkmode.classList.replace('bx-moon', 'bx-sun');
                document.body.classList.add('active');
            } else {
                darkmode.classList.replace('bx-sun', 'bx-moon');
                document.body.classList.remove('active');
            }
        };
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
    const backToTopButton = document.getElementById('backToTop');
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