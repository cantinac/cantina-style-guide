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
}



$(function () {
    var scrollController = new ScrollMagic.Controller();

    sectionTitleController.initialize(scrollController);
});
