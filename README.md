# charged-token-themes

Each theme is composed of :

- a JSON configuration
- custom scss file(s), entrypoint being app.scss
- several optional images for further customization (see below)

It is identified by its name, let's say "project-id".

First, you can add the JSON configuration in the THEMES array located in the demo/themes-config.js script.

JSON Theme configuration format :

```
{
  name: "project-id", // Theme id
  hostname: "custom.hostname.domain.ext", // Hostname that should display this theme
  uri: "https://www.domain.ext", // URL to link the navbar brand to
  title: "Project Page Title", // Page title to display
  brand: true, // optional, set to true to use custom brand logo
  favicon: true, // optional, set to true to use custom favicon
}
```

Put your custom scss in the scss/project-id folder, then add an npm script to build it. You can build it automatically while developing by using the watch npm script.

The dApp uses [Bootstrap 5.2.3](https://getbootstrap.com/docs/5.2/getting-started/introduction/).

Every custom app.scss must contain at least the following :

```
@import "../overrides"; // common overrides of bootstrap properties

// here you can add your own properties overrides

@import "bootstrap/scss/bootstrap"; // imports bootstrap styles
@import "../common"; // defines common css classes for layout needs

// here you can override css classes
```

Favicon :
format : .ico (or png with .ico extension)
size : 32x32 px

Optional, put your favicon named with project-id.ico in the assets/favicon folder, and set theme favicon property to true.

Brand images :
format : .png
size : height = 32px, max-width = 150px

Optional, put your brand logo named with project-id.png in the assets/brand folder, and set theme brand property to true.

Thumbnail images :
format : .jpg
size : height = 150px, width = 1080px (useful range = 350~420px wide in the center)

Optional, put your project banner named after the project name (case sensitive) in the assets/thumbnails folder.

Custom fonts :
You can add custom fonts inside a fonts folder of your theme. Beware to modify your npm build script so that it copies the fonts to the dist directory and to override existing font settings in your scss. See CDK theme for reference.
