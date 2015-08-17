'use strict';

window.styleData = [{
        title: 'Colors',
        styles: [{
            contentSrc: 'colors.html',
            isChromeless: true // Displays styles without titles or wrapping
        }]
    },{
        title: 'Headings',
        styles: [{
            title: 'Typographic Scale',
            description: 'Font sizes thoughout the site should leverage the following typographic scale. Don\'t pick random font sizes.',
            contentSrc: 'type-scale.html'
        },{
            title: 'Headings',
            description: 'Headings are always in <b>Lato</b> and will always be uppercase.',
            contentSrc: 'headings.html'
        }]
    },{
        title: 'Text',
        styles: [{
            title: 'Paragraphs',
            contentSrc: 'paragraphs.html'
        },{
            title: 'Unordered Lists',
            contentSrc: 'uls.html'
        },{
            title: 'Ordered Lists',
            contentSrc: 'ols.html'
        }]
    }
];
