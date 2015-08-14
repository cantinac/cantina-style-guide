/**
 * Controls the individual styles
 */
var styleController = {
    initialize: function() {
        this.$styles = $('.style');
        this.updateAllStyles()
            .initListeners();
        return this;
    },

    initListeners: function() {
        var self = this;
        $('.style-code-toggle').on('click', function(event) {
            event.preventDefault();
            var $style = $(event.currentTarget).parents('.style');
            self.toggleCodeForStyle($style);
        });
        return this;
    },

    updateAllStyles: function() {
        var self = this;
        this.$styles.each(function() {
            var $style = $(this);
            self.addCodePreviewToStyle($style)
                .addCodeToggleToStyle($style);
        });
        return this;
    },

    addCodePreviewToStyle: function($style) {
        var $codePreview = this.getCodePreviewForStyle($style);
        $style.find('.style-description').after($codePreview);
        return this;
    },

    getCodePreviewForStyle: function($style) {
        var htmlSrc = this.getHTMLforStyle($style);
        var $codePreview = $(this.getEmptyCodePreviewHtml());
        var $code = $codePreview.find('code');
        $code.text(htmlSrc);
        return $codePreview;
    },

    getHTMLforStyle: function($style) {
        var html = $style.find('.style-preview')[0].innerHTML;
        var htmlLines = _.filter(html.split('\n'), function(line) {
            return line && $.trim(line);
        });
        var spaces = _.sortBy(htmlLines, function(line) {
            return line.search(/\S/);
        })[0].search(/\S/);
        var newHtmlLines = _.map(htmlLines, function(line) {
            return line.slice(spaces);
        });
        return newHtmlLines.join('\n');
    },

    getEmptyCodePreviewHtml: function() {
        return '<div class="style-code"><pre><code class="language-markup" id="test"></code></pre></div>';
    },

    addCodeToggleToStyle: function($style) {
        var $codeToggle = $(this.getCodeToggleHtml());
        $style.find('.style-description').prepend($codeToggle);
        return this;
    },

    getCodeToggleHtml: function() {
        return '<a href="#" class="style-code-toggle">&lt; /&gt;</a>';
    },

    toggleCodeForStyle: function($style) {
        var $codePreview = $style.find('.style-code');
        var $codePreviewToggle = $style.find('.style-code-toggle');
        $codePreview.slideToggle();
        $codePreviewToggle.toggleClass('active');
        return this;
    }
}

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

/**
 * Style guide builder
 */
var styleGuideBuilder = (function(
        $,
        styleController,
        colorSwatchController,
        styleTemplate,
        sectionTemplate) {

    var $mainContent = $('main');

    return {
        initialize: function(styleData) {
            this.sections = styleData;
            this.addAllSections();
            return this;
        },

        addAllSections: function() {
            $mainContent.empty();
            _.each(this.sections, this.addSection, this);
            return this;
        },

        addSection: function(section) {
            section.$section = $(this.getRenderedSection(section));
            this.addAllStylesForSection(section);
            this.renderSection(section.$section);
            return this;
        },

        getRenderedSection: function(section) {
            return sectionTemplate(section)
        },

        renderSection: function($section) {
            $mainContent.append(
                $section
            );
            return this;
        },

        addAllStylesForSection: function(section) {
            _.each(section.styles, function(style) {
                this.addStyle(style, section.$section);
            }, this);
            return this;
        },

        addStyle: function(style, $section) {
            this.renderStyle(style, $section);
            return this;
        },

        renderStyle: function(style, $section) {
            $section.append(
                styleTemplate(style)
            );
            return this;
        }
    }
})(
    $,
    styleController,
    colorSwatchController,
    CantinaStyleGuide.templates.style,
    CantinaStyleGuide.templates.section
);

var styleData = [{
        title: 'Colors',
        styles: []
    },{
        title: 'Headings',
        styles: [{
            title: 'Typographic Scale',
            description: 'Description',
            content: '<strong>hello world</strong>'
        },{
            title: 'Headings',
            description: 'Description',
            content: '<strong>hello world</strong>'
        }]
    },{
        title: 'Text',
        styles: [{
            title: 'Paragraphs',
            description: 'Description',
            content: '<strong>hello world</strong>'
        },{
            title: 'Unordered Lists',
            description: 'Description',
            content: '<strong>hello world</strong>'
        },{
            title: 'Ordered Lists',
            description: 'Description',
            content: '<strong>hello world</strong>'
        }]
    }
];

/**
 * Build on document ready
 */
$(document).ready(function() {
    styleGuideBuilder.initialize(styleData);

    var scrollController = new ScrollMagic.Controller(); //TODO: move me
    styleController.initialize();
    colorSwatchController.initialize();
    sectionTitleController.initialize(scrollController);
});