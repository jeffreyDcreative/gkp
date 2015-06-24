var windowOrg = $(window).width();
var windowSize = $(window).width();
var mobileBreakPoint = 770;


// delay func
var delay = (function() {
    var timer = 0;
    return function(callback, ms){
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    }
})();

// Thumbnail Click
var onThumbClick = function() {
    $('a.scroll img').click(function() {
        if ( windowSize > mobileBreakPoint ) {
            var f = $(this);
            $('a.scroll img').each(function() {
                var e = $(this);
                if (e.hasClass("active")){
                    e.removeClass("active");
                    e.animate({"opacity":0.5},200);
                    e.attr('src', e.attr('data-thumb-src'));
                }    
            });
            f.addClass("active");
            f.attr('src', f.attr('data-large-src'));
        }
    });
}

// Thumbnail Hover
var onThumbHover = function () {
    $("a.scroll img").hover(
        function(){
            if (!$(this).hasClass("active") && windowSize > mobileBreakPoint ) {
                var e = $(this);
                e.css('opacity',0.5);
                e.animate({"opacity":1},200);
                e.attr('src', e.attr('data-large-src'));
            }
        },
        function() {
            if (!$(this).hasClass("active") && windowSize > mobileBreakPoint ) {
                var e = $(this);
                e.css('opacity',1);
                e.animate({"opacity":0.5},200);
                e.attr('src', e.attr('data-thumb-src'));
            }
        }
    );
}

// Flex Nav Click
var onFlexClick = function() {
    $(document).on('click', ".flex-direction-nav", function() {
        $('a.scroll').each(function() {
            var e = $(this);
            var f = e.find("img");
            if (!e.hasClass("flex-active") && f.hasClass("active")) {
                f.removeClass("active");
                f.animate({"opacity":0.5},200);
                f.attr('src', f.attr('data-thumb-src'));
            }
            if (e.hasClass("flex-active") && !f.hasClass("active")) {
                f.addClass("active");
                f.animate({"opacity":1},200);
                f.attr('src', f.attr('data-large-src'));
            }
        });
    });
}

// Drop Opacity and Switch Images to Thumbnails
var backToThumbs = function () {
    $('a.scroll').each(function() {
        var e = $(this);
        var f = e.find("img");
        if (!e.hasClass("flex-active")) {
            f.removeClass("active");
            f.animate({"opacity":0.5},200);
            f.attr('src', f.attr('data-thumb-src'));
        }
        if (e.hasClass("flex-active") && !f.hasClass("active")) {
            f.addClass("active");
            f.animate({"opacity":1},200);
            f.attr('src', f.attr('data-large-src'));
        }
    });
}


// Switch out Thumbnails with Large Images and Up Opacity to 1
var upOpacity = function () {
    $('a.scroll img').each(function() {
        var e = $(this);
        e.animate({'opacity': 1}, 300);
        e.attr('src', e.attr('data-large-src'));
    });
}

// scrollFun
jQuery.fn.niceScroll = function() {
    $(this).click(function(e) {
            if ( windowSize > mobileBreakPoint ) {
                var h = $(this).attr('href'),
                target;

            if (h.charAt(0) == '#' && h.length > 1 && (target = $(h)).length > 0){
                var pos = Math.max(target.offset().top, 0);
                e.preventDefault();
                $('body,html').animate({
                    scrollTop : pos
                }, 750, 'swing');
            }
        }
    });
};
$('.scroll').niceScroll();

// Thumbnails Logic
if ( windowSize > mobileBreakPoint ) {
    onThumbClick();
    onThumbHover();
    onFlexClick();
    $(window).on('resize', function() {
        delay(function(){
            windowSize = $(window).width();
            if ( windowSize <= mobileBreakPoint) {
                upOpacity();
            }
            if ( windowSize > mobileBreakPoint && windowOrg > mobileBreakPoint ) {
                backToThumbs();
            }
        },100);
    });
}

if ( windowSize < mobileBreakPoint ) {
    upOpacity();
    $(window).on('resize', function() {
        delay(function(){
            windowSize = $(window).width();
            if ( windowSize <= mobileBreakPoint) {
                upOpacity();
            }
            if ( windowSize > mobileBreakPoint && windowOrg < mobileBreakPoint ) {
                backToThumbs();
                onThumbClick();
                onThumbHover();
                onFlexClick();
            }
        },100);
    });
}





// Hamburger Nav
$("#nav").addClass("js").before('<div id="menu" class="clearfix">&#9776; menu</div>');
	$("#menu").click(function(){
		$("#nav").slideToggle(400);
		$("#page-title").toggleClass("display-none");
	});
	$(window).resize(function(){
		if( window.innerWidth > mobileBreakPoint ) {
			$("#nav").removeAttr("style");
		}
		
});


// FlexSlider Taming For Responsive
var flexasaurus = function () {
    $(window).on('resize', function() {
        delay(function(){
            windowSize = $(window).width();
            if ( windowSize < mobileBreakPoint) {
               flexTamer();
            }
            if ( windowSize > mobileBreakPoint ) {
               $("ul.slides li").css({
                   "width": "100%", 
                   "float": "left",
                   "margin-right": "-100%",
                   "position": "relative",
                   "opacity": "0",
                   "display": "block",
                   "z-index": "1"
               });
               $(".flex-active-slide").css({"opacity": "1", "z-index": "2"});
               $('.flex-control-nav').removeAttr("style");
            }
        },10);
    });
}


// Hide Flex Slider Controls on Mobile
var flexTamer = function () {
    $("ul.slides li").removeAttr("style");
    $('.flex-control-nav').css({"display":"none"});
}


var flexLoader = function () {
            $('.flexslider').flexslider({
                animation: "fade",
                slideshow: false,
                animationLoop: false
            });
            if ( windowSize < mobileBreakPoint) {
                flexTamer();
            }
            flexasaurus();
}
    
var flexLoaderPort = function () {
    $('.flexslider').flexslider({
        animation: "fade",
        manualControls: '.custom-controls li a',
        controlsContainer: '.flex-container',
        animationLoop: false, 
        slideshow: false
    });
}
