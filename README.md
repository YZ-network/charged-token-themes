# charged-token-themes

This repository holds all themes used by the Charged Token dApp. Its aim is to allow collaborative working with projects who wish to have their own custom application rendering.

## Overview

Each theme is composed of :

- a JSON configuration
- custom scss file(s), with an entrypoint named `app.scss`
- several optional images for further customization (see below)

It is identified by its name, let's say "project-id". Whenever the dApp is accessed using a known hostname in the `THEMES` configuration list, the corresponding theme is loaded.

## Adding a new theme

### Theme configuration

First of all, you must add a new JSON configuration in the `THEMES` array located in the `demo/themes-config.js` script.

Here is the minimal JSON Theme configuration needed :

```
{
  name: "project-id",
  hostname: "custom.hostname.domain.ext",
  uri: "https://www.domain.ext",
  title: "Project Page Title",
}
```

There are several other optional properties to help choose the level of customization :

| Property   | Status   | Description                                                                                   |
| ---------- | -------- | --------------------------------------------------------------------------------------------- |
| name       | required | unique identifier, all lowercase without spaces or special chars except dashes or underscores |
| hostname   | required | unique hostname that will trigger this theme                                                  |
| uri        | required | URI to link to when clicking on the navbar brand logo                                         |
| title      | required | dApp page title to use                                                                        |
| project    | optional | project name as used for the whitelisting, required if you use custom thumbnails              |
| thumbnails | optional | set to true if the theme provides a custom thumbnail for rounds cards header                  |
| brand      | optional | set to true if the theme provides a custom brand logo                                         |
| favicon    | optional | set to true if the theme provides a custom favicon                                            |

### Default theme overrides

Once the theme configuration has been added, create the corresponding directory to hold the scss stylesheets named `scss/project-id` and create the entrypoint `app.scss` in it.

The dApp uses [Bootstrap 5.2.3](https://getbootstrap.com/docs/5.2/getting-started/introduction/).

Every custom `app.scss` must contain at least the following :

```
@import "../overrides"; // common overrides of variables used by bootstrap, do not remove

// here you can add your own variable overrides before loading bootstrap default theme

@import "bootstrap/scss/bootstrap"; // imports bootstrap styles, do not remove
@import "../common"; // defines common css classes for layout needs, do not remove

// here you can override css classes
```

Of course, you can divide your `scss` into several files using `@import` but you must keep the required entrypoint `app.scss`.

### Building a theme

Each theme has its own needs and several use cases are detailed below. For a simple example, you can add an npm script, named `theme:project-id` to build it with the following command :

```
  sass --load-path=node_modules/ scss/project-id/app.scss dist/project-id.css
```

As you can see, the dApp is expecting the result as a single css file named after the project-id.

Once done, you will be able to build your theme using the command `npm run theme:project-id`.

### Testing

To see how your new theme renders, you can use the `demo/index.html` page. It picks the theme configuration to create a theme selection list in the right hand of the navbar.

This demo page lists all of the bootstrap components used in the dApp so you can get a quick idea of the final rendering.

### Auto build during development

While customizing the theme, you can use a watch command to build it automatically everytime the scss changes. In order to do that, you must update the watch npm script to add your new theme :

```
  sass --load-path=node_modules/ --watch scss/yz/app.scss:dist/yz.css --watch scss/cdk/app.scss:dist/cdk.css --watch scss/default/app.scss:dist/default.css --watch scss/project-id/app.scss:dist/project-id.scss
```

The added part is `--watch scss/project-id/app.scss:dist/project-id.scss` which adds a watchdog looking for changes in your custom `app.scss` file in order to build it in the dist folder.

## HOWTO customize more

### Favicon

To use a custom favicon, put your icon in the assets/favicon folder named after your project key : `project-id.ico`.

The icon must either be a standard `.ico` file or a PNG file with the `.ico` extension and its size should be 32 x 32 pixels.

After that, you just have to set the `favicon` property of your theme configuration to true.

### Brand image

The brand image lives in the application navbar. Hence, its height is limited to 32px.
The width is not fixed but you should limit it to 150px wide maximum.

The image must be in PNG format and put in the `assets/brand` folder, named `project-id.png`.

Then you just have to set the `brand` property of your theme configuration to true.

### Charged Tokens Thumbnails

The thumbnail images are displayed on top of each Charged Token card on the main page of the application (Charged Tokens listing).

The image must be in JPEG format and put in the `assets/thumbnails` folder, named `project.jpg`.

**Be careful on the naming as this one uses the project name as used during whitelisting instead of the project id and it is case sensitive.**

The image height is limited to 150px but the width can vary a lot since the application is responsive. So the image width should be 1080 pixels, of which only 350 ~ 420 pixels will be displayed most of the time, the rest being used as a filler.

### Fonts

If you wish to use custom typography, add a `fonts` folder under your theme's scss folder and put your font files in it.

Then, you have to copy the fonts to the `dist/fonts` folder during the build by modifying the npm script. Here's an example for project CDK :

```
  sass --load-path=node_modules/ scss/cdk/app.scss dist/cdk.css && cross-env cp -r scss/cdk/fonts/* dist/fonts/
```
