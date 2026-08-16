/*!
    Title: Dev Portfolio Template
    Version: 1.2.2
    Last Change: 03/25/2020
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Show current year
    $("#current-year").text(new Date().getFullYear());

    // Remove no-js class
    $('html').removeClass('no-js');

    var $header = $('header');
    var $body = $('body');
    var $menuOpen = $('#mobile-menu-open');
    var $menuClose = $('#mobile-menu-close');

    function openMobileMenu() {
        $header.add($body).addClass('active');
        $menuOpen.attr('aria-expanded', 'true');
        $menuClose.trigger('focus');
    }

    function closeMobileMenu(restoreFocus) {
        $header.add($body).removeClass('active');
        $menuOpen.attr('aria-expanded', 'false');

        if (restoreFocus) {
            $menuOpen.trigger('focus');
        }
    }

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($header.hasClass('active')) {
            closeMobileMenu(false);
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down button').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $menuOpen.click(function() {
        openMobileMenu();
    });

    // Close mobile menu
    $menuClose.click(function() {
        closeMobileMenu(true);
    });

    // Close the mobile menu with Escape
    $(document).keydown(function(e) {
        if (e.key === 'Escape' && $header.hasClass('active')) {
            closeMobileMenu(true);
        }
    });

    // Reset mobile menu state when returning to the desktop layout
    $(window).resize(function() {
        if (window.innerWidth > 768 && $header.hasClass('active')) {
            closeMobileMenu(false);
        }
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

})(jQuery);
