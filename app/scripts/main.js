/* jshint devel:true */

var sectionTitleController = {
    initialize: function(scrollController) {
        this.scrollController = scrollController;
        this.$sectionTitles = $('.section-title');
        this.addAllSectionTitleScenes();
        return this;
    },

    addAllSectionTitleScenes: function() {
        var self = this;
        this.$sectionTitles.each(function() {
            var $sectionTitle = $(this);
            var scene = self.getSectionTitleScene($sectionTitle);
            scene.addTo(self.scrollController);
        });
        return this;
    },

    getSectionTitleScene: function($sectionTitle) {
        return new ScrollMagic.Scene({
                triggerElement: $sectionTitle[0],
                triggerHook: 'onLeave',
                duration: this.getSectionHeight($sectionTitle)
            })
            .setPin($sectionTitle[0], {pushFollowers: false});
    },

    getSectionHeight: function($sectionTitle) {
        var $section = $sectionTitle.next('section');
        return $section.length ? $section.outerHeight() : 0;
    },

    disableSectionTitleScenes: function() {
        for(var sectionTitleScene in sectionTitleScenes) {
            sectionTitleScene.destroy();
        }
    }
};

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
        $codePreview.slideToggle();
        return this;
    }
}



$(function () {
    var scrollController = new ScrollMagic.Controller();

    sectionTitleController.initialize(scrollController);
    styleController.initialize();
});
