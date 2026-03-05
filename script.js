document.addEventListener('DOMContentLoaded', () => {

    /**
     * Mobile Nav Toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.getElementById('navmenu');

    if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', function () {
            navMenu.classList.toggle('hidden');
            navMenu.classList.toggle('flex');
            this.classList.toggle('open-menu'); // Custom class for icon change
        });
    }

    /**
     * SPA Page Routing Logic (Mimicking DA5100 data-page behavior)
     */
    const navItems = document.querySelectorAll('.navItem');
    const pages = document.querySelectorAll('.page');

    function switchPage(pageId) {
        // Toggle Active Link
        navItems.forEach(item => {
            if (item.getAttribute('data-page') === pageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Toggle Active Section
        pages.forEach(page => {
            if (page.classList.contains(`page-${pageId}`)) {
                page.classList.add('active');

                // Trigger reflow/animation restarts if necessary
                window.scrollTo({ top: 0, behavior: 'instant' });
            } else {
                page.classList.remove('active');
            }
        });

        // Hide mobile menu on strict click
        if (window.innerWidth < 1024 && !navMenu.classList.contains('hidden')) {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex');
        }
    }

    // Attach click listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = e.currentTarget.getAttribute('data-page');
            if (targetPage) {
                switchPage(targetPage);
            }
        });
    });

    // Handle Tabs logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

});
