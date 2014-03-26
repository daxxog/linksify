/* Linksify
 * Emulate the webpage look and feel of Links in text mode.
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.Linksify = factory();
    }

    if(typeof root.jQuery == 'function') { //global jQuery detection
        root.jQuery(function($) {
            $.lsfy = new root.Linksify($);
        });
    }
}(this, function() {
    var Linksify = function($) {
        this.$ = $;

        var that = this,
            css = 'a {color: #FFFFFF; text-decoration: none; padding: 3px; font-size: 150%} #lsfy-selected {color: #000000; background-color: #FFFFFF; text-decoration: none}';

        $('<style type="text/css">'+css+'</style>').appendTo('head');
        $('body').css('background-color', '#000000');

        this.a = $('a');
        this.i = 0;

        this.curr().attr('id', 'lsfy-selected');

        $(document).keydown(function(e){
            var sel;

            if(e.keyCode === 13) { //enter
                window.location = that.curr().attr('href');
            }

            if(e.keyCode === 38) { //down
                that.curr().attr('id', '');
                that.prev();
                that.curr().attr('id', 'lsfy-selected');

                return false;
            }

            if(e.keyCode === 40) { //down
                that.curr().attr('id', '');
                that.next();
                that.curr().attr('id', 'lsfy-selected');

                return false;
            }
        });
    };

    Linksify.fn = Linksify.prototype;

    Linksify.fn.curr = function() {
        return this.$(this.a[this.i]);
    };

    Linksify.fn.next = function() {
        this.i = (this.i + 1) % this.a.length;
    };

    Linksify.fn.prev = function() {
        this.i = (this.i === 0) ? (this.a.length  - 1) : (this.i - 1);
    };

    return Linksify;
}));