'use strict';

/**
 * Controls the color swatches
 */
window.colorSwatchController = (function(
        $) {

    return {
        initialize: function() {
            this.$colorSwatches = $('.color-list div');
            this.addHexCodesToAllSwatches();
            return this;
        },

        addHexCodesToAllSwatches: function() {
            var self = this;
            this.$colorSwatches.each(function() {
                self.addHexCodeToSwatch($(this));
            });
            return this;
        },

        addHexCodeToSwatch: function($swatch) {
            var hexCode = this.getBackgroundAsHex($swatch[0]);
            $swatch.append('<span class="style-swatch-detail">' + hexCode + '</span>');
        },

        getBackgroundAsHex: function(elem) {
            var bg;
            function hex(x) {
                return ('0' + parseInt(x).toString(16)).slice(-2);
            }
            if (elem.currentStyle) {
                bg = elem.currentStyle.backgroundColor;
            } else if (window.getComputedStyle) {
                bg = document.defaultView.getComputedStyle(elem,
                    null).getPropertyValue('background-color');
            }
            if (bg.search('rgb') === -1) {
                return bg;
            } else {
                bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                return '#' + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
            }
        }
    };
})(
    $
);