// ScrollJack.js
// Forked from: github.com/ByNathan/jQuery.scrollSpeed
(function($) {

    jQuery.scrollSpeed = function(step, speed) {

        var $document = $(document);
        var $window = $(window);
        var $body = $('html, body');
        var viewport = $window.height();
        var top = 0;
        var scroll = false;

        if (window.navigator.msPointerEnabled) {
            return false;
        }

        $window.on('mousewheel DOMMouseScroll', function(e) {

            scroll = true;
            
            if (e.originalEvent.wheelDeltaY < 0 || e.originalEvent.detail > 0) {
                top = (top + viewport) >= $document.height() ? top : top += step;
            }

            if (e.originalEvent.wheelDeltaY > 0 || e.originalEvent.detail < 0) {
                top = top <= 0 ? 0 : top -= step;
            }

            $body.stop().animate({
                scrollTop: top
            }, speed, 'default', function() {
                scroll = false;
            });

            return false;

        }).on('scroll', function() {
            if (!scroll) {
                top = $window.scrollTop();
            }
        }).on('resize', function() { 
            viewport = $window.height();
        });

    };

    jQuery.easing.default = function (x,t,b,c,d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    };
    
})(jQuery);