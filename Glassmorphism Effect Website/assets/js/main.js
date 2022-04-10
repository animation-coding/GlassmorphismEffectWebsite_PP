

// repeated variables
var $window = $(window);
var $root = $('html, body');
var $lastWindowWidth = 0;
var $lastHash = 0;

$(document).ready(function() {

    "use strict";
    deviceScreen();
    date();
    mobileDesign()
    portfolioPopup();
    sidebarMenu();
    mapInit();
    mouseMagicCursor();
    ColorPallet();
    themeOption();
});

$window.on("load", function() {
    $lastWindowWidth = $window.width();
    pagePreloader();
    scrollToAnchor();
    customScrollbar();
    portfolioIsotop();
    owlCrousel();
});

$window.on("resize", function() {
    if ($lastWindowWidth != $window.width()) {
        location.reload();
    }
});

$window.on("popstate", function(){
    if($lastHash ==1){
        $lastHash =0;
    }

    else if($lastHash == 0){
        
        var func = animateRandom();

        var $value = location.hash.replace('#', '');
        var $main = $('#main');
        var $first = '#' + $("#main > section:first-child").attr('id');
        var $last = '#' + $("#main > section:last-child").attr('id');
        var $id = location.hash;
        var $thisId = '#' + $("#main > section.active").attr('id');
        $(".menu > li a").removeClass("active");
        if($value == ''){
            $id = $first;
            $value = $("#main > section:first-child").attr('id');
        }
        if ($('.left-side').hasClass("nav-open")) {
            $(".menu-toggle").removeClass("menu-open");
            $(".menu-overlay").addClass("d-none");
            $('.left-side').animate({
                left: "200%"
            }, 300).removeClass("nav-open").addClass("nav-close");
        }
        $('.menu > li a[href$=' + $value + ']').addClass('active');
        if(  ($id == $last && !($thisId == $first)) ||
         ($id == $first && !($thisId == $last))){
            openMenu();
            if($window.width()<992){
                $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
            }
            else{
                $("#main > section.active").removeClass("active");      
                $main.children($id).addClass('active');
            }
            
            $('#main > section.active').css({width: '100%'});
        }
        else if( ($id != $last && $id != $first  && ($thisId == $first || $thisId == $last ))){
            closeMenu();
            if($window.width()<992){
                $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
            }
            else{
                $("#main > section.active").removeClass("active");      
                $main.children($id).addClass('active');
            }
        }
        else if(  ($id == $last && $thisId == $first ) || 
        ($id == $first && $thisId == $last ) ) {
            $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
        }
        else if(  ($id != $last && $thisId != $first ) || 
        ($id != $first && $thisId != $last ) ) {
            $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
        }
        

    }
});



/***typing***/ 
const text = document.querySelector(".sec-text");

        const textLoad = () => {
            setTimeout(() => {
                text.textContent = "Freelancer";
            }, 0);
            setTimeout(() => {
                text.textContent = "Designer";
            }, 4000);
            setTimeout(() => {
                text.textContent = "YouTuber";
            }, 8000); //1s = 1000 milliseconds
        }

        textLoad();
        setInterval(textLoad, 12000);


/******/









/*-----------------------------------------------------------------------------
                                   FUNCTIONS
-----------------------------------------------------------------------------*/

/*-------------------------  Date  -------------------------*/
function deviceScreen() {
    if($window.width()>1440){
        $('html').css('zoom', $window.width()/1440);
        $('.middle-line').css({'top':$('body').height()/2 , 'width': '2px' , 'left':'50%' , 'transform': 'translate(-50% , -50%)'})
    }
    else{
        $('.middle-line').css({'top':'50%' , 'width': '2px' , 'left':'50%' , 'transform': 'translate(-50% , -50%)'});
    }
}

/*-------------------------  Date  -------------------------*/
function date() {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    //var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    $('#date').html('<span><b>' + newDate.getDate() + '</b></span>' + '<span>' + monthNames[newDate.getMonth()] + '</span> ' + newDate.getFullYear());
}

/*-------------------------  Preloader  -------------------------*/
function pagePreloader() {

    "use strict";
    var preloader = $('#line-loader');
    preloader.addClass('preloaded');

    // setTimeout(function() {
    // }, 800);
    setTimeout(function() {
        preloader.remove();
    }, 1000);
    
}

