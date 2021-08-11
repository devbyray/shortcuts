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
  twitter: process.env.SHORTCUTS_TWITTER,
  youtube: process.env.SHORTCUTS_YOUTUBE,
};

const output = handlebars.compile(template)(data);

fs.mkdirSync("public");

fs.writeFile("public/index.html", output, (err) => {
  if (err) return console.log(err);

  console.log("Generated output");
});
