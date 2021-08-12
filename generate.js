require("dotenv").config();

const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const template = fs.readFileSync(
  path.resolve(path.join(__dirname, "template.hbs")),
  "utf-8"
);

const data = {
  name: process.env.SHORTCUTS_NAME,
  personalSiteUrl: process.env.SHORTCUTS_SITE,
  twitterUsername: process.env.SHORTCUTS_TWITTER,
  youTubeChannelUrl: process.env.SHORTCUTS_YOUTUBE,
  gitHubUsername: process.env.SHORTCUTS_GITHUB,
  linkedInUrl: process.env.SHORTCUTS_LINKEDIN,
  devToUsername: process.env.SHORTCUTS_DEVTO,
  mediumUrl: process.env.SHORTCUTS_MEDIUM,
};

const output = handlebars.compile(template)(data);

fs.mkdirSync("dist");

fs.writeFile("dist/index.html", output, (err) => {
  if (err) return console.log(err);

  console.log("Generated output");
});
