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
            this.$importedElements = this.getImportedElements();
            this.addAllSections();
            return this;
        },

        getImportedElements: function() {
            var $importedElements = $('#imported-elements'),
                $cloned = $importedElements.clone();
            $importedElements.remove();
            return $cloned;
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
            style.content = this.getHtmlForStyle(style);
            this.renderStyle(style, $section);
            return this;
        },

        renderStyle: function(style, $section) {
            $section.append(
                styleTemplate(style)
            );
            return this;
        },

        getHtmlForStyle: function(style) {
            var $importedElement = this.$importedElements.find('[data-element-file="' + style.contentSrc + '"]')
            return $importedElement.length ? $importedElement.html() : '';
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