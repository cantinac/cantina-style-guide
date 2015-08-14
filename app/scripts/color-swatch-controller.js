/**
 * Controls the color swatches
 */
var colorSwatchController = {
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
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
};
