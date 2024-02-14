// THEMES CONFIGURATIONS ARRAY
const THEMES = [
  {
    name: "default",
    hostname: "localhost",
    uri: "http://localhost:3000",
    thumbnails: true,
  },
  {
    name: "yz-test",
    hostname: "test.app.yz-network.com",
    uri: "https://test.app.yz-network.com",
    dark: true,
    dir: "yz",
    project: "YZ",
    thumbnails: true,
  },
  {
    name: "yz",
    hostname: "app.yz-network.com",
    uri: "https://app.yz-network.com",
    dark: true,
    project: "YZ",
    thumbnails: true,
  },
  {
    name: "cdk",
    hostname: "claim.cdktoken.io",
    uri: "https://cdktoken.io",
    title: "CDK Token",
    project: "CDK",
    filterProject: true,
    brand: true,
    favicon: true,
    thumbnails: true,
  },
];

/***** DO NOT CHANGE ANY OF THE FOLLOWING ***/

// Constants and saved settings
const CURRENT_THEME_KEY = "YZ_CURRENT_THEME";
const DEFAULT_THEME = "default";
const DEFAULT_TITLE = "Themes demo";

// Utility functions
function getThemeList() {
  return THEMES.map((t) => t.name);
}

function getCurrentTheme() {
  return localStorage.getItem(CURRENT_THEME_KEY) || DEFAULT_THEME;
}

function setCurrentTheme(theme) {
  localStorage.setItem(CURRENT_THEME_KEY, theme);
}

function getThemeEntry() {
  const currentTheme = getCurrentTheme();

  const [themeEntry] = THEMES.filter((t) => t.name === currentTheme);
  if (themeEntry === undefined) {
    throw new Error(`Theme not found with name ${currentTheme}`);
  }
  return themeEntry;
}

function getThemeId() {
  const entry = getThemeEntry();

  if (!entry) return "default";

  return entry.dir || entry.name;
}

function getThemeThumbnails() {
  const entry = getThemeEntry();

  if (!entry || entry.thumbnails !== true || !entry.project) return "default";

  return entry.project;
}

function getThemeThumbnailsList() {
  return THEMES.filter((t) => t.project !== undefined).map((t) => t.project);
}

function getThemeBrand() {
  const entry = getThemeEntry();

  if (!entry || entry.brand !== true) return "default";

  return entry.name;
}

function isThemeDark() {
  const entry = getThemeEntry();

  if (!entry || entry.dark !== true) return false;

  return entry.dark;
}

function getThemeTitle() {
  const entry = getThemeEntry();

  if (!entry || entry.title === undefined) return DEFAULT_TITLE;

  return entry.title;
}

function getThemeProject() {
  const entry = getThemeEntry();

  if (!entry || entry.project === undefined) return undefined;

  return entry.project;
}

function isThemeProjectFiltered() {
  const entry = getThemeEntry();

  return (
    entry !== undefined &&
    entry.project !== undefined &&
    entry.filterProject === true
  );
}

function applyTheme(theme, setThumbnails) {
  setCurrentTheme(theme);

  // Setting title and favicon

  const themeId = getThemeId();

  const title = getThemeTitle();
  const favicon = getThemeFavicon();

  $("title").text(title);

  $('link.theme[rel="icon"]').remove();
  $('link.theme[rel="stylesheet"]').remove();

  $("head").append(
    `<link rel="icon" class="theme" href="/dist/favicon/${favicon}.ico" />`
  );
  $("head").append(
    `<link rel="stylesheet" type="text/css" class="theme" href="/dist/${themeId}.css" />`
  );

  // Setting brand

  $("nav.navbar").removeClass(["navbar-light", "navbar-dark"]);
  $("nav.navbar").addClass(isThemeDark() ? "navbar-dark" : "navbar-light");

  $(".navbar-brand.top").empty();
  $(".navbar-brand.top").append(
    `<img src="/dist/brand/${getThemeBrand()}.png" alt="Brand" class="logo" />`
  );

  if (setThumbnails === true) {
    // Setting thumbnails

    const thumbnail = getThemeThumbnails();
    $(".thumbnail").attr("src", `/dist/thumbnails/${thumbnail}.jpg`);
  }
}

function initThemeSwitcher() {
  const themesList = getThemeList();
  const currentTheme = getCurrentTheme();

  themesList.forEach((theme) =>
    $("#theme-switcher").append(
      `<option ${theme === currentTheme ? "selected" : ""}>${theme}</option>`
    )
  );

  $("#theme-switcher").on("change", function (event) {
    const newTheme = event.currentTarget.value;
    applyTheme(newTheme, true);
  });
}

function detectTheme() {
  const themeEntry = THEMES.find(
    (theme) => theme.hostname === document.location.hostname
  );
  setCurrentTheme(themeEntry !== undefined ? themeEntry.name : DEFAULT_THEME);
}

function initThemes(autoDetect, useThemeSwitcher) {
  if (autoDetect) {
    detectTheme();
  } else if (useThemeSwitcher) {
    initThemeSwitcher(useThemeSwitcher);
  }

  applyTheme(getCurrentTheme(), useThemeSwitcher);
}

window.initThemes = initThemes;

export {
  CURRENT_THEME_KEY,
  DEFAULT_THEME,
  THEMES,
  getCurrentTheme,
  getThemeBrand,
  getThemeEntry,
  getThemeProject,
  getThemeThumbnailsList,
  initThemes,
  isThemeDark,
  isThemeProjectFiltered,
  setCurrentTheme,
};
