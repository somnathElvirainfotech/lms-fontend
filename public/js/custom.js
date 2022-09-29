
$(document).ready(function () {
    $('#banner-slider').owlCarousel({
        loop: true,
        autoplay: false,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-chevron-left"</i>', '<i class="fa fa-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })

    $('#partner-slider').owlCarousel({
        loop: true,
        autoplay: true,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-chevron-left"</i>', '<i class="fa fa-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    })

    $('#high-rated-slider').owlCarousel({
        loop: true,
        autoplay: false,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-chevron-left"</i>', '<i class="fa fa-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    })

    $('#community-slider').owlCarousel({
        loop: true,
        autoplay: false,
        nav: true,
        dots: false,
        margin: 10,
        navText: ['<i class="fa fa-chevron-left"</i>', '<i class="fa fa-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })



    $('#my-course-list-slider').owlCarousel({
        loop: false,
        autoplay: false,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });




    $('#assignment-list-slider').owlCarousel({
        loop: true,
        autoplay: false,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });


    $('#task-list-slider').owlCarousel({
        loop: true,
        autoplay: false,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });




    jQuery(function () {
        createSticky(jQuery(".header"));
    });

    function createSticky(sticky) {
        if (typeof sticky != "undefined") {

            var pos = sticky.offset().top,
                win = jQuery(window);

            win.on("scroll", function () {

                if (win.scrollTop() > pos) {
                    sticky.addClass("stickyhead");
                } else {
                    sticky.removeClass("stickyhead");
                }
            });
        }
    }

    $(document).ready(function () {
        //alert("1!");
        /*mega menu*/
        $('#mega-menu-fresher li').on('mouseenter', function () {
            //alert("2!");
            if ($(this).siblings().children().hasClass('active-mega-menu')) {
                $(this).siblings().children().removeClass('active-mega-menu');
            }
            $(this).children().addClass('active-mega-menu');
        });
        $('#mega-menu-fresher').hover(function () {
            $('#mega-menu-fresher li').children().removeClass('active-mega-menu');
            $('#mega-menu-fresher li:first-child').children().addClass('active-mega-menu');
        });

        $('.cat-menu ul.menu-list li#mega-menu-parent').hover(function () {
            //alert("3!");
            $('#mega-menu-fresher').toggle();
        });
        $('#mega-menu-fresher ul li.vegies').hover(function () {
            $(this).children('a.active-mega-menu').css('color', '#000');
        });
        $('#mega-menu-fresher ul li.vegies').hover(function () {
            $(this).children('a.active-mega-menu').css('color', '#000');
        });
    });


    $('[data-toggle="tooltip"]').tooltip();



});



// $(document).ready(function(){
//   $(".hamburger").click(function(){
//     $(this).toggleClass("is-active");
//   });
// });

// $("#hamburger-1").click(function(){
//   $(".menu-sec").toggle();
// });

// function openNav() {
//     document.getElementById("myNav").style.width = "100%";
// }

// function closeNav() {
//     document.getElementById("myNav").style.width = "0%";
// }