/*-------------------------  Custom Scrollbar  -------------------------*/
function customScrollbar() {
    "use strict";
    if($window.width()>991){
        $.mCustomScrollbar.defaults.scrollButtons.enable = true;
        $.mCustomScrollbar.defaults.axis = "y";
        $(".section").not('.hero').mCustomScrollbar({
            theme: "light",
            callbacks: {
                whileScrolling: function() {
                    if ($("#main > section.active").attr('id') == 'about') {
                        skills();
                        countup();
                    }
                }
            },
        });
    } else {
        $("#about").on("scroll",function() {
            skills();
            countup();
        });
    }
}

/*-------------------------  Count up  -------------------------*/
function countup() {
    "use strict";
    var hT = $('.count-up').offset().top,
        hH = $('.count-up').outerHeight(),
        wH = $(window).height(),
        wS = $(window).scrollTop();
    if (wS > (hT + hH - wH)) {
        $('.timer').countTo();
        $('.count-number').removeClass('timer');
    }
}

/*-------------------------  Skills  -------------------------*/
function skills() {
    "use strict";
    var hT = $('.skills').offset().top,
        hH = $('.skills').outerHeight(),
        wH = $(window).height(),
        wS = $(window).scrollTop(),
        percent,
        progressEnd,
        skillDP;
    if (wS > (hT + hH - wH)) {
        $('.skill-box:not([data-processed]').each(function() {
            skillDP = $(this).find('.skillbar').attr('data-percent');
            $(this).attr("data-processed", "true");
            $(this).find('.skillbar-bar').animate({
                width: skillDP
            }, 4000);
            progressEnd = parseInt(skillDP);
            percent = $(this).find('.skill-bar-percent span');
            percent.countTo();

        });
        
    }
}

/*-------------------------  Mobile Menu  -------------------------*/
function mobileDesign() {
    "use strict";
    $('.menu-toggle').on('click', function() {
        menuAnimation();
    });
    $('.menu li a').on('click', function() {
        if ($window.width() < 992) {
            menuAnimation();
        }
    });
}

function menuAnimation() {

    "use strict";

    var $leftSide = $('.left-side');
    if ($leftSide.hasClass("nav-open")) {
        $(".menu-toggle").removeClass("menu-open");
        $(".menu-overlay").addClass("d-none");
        if ($window.width() < 992) {
            $(".next-prev-page").removeClass("d-none");
        }
        $leftSide.animate({
            left: "200%"
        }, 300).removeClass("nav-open").addClass("nav-close");
    } else if ($leftSide.hasClass("nav-close")) {
        $(".menu-toggle").addClass("menu-open");
        $(".menu-overlay").removeClass("d-none");
        if ($window.width() < 992) {
            $(".next-prev-page").addClass("d-none");
        }
        $leftSide.animate({
            left: "15px"
        }, 300).removeClass("nav-close").addClass("nav-open");
    }
}

/*-------------------------  Scroll To Anchor  -------------------------*/
function scrollToAnchor() {
    "use strict";

    //getting the anchor link in the URL and deleting the `#`
    var value = window.location.hash.replace('#', '');
    var firstId = $("#main > section:first-child").attr('id');
    var lastId = $("#main > section:last-child").attr('id');
    if (value.length == 0 || value == firstId) {
        $("#main > section:first-child").addClass('active');
        $('.menu > li:first-child a').addClass('active');
        $('.blog-single-page .menu > li:first-child a').removeClass('active');
        if ($('body.blog-single-page').length > 0)
        {
         closeMenu();
        }
        else{
            openMenu();
        }
    } else if (value == lastId) {
        $("#main > section:last-child").addClass('active');
        $('.menu > li:last-child a').addClass('active');
        openMenu();
    } else {
        var sectionAnchor = '#' + value;
        $("#main > section.active, .menu > li a").removeClass("active");
        $('#main > section' + sectionAnchor).addClass('active');
        $('.menu > li a[href$=' + value + ']').addClass('active');
        closeMenu();
    }
}

/*-------------------------  Open Menu  -------------------------*/
function openMenu() {
    "use strict";

    var childrenCount = $(".left-side .menu .list-group-item").length;
    var windowWidth = ($window.width()>1440 ? 1440 : $window.width());
    
    if (windowWidth > 991) {
        $(".menu-align").animate({
            position: "absolute",
            height: "160px",
            width: "300px",
            position: "absolute",
            bottom: "0"
        }, 700);
        $(".left-side .menu").animate({
            height: "100%",
            width: "100%"
        }, 600);
        $("#main").animate({
            width: (windowWidth * 9 / 10) - 410 + 'px',
            left: (windowWidth * 5 / 100) + 315 + 'px'
        }, 700);
    } else {
        $(".menu-align").animate({
            position: "absolute",
            height: "46%",
            width: "300px",
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)"
        }, 700);
    }

    $(".left-side").animate({
        width: "300px",
        'padding-top': '40px'
    }, 700);
    $(".left-side img").animate({
        width: "180px"
    }, 700);
    $(".left-side h1").animate({
        'font-size': "32px"
    }, 700);
    $(".left-side a.download-cv").show();
    $(".left-side a.download-cv").animate({
        "opacity": "1",
        'font-size': "16px",
        padding: "10px 30px"
    }, 700);
    for (var i = 0; i < childrenCount; i++) {
        $(".left-side .menu").children().eq(i).animate({
            left: (i % 3) * 100 + "px",
            top: Math.floor(i / 3) * 75 + "px",
            width: "100px"
        }, 600);
    }


}

