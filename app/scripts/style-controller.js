'use strict';

/**
 * Controls the individual styles
 */
window.styleController = (function(
        $,
        _) {

    return {
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
            var sortedLines = _.sortBy(htmlLines, function(line) {
                return line.search(/\S/);
            });
            var spaces = sortedLines.length ? sortedLines[0].search(/\S/) : '';
            var newHtmlLines = _.map(htmlLines, function(line) {
                return line.slice(spaces);
            });
            return newHtmlLines.join('\n');
        },

        getEmptyCodePreviewHtml: function() {
            return '<div class="style-code"><pre><code class="language-markup"></code></pre></div>';
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
    };
})(
    $,
    window._
);
