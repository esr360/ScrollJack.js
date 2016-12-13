// ScrollJack.js
// Forked from https://github.com/nathco/jQuery.scrollSpeed
(function($) {

    jQuery.scrollJack = function(step, speed, easing) {
        
        var $document = $(document);
        var $window = $(window);
        var $body = $('html, body');
        var option = easing || 'default';
        var root = 0;
        var scroll = false;
        var scrollY;
        var scrollX;
        var view;
        var down;
        var up;
            
        $window.on('mousewheel DOMMouseScroll', function(e) {
        
            if (root==0) root = $(window).scrollTop(); 
            
            var evt = window.event || e;

            evt = evt.originalEvent ? evt.originalEvent : evt;            
  
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta;

            if(delta > 0) {
                up = true;
                down = false;
            }
            else{
                down = true;
                up = false;
            }
            
            scrollY = $document.height() > $window.height();
            scrollX = $document.width() > $window.width();
            scroll = true;
            
            if (scrollY) {
                view = $window.height();
                if (down) {
                    root = (root + view) >= $document.height() ? root : root += step;
                }
                if (up) {
                    root = root <= 0 ? 0 : root -= step;
                }
                $body.stop().animate({
                    scrollTop: root
                }, speed, option, function() {
                    scroll = false;
                });
            }
            
            if (scrollX) {
                view = $window.width();  
                if (down) {
                    root = (root + view) >= $document.width() ? root : root += step;
                }
                if (up) {
                    root = root <= 0 ? 0 : root -= step;
                }
                $body.stop().animate({
                    scrollLeft: root
                }, speed, option, function() {
                    scroll = false;
                });
            }
            
            return false;
            
        }).on('scroll', function() {
            if (scrollY && !scroll) root = $window.scrollTop();
            if (scrollX && !scroll) root = $window.scrollLeft();
        }).on('resize', function() {
            if (scrollY && !scroll) view = $window.height();
            if (scrollX && !scroll) view = $window.width();
        });
    };

    jQuery.easing.default = function (x,t,b,c,d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    };

})(jQuery);