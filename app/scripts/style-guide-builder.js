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