/*-------------------------  Close Menu  -------------------------*/
function closeMenu() {
    "use strict";

    var childrenCount = $(".left-side .menu .list-group-item").length;
    var customHeight = 100 / childrenCount;
    var windowWidth = ($window.width()>1440 ? 1440 : $window.width());
    if (windowWidth > 991) {
        $(".menu-align").animate({
            height: "82%",
            width: "100%"
        }, 600);
        $(".left-side .menu").animate({
            height: "100%",
            width: "100%"
        }, 600);
        $(".left-side").animate({
            width: "80px",
            'padding-top': "16px"
        }, 600);
        $(".left-side img").animate({
            width: "60px"
        }, 600);
        $(".left-side h1").animate({
            'font-size': "12px"
        }, 600);
        $(".left-side a.download-cv").animate({
            opacity: "0",
            'font-size': "0",
            padding: "0",
            border: "0"
        }, 600);
        $(".left-side a.download-cv").attr('style', 'display:none !important');
        for (var i = 0; i < childrenCount; i++) {
            $(".left-side .menu").children().eq(i).animate({
                left: "-10px",
                top: customHeight * i + "%",
                width: "80px"
            }, 600);
        }
        $("#main").animate({
            width: (windowWidth * 9 / 10) - 190 + 'px',
            left: (windowWidth * 5 / 100) + 95 + 'px'
        }, 600);
        $("#main>section.active").animate({
            width: (windowWidth * 9 / 10) - 190 + 'px'
        }, 600);
    } else {
        openMenu();
    }
}

