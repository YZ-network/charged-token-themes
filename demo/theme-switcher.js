const DEFAULT_TITLE = "Themes demo";
const CURRENT_THEME_KEY = "YZ_CURRENT_THEME";

let currentTheme = localStorage.getItem(CURRENT_THEME_KEY) || "default";

function getThemeList() {
  return THEMES.map((t) => t.name);
}

function getThemeEntry() {
  const [themeEntry] = THEMES.filter((t) => t.name === currentTheme);
  console.log("found theme entry", themeEntry);
  return themeEntry;
}

function getThemeId() {
  const entry = getThemeEntry();

  if (!entry) return "default";

  return entry.dir || entry.name;
}

function getThemeThumbnails() {
  const entry = getThemeEntry();

  if (!entry || entry.thumbnails !== true) return "default";

  return entry.name;
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

function getThemeFavicon() {
  const entry = getThemeEntry();

  if (!entry || entry.favicon !== true) return "default";

  return entry.name;
}

function applyTheme(theme) {
  console.log("Applying theme", theme);

  currentTheme = theme;
  localStorage.setItem(CURRENT_THEME_KEY, currentTheme);

  console.log("Setting title and favicon");

  const themeId = getThemeId();

  const title = getThemeTitle();
  const favicon = getThemeFavicon();

  $("title").text(title);

  $('link.theme[rel="icon"]').remove();
  $('link.theme[rel="stylesheet"]').remove();

  $("head").append(
    `<link rel="icon" class="theme" href="../dist/favicon/${favicon}.ico" />`
  );
  $("head").append(
    `<link rel="stylesheet" type="text/css" class="theme" href="../dist/${themeId}.css" />`
  );

  console.log("Setting brand");

  $("nav.navbar").removeClass(["navbar-light", "navbar-dark"]);
  $("nav.navbar").addClass(isThemeDark() ? "navbar-dark" : "navbar-light");

  $(".navbar-brand").empty();
  $(".navbar-brand").append(
    `<img src="../dist/brand/${getThemeBrand()}.png" alt="Brand" class="logo" />`
  );

  console.log("Updating thumbnails");

  const thumbnail = getThemeThumbnails();
  $(".card-img-top").attr("src", `../dist/thumbnails/${thumbnail}.jpg`);

  console.log("Theme applied !");
}

function initThemeSwitcher() {
  const themesList = getThemeList();

  themesList.forEach((theme) =>
    $("#theme-switcher").append(
      `<option ${theme === currentTheme ? "selected" : ""}>${theme}</option>`
    )
  );

  $("#theme-switcher").on("change", function (event) {
    const newTheme = event.currentTarget.value;
    console.log("Switching to theme", newTheme);
    applyTheme(newTheme);
  });

  console.log("Theme switcher initialized with list :", themesList);
}

console.log(
  "Loaded theme switcher with configured themes",
  THEMES,
  "and current theme",
  currentTheme
);

initThemeSwitcher();
applyTheme(currentTheme);

console.log("Initialization complete");
