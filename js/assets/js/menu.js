/**
 * Check initial viewport width when DOM is loaded
 * Determines if mobile or desktop menu should be displayed
 */
document.addEventListener("DOMContentLoaded", checkViewportWidth);

/**
 * Applies appropriate menu classes based on viewport width
 * Adds desktop or mobile classes depending on screen size
 */
function checkViewportWidth() {
    const menuContainer = document.querySelector('.container-menu');
    if (!menuContainer) return;

    const viewportWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
    );

    // Apply appropriate menu style based on viewport width
    if (viewportWidth >= 768) {
        menuContainer.classList.add("menu-desktop");
        menuContainer.classList.remove("menu-mobile");
    } else {
        menuContainer.classList.add("menu-mobile");
        menuContainer.classList.remove("menu-desktop");
    }
}

// Monitor viewport width changes
window.addEventListener('resize', checkViewportWidth);

// Initialize mobile menu toggle functionality if menu exists
const menuContainer = document.querySelector('.container-menu');
if (menuContainer) {
    const menuToggle = document.querySelector('.item-icon');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
}

/**
 * Toggles the mobile fly-out menu visibility
 * Manages related classes for animation and scroll behavior
 */
function toggleMobileMenu() {
    const menuIcon = document.querySelector('.item-icon');
    const menuContainer = document.querySelector('.container-menu');
    const menuList = document.querySelector('.container-menu ul');
    const htmlElement = document.querySelector('html');

    // Toggle hamburger icon animation
    menuIcon.classList.toggle("change");

    // If menu is being opened
    if (menuIcon.classList.contains('change')) {
        menuList.classList.add('mobile-display');
        menuContainer.classList.add('menu-on-scroll');
        htmlElement.classList.add('no-scroll');
    } else {
        // If menu is being closed
        menuList.classList.remove('mobile-display');
        htmlElement.classList.remove('no-scroll');
        menuContainer.classList.remove('menu-on-scroll');
    }
}

/**
 * Initialize scroll event handling for menu styling
 */
if (document.querySelector('.container-menu')) {
    window.addEventListener('scroll', swapMenuStyle);
}

/**
 * Changes menu styling when page is scrolled beyond a threshold
 */
function swapMenuStyle() {
    const menuContainer = document.querySelector('.container-menu');
    if (!menuContainer) return;

    const scrollThreshold = menuContainer.offsetTop + 300;

    if (window.pageYOffset > scrollThreshold) {
        menuContainer.classList.add("menu-on-scroll");
    } else {
        menuContainer.classList.remove("menu-on-scroll");
    }
}

/**
 * Check initial menu scroll position when DOM is loaded
 * Ensures proper styling based on initial scroll position
 */
document.addEventListener("DOMContentLoaded", checkMenuScrollPosition);

/**
 * Removes scroll-based styling if page is at the top
 */
function checkMenuScrollPosition() {
    const menuContainer = document.querySelector('.container-menu');
    if (!menuContainer) return;

    if (window.scrollY === 0) {
        menuContainer.classList.remove("menu-on-scroll");
    }
}