/*-------------------------  Sidebar Menu  -------------------------*/
function sidebarMenu() {

    "use strict";
    var $menuLink = $(".menu > li a");
    var $main = $('#main');
    var $first = '#' + $("#main > section:first-child").attr('id');
    var $last = '#' + $("#main > section:last-child").attr('id');
    $menuLink.on("click", function() {
        var func = animateRandom();
        var $id = $(this).attr('href');
        var $thisId = '#' + $("#main > section.active").attr('id'); 
        var not_allowed = [$first, $last];

        if (not_allowed.indexOf($id) > -1 || not_allowed.indexOf($thisId) > -1) {

            if (not_allowed.indexOf($thisId) >= 0 && not_allowed.indexOf($id) >= 0) {
                $(".menu > li a").removeClass("active");
                $(this).addClass('active');
                $("#main > section.active").addClass(func[1]).removeClass("active");
                $main.children($id).addClass('active ' + func[0]);
            } 
            else if($window.width()<992){
                $(".menu > li a").removeClass("active");
                $(this).addClass('active');
                $("#main > section.active").addClass(func[1]).removeClass("active");
                $main.children($id).addClass('active ' + func[0]);
            }
            else {
                $(".menu > li a").removeClass('active');
                $("#main > section.active").removeClass('active');
                $(this).addClass('active');
                $main.children($id).addClass('active');
                if (not_allowed.indexOf($thisId) >= 0 && $window.width() > 992) {
                    closeMenu();
                }
                if (not_allowed.indexOf($id) >= 0) {
                    openMenu();
                }
            }
            owlCrousel();

        } else {
            $(".menu > li a").removeClass("active");
            $(this).addClass('active');
            $("#main > section.active").addClass(func[1]).removeClass("active");
            $main.children($id).addClass('active ' + func[0]);
            owlCrousel();

        }
        if ($id == '#portfolio') {
            setTimeout(function() {
                portfolioIsotop();
            }, 1000);
        }
        $lastHash = 1;

    });

    // To Contact Button
    $(".to-contact").on('click', function() {
        console.log("asdadada");
        var func = animateRandom();

        $(".menu > li a").removeClass("active");
        $('.menu > li:last-child a').addClass('active');
        if($window.width()<992){
            console.log("first");
            $("#main > section.active").addClass(func[1]).removeClass("active");
            $('#main > section:last-child').addClass('active ' + func[0]);
        }
        else{
            console.log("last");

            $("#main > section.active").removeClass("active");
            $('#main > section:last-child').addClass('active ');
                    openMenu();


        }
        
        $lastHash = 1;


    })

    // Next Page Button
    $(".next-page").on("click", function() {
        $lastHash = 1;
        var func = animateRandom();
        if ($(".menu > li a.active").attr('href') !== $last) {
            $(".menu > li a.active").each(function() {
                $(this).parents('li').next('li').children('a').each(function() {
                    if ($(this).attr('href') !== $first && $(this).attr('href') !== $last && $window.width() > 991) {
                        closeMenu(); //decrease Menu width
                    } else {
                        openMenu(); //increase Menu width
                        $('#main > section:last-child').css({width: '100%'});
                    }
                    if($window.width()<992){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
                    else if ($(".menu > li a.active").attr('href') == $first || $(this).attr('href') == $last){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").removeClass("active");
                        $main.children($id).addClass('active');
                    }
                    else{
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
  
                })
                $(this).removeClass('active');
            });
            owlCrousel();
        } else {
            $("#main > section.active").addClass(func[1]).removeClass("active");
            $(".menu > li a.active").removeClass("active");
            $(".menu > li:first-child a").addClass('active');
            $("main > section:first-child").addClass('active ' + func[0]);
            changeWindowLocation($first);
        }

    });
    // Prev Page Button
    $(".prev-page").on("click", function() {
        $lastHash = 1;
        var func = animateRandom();
        if ($(".menu > li a.active").attr('href') !== $first) {
            $(".menu > li a.active").each(function() {
                $(this).parents('li').prev('li').children('a').each(function() {
                    if ($(this).attr('href') !== $first && $(this).attr('href') !== $last && $window.width() > 992) {
                        closeMenu(); //decrease Menu width
                    } else {
                        openMenu(); //increase Menu width
                        $('#main > section:first-child').css({width: '100%'});
                    }
                    if($window.width()<992){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
                    else if ($(".menu > li a.active").attr('href') == $last || $(this).attr('href') == $first){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("main > section.active").removeClass("active");
                        $main.children($id).addClass('active ');    
                    }
                    else{
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
                })
                $(this).removeClass('active');
            });
            owlCrousel();

        } else {
            $(".menu > li a.active").removeClass("active");
            $("main > section.active").addClass(func[1]).removeClass("active");
            $("main > section:last-child").addClass('active ' + func[0]);
            $(".menu > li:last-child a").addClass('active');
            changeWindowLocation($last);

        }

    });
}

/*-------------------------  Animate Random  -------------------------*/
function animateRandom() {
    const animate = [
        ["animate__backInDown", "animate__backOutDown"],
        ["animate__zoomIn", "animate__zoomOut"],
        ["animate__fadeInDown", "animate__fadeOutDown"],
    ];

    $.each(animate, function(i, v) {
        $("#main > section").removeClass(v[0]);
        $("#main > section").removeClass(v[1]);
    });

    const random = Math.floor(Math.random() * animate.length);
    return animate[random];
}

/*-------------------------  Change Window Location  -------------------------*/
function changeWindowLocation($id) {

    "use strict";
    window.location = $id;
}

/*-------------------------  Testimonial Owlcarousel  -------------------------*/
function owlCrousel() {
    "use strict";
    var counter = 1;
    $(".portfolio-page-carousel.owl-carousel").owlCarousel({
        items: 1,
        padding: 0,
        nav: false,
        autoplay: false,
        loop: true,
        dots: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
    });
    if ($("#main > section.active").attr('id') == 'about') {

        $(".owl-carousel").owlCarousel({
            items: 1,
            padding: 0,
            nav: false,
            autoplay: false,
            loop: true,
            dots: true,
            mouseDrag: true,
            touchDrag: true,
            smartSpeed: 1000,
            autoplayHoverPause: true,
            margin: 20
        });
    }
}

/*-------------------------  ISOTOPE JS  -------------------------*/
function portfolioIsotop() {

    "use strict";

    // init Isotope
    var $pfilter = $('#portfolio-filter');
    var $grid = $('.portfolio-items');
    $grid.isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry',
    });
    $pfilter.find('a').on("click", function() {
        var filterValue = $(this).attr('data-filter');
        $pfilter.find('a').removeClass('active');
        $(this).addClass('active');
        $grid.isotope({
            filter: filterValue,
        });
        return false;
    });
}

/*-------------------------  MAGNIFIC POPUP JS  -------------------------*/
function portfolioPopup() {

    "use strict";

    if (('.portfolio-items').length > 0) {
        $('.portfolio-items').each(function() {
            $(this).magnificPopup({
                delegate: 'a.portfolio-magnific',
                type: 'image',
                removalDelay: 300,
                mainClass: "mfp-fade",
                image: {
                    titleSrc: "title",
                    gallery: {
                        enabled: true
                    }
                },
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '<div class="mfp-title mfp-bottom-iframe-title"></div>' + "</div>",
                    patterns: {
                        youtube: {
                            index: "youtube.com/",
                            id: null,
                            src: "%id%?autoplay=1"
                        },
                        vimeo: {
                            index: "vimeo.com/",
                            id: "/",
                            src: "https://player.vimeo.com/video/%id%?autoplay=1"
                        },
                        gmaps: {
                            index: "//maps.google.",
                            src: "%id%&output=embed"
                        },
                    },
                    srcAction: "iframe_src",
                },
            });
        });
    }
}

/*-------------------------  GOOGLE Map  -------------------------*/
function mapInit() {

    "use strict";
    var myMap = $('#my-map');

    if (myMap.length) {
        var lat = myMap.data("location-lat");
        var lng = myMap.data("location-lng");
        var options = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 7,
            mapTypeControl: true,
            gestureHandling: 'cooperative',
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT,
                position: google.maps.ControlPosition.TOP_LEFT
            },
            scaleControl: false,
            styles: [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#576ee9"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d5d5d5"
                }, {
                    "lightness": 21
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#f8f8f8"
                }, {
                    "lightness": 25
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": "#222222"
                }, {
                    "lightness": 30
                }]
            }, {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 10
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }],
        };
        var map = new google.maps.Map(document.getElementById('my-map'), options);
        var marker1 = new google.maps.Marker({
            position: map.getCenter(),
            title: $('title').text(),
            icon: myMap.data("location-icon"),
            animation: google.maps.Animation.BOUNCE
        });
        marker1.setMap(map);
    }
}

