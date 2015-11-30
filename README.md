# Cantina Style Guide

## Setup

**bower.json**

```json
{
    "name": "cantina.co",
    "dependencies": {
        "styleguide": "git@github.com:cantinac/cantina-style-guide.git"
    },
    "private": true
}
```

```bash
$ bower install
```

## Example

```css
@import "../bower_components/styleguide/styles/colors";
@import "../bower_components/styleguide/styles/variables";
@import "../bower_components/styleguide/styles/extends";

@import "../bower_components/styleguide/fonts/BigNoodleTitling/BigNoodleTitling.css";
@import "../bower_components/styleguide/fonts/Lato/Lato.css";
```
