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
            css = 'body {color: #FFFFFF; background-color: #000000; font-size: 150%} .text,.password,.submit {color: #FFFFFF; background-color: #000000; font-size: 100%; margin-top: 10px; margin-bottom: 10px} a {color: #FFFFFF; text-decoration: none; padding: 3px; font-size: 100%} .lsfy-selected,#lsfy-selected {color: #000000; background-color: #FFFFFF; text-decoration: none}';

        $('<style type="text/css">'+css+'</style>').appendTo('head');

        this.a = $('a,.text,.password,.submit');
        this.i = 0;

        this.postmove();

        $(document).keydown(function(e){
            var sel;

            switch(e.keyCode) {
                case 13: //enter
                    if(that.curr().is('a')) {
                        that.redir(that.curr().attr('href'));
                    } else if(that.curr().is('.submit')) {
                        that.curr().click();
                    } else {
                        $('form').submit();
                    }
                  return false;

                case 38: //up
                    that.prev();
                  return false;

                case 40: //down
                    that.next();
                  return false;

                default: //other keys
                  break;
            };
        });
    };

    Linksify.fn = Linksify.prototype;

    Linksify.fn.curr = function() {
        return this.$(this.a[this.i]);
    };

    Linksify.fn.premove = function() {
        if(this.curr().is('a')) {
            this.curr().attr('id', '');
        } else if(this.curr().is('.submit')) {
            this.curr().removeClass('lsfy-selected');
        } else {
            this.curr().blur();
        }
    };

    Linksify.fn.postmove = function() {
        if(this.curr().is('a')) {
            this.curr().attr('id', 'lsfy-selected');
        } else if(this.curr().is('.submit')) {
            this.curr().addClass('lsfy-selected');
        } else {
            this.curr().focus();
        }
    };

    Linksify.fn.prev = function() {
        this.premove();
        this.i = (this.i === 0) ? (this.a.length  - 1) : (this.i - 1);
        this.postmove();
    };

    Linksify.fn.next = function() {
        this.premove();
        this.i = (this.i + 1) % this.a.length;
        this.postmove();
    };

    Linksify.fn.redir = function(l) {
        window.location = l;
    };

    return Linksify;
}));