/*-------------------------  Mouse Magic Cursor  -------------------------*/

function mouseMagicCursor(){
	
    "use strict";
	
    var mouseCursor = $(".m-magic-cursor");
    if (mouseCursor.length && $window.width()>991) {
        if ($("body")) {
            const e = document.querySelector(".mmc-inner"),
                t = document.querySelector(".mmc-outer");
            let n,
                i = 0,
                o = !1;
            (window.onmousemove = function (s) {
                if($window.width()>1440){
                    o || (t.style.transform = "translate(" + (s.clientX * 1440/ $window.width()) + "px, " + (s.clientY * 1440/ $window.width()) + "px)"), (e.style.transform = "translate(" + (s.clientX * 1440/ $window.width()) + "px, " + (s.clientY * 1440/ $window.width()) + "px)"), (n = (s.clientY * 1440/ $window.width())), (i = (s.clientX * 1440/ $window.width()));
                }else{
                    o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), (e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), (n = s.clientY), (i = s.clientX);
                }
            }),
            $("body").on("mouseenter", "a, .cursor-pointer, button", function () {
                e.classList.add("mmc-hover"), t.classList.add("mmc-hover");
            }),
            $("body").on("mouseleave", "a, .cursor-pointer, button", function () {
                ($(this).is("a") && $(this).closest(".cursor-pointer").length) || (e.classList.remove("mmc-hover"), t.classList.remove("mmc-hover"));
            }),
            (e.style.visibility = "visible"),
            (t.style.visibility = "visible");
        }
    }
};

/*-------------------------  Color Panllet  -------------------------*/
function ColorPallet() {

    "use strict";

    $("#color-switcher .pallet-button").click(function () {
        $("#color-switcher .color-pallet").toggleClass('show')
    })
}


               
$(".01Bg").click(function(){
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", "assets/colors/01.css");
    document.getElementsByTagName("head")[0].appendChild(element);
});
$(".BlackBg").click(function(){
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", "assets/colors/black.css");
    document.getElementsByTagName("head")[0].appendChild(element);
});
$(".WhiteBg").click(function(){
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", "assets/css/style.css");
    document.getElementsByTagName("head")[0].appendChild(element);
});
$(".03Bg").click(function(){
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", "assets/colors/03.css");
    document.getElementsByTagName("head")[0].appendChild(element);
});

$(".GG01Bg").click(function(){
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", "assets/colors/gg01.css");
    document.getElementsByTagName("head")[0].appendChild(element);
});

$(".GG02Bg").click(function(){
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", "assets/colors/gg02.css");
    document.getElementsByTagName("head")[0].appendChild(element);
});


