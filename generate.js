require("dotenv").config();

const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const template = fs.readFileSync(
  path.resolve(path.join(__dirname, "template.hbs")),
  "utf-8"
);

const data = {
  ...(process.env.SHORTCUTS_NAME &&
    process.env.SHORTCUTS_NAME != "none" && {
      name: process.env.SHORTCUTS_NAME,
    }),
  ...(process.env.SHORTCUTS_SITE &&
    process.env.SHORTCUTS_SITE != "none" && {
      personalSiteUrl: process.env.SHORTCUTS_SITE,
    }),
  ...(process.env.SHORTCUTS_TWITTER &&
    process.env.SHORTCUTS_TWITTER != "none" && {
      twitterUsername: process.env.SHORTCUTS_TWITTER,
    }),
  ...(process.env.SHORTCUTS_YOUTUBE &&
    process.env.SHORTCUTS_YOUTUBE != "none" && {
      youTubeChannelUrl: process.env.SHORTCUTS_YOUTUBE,
    }),
  ...(process.env.SHORTCUTS_GITHUB &&
    process.env.SHORTCUTS_GITHUB != "none" && {
      gitHubUsername: process.env.SHORTCUTS_GITHUB,
    }),
  ...(process.env.SHORTCUTS_LINKEDIN &&
    process.env.SHORTCUTS_LINKEDIN != "none" && {
      linkedInUrl: process.env.SHORTCUTS_LINKEDIN,
    }),
  ...(process.env.SHORTCUTS_DEVTO &&
    process.env.SHORTCUTS_DEVTO != "none" && {
      devToUsername: process.env.SHORTCUTS_DEVTO,
    }),
  ...(process.env.SHORTCUTS_MEDIUM &&
    process.env.SHORTCUTS_MEDIUM != "none" && {
      mediumUrl: process.env.SHORTCUTS_MEDIUM,
    }),
};

const output = handlebars.compile(template)(data);

if (!fs.existsSync("public")) {
  fs.mkdirSync("public");
}

fs.writeFile("public/index.html", output, (err) => {
  if (err) return console.log(err);

  console.log("Generated output");
});
