IBM Design Language Color Palette
===================================

To use the IBM Design Language Color Palette in your Sass project, copy `_ibm-colors.scss` into your project and import it: 

```css
@import 'ibm-colors.scss';
```

If you need an example of how to import the Sass mixin, look at the provided `example-usage.scss` file.

With the color palette imported you will now have access to two functions:


## `color($palette, [$tone])`

```scss
//////////////////////////////////////////////////
//  ------------------------------------------  //
// | Options       | Type          | Required | //
// |---------------|---------------|----------| //
// | Color Palette | String        | Yes      | //
// | Color Tone    | String/Number | Optional | //
//  ------------------------------------------  //
//////////////////////////////////////////////////

background: color('blue', 80);     // #1D3649
background: color('blue', 8);      // #1D3649
background: color('blue', 'core'); // #4178BE
background: color('blue');         // #4178BE
```


## `get-colors([$color])`

```scss
///////////////////////////////////////////
//  -----------------------------------  //
// | Options       | Type   | Required | //
// |---------------|--------|----------| //
// | Color Palette | String | Optional | //
//  -----------------------------------  //
///////////////////////////////////////////

$color-keys: get-colors();
$all-blues: get-colors('blue');
$full-color-map: get-colors('all');

// Generating a class for each color palette
@each $color in $color-keys {
.color--#{$color} {
content: #{$color} is available;
}
}

// Generate a class for each color of a color palette
@each $tone, $color in $all-blues {
.blue--tone-#{$tone} {
background: $color;
}
}

// Generate a class for each color of each color palette
@each $palette-name, $palette in $full-color-map {
@each $tone, $color in $palette {
.#{$palette-name}--tone-#{$tone} {
background: $color;
}
}
}
```

### Minimum Requirement:

Sass compiler compatible with Sass 3.3 or greater
