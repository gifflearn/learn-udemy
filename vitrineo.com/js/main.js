
function main() {

    (function () {
        'use strict';

        window.sr = ScrollReveal({reset: false});

        // Hide .navbar first
        /*$(".navbar:not(.navbar-show)").hide();
        $(".navbar-shadows:not(.navbar-show)").hide();

        var chemincomplet = document.location.href;
        if (chemincomplet.indexOf('fonctionnalites/')>0 || chemincomplet.indexOf('mentions/')>0) {
            $('.navbar:not(.navbar-show)').fadeIn();
        } else {

            // Fade in .navbar
            $(function () {
                $(window).scroll(function () {
                    // set distance user needs to scroll before we fadeIn navbar
                    if ($(this).scrollTop() >200) {
                        $('.navbar:not(.navbar-show)').fadeIn();
                        $('.navbar-shadows:not(.navbar-show)').fadeIn();
                    } else {
                        $('.navbar:not(.navbar-show)').fadeOut();
                        $('.navbar-shadows:not(.navbar-show)').fadeOut();
                    }
                });
            });
        }*/

         $('.navbar:not(.navbar-show)').fadeIn();
                        $('.navbar-shadows:not(.navbar-show)').fadeIn();


        // Fade in sous menu au survol
        $('ul.nav li.dropdown').hover(function () {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function () {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });

        // Preloader */
        $(window).load(function () {

            // will first fade out the loading animation 
            $("#status").fadeOut("slow");

            // will fade out the whole DIV that covers the website. 
            $("#preloader").delay(500).fadeOut("slow").remove();

        })

        // Page scroll
        $('a.page-scroll').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 40
                    }, 900);
                    return false;
                }
            }
        });

        // Show Menu on Book
        $(window).bind('scroll', function () {
            var navHeight = $(window).height() - 100;
            if ($(window).scrollTop() > navHeight) {
                $('.navbar-default').addClass('on');
            } else {
                $('.navbar-default').removeClass('on');
            }
        });

        $('body').scrollspy({
            target: '.navbar-default',
            offset: 80
        });

//        $(document).ready(function () {
//            $("#testimonial").owlCarousel({
//                navigation: false, // Show next and prev buttons
//                slideSpeed: 300,
//                paginationSpeed: 400,
//                singleItem: true
//            });
//
//        });

        // Portfolio Isotope Filter
        /*$(window).load(function() {
         var $container = $('.portfolio-items');
         $container.isotope({
         filter: '*',
         animationOptions: {
         duration: 750,
         easing: 'linear',
         queue: false
         }
         });
         $('.cat a').click(function() {
         $('.cat .active').removeClass('active');
         $(this).addClass('active');
         var selector = $(this).attr('data-filter');
         $container.isotope({
         filter: selector,
         animationOptions: {
         duration: 750,
         easing: 'linear',
         queue: false
         }
         });
         return false;
         });
         
         });*/



        // jQuery Parallax
        function initParallax() {
            //$('#intro').parallax("100%", 0.3);
            $('#services').parallax("100%", 0.3);
            $('#aboutimg').parallax("100%", 0.3);
            $('#testimonials').parallax("100%", 0.1);

        }
        initParallax();

        // Pretty Photo
        $("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false
        });

        var list = $('.flip-texts li');
        var nb = list.length;
        var i = 0;

        var animate = function () {
            $('.flip-texts li.active').animate({left: 0}, 4000, 'linear', function () {
                $(list).removeClass('active');
                i++;
                i = i % 3;
                $(list[i]).addClass('active');
                animate();
            });
        }
        animate();

        enquire.register("screen and (min-width: 640px)", {
            match: function () {
                /**
                 * Scroll Reveal
                 */
                sr.reveal('.reveal--from-left', {
                    origin: 'left',
                    distance: '100%'
                });
                sr.reveal('.reveal--from-right', {
                    origin: 'right',
                    distance: '100%'
                });
                sr.reveal('.reveal--from-top', {
                    origin: 'top',
                    distance: '100%'
                });
                sr.reveal('.reveal--from-bottom', {
                    origin: 'bottom',
                    distance: '100%',
                    viewFactor: 0.9
                });


                sr.reveal('.portfolio-item', {rotate: {x: 200}, origin: 'top', distance: '100%'}, 50);
                sr.reveal('.testimonials blockquote', {origin: 'top', distance: '100%'}, 110);
                // Diapositives
               // sr.reveal('.diaporama__contenu .diaporama__contenu__image', {origin: 'top', distance: '100%'}, 110);
                sr.reveal('.diaporama__contenu .diaporama__contenu__texte_bas', {origin: 'bottom', distance: '100%'}, 310);
            },
            unmatch: function () {
                // Hide the sidebar
            }
        });
    }());

}
main();