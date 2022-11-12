const fs = require("fs");
const menu = require("./menu");

module.exports.applyTemplate = (content, slug) => {
  var template = fs.readFileSync("templates/wiki.html", "utf-8");

  var slugSplit = slug.split("/");

  var info = {
    game: slugSplit[0] || "index",
    category: slugSplit[1] || "index",
    article: slugSplit[2] || "index",
  };

  var gameSelector = ``;
  var games = fs.readdirSync("pages");

  for (let index = 0; index < games.length; index++) {
    const game = games[index];

    if (game != "index") {
      console.log(game);
      var gameMeta = require(`../pages/${game}/meta.json`);

      gameSelector += `
    <a href="/${game}" class="game${
        game == info.game ? " active" : ""
      }" style="--primary: ${gameMeta.color}; --primaryTransparent: ${
        gameMeta.color
      }80">
      <img
        src="${gameMeta.logo}"
      />
    </a>`;
    }
  }

  return template
    .replaceAll("%CONTENT%", content)
    .replaceAll(
      "%EDITLINK%",
      `https://github.com/ChaosInitiative/chaos-wiki/edit/main/pages/${slug}.md`
    )
    .replaceAll("%MENU%", menu.generateMenuHTML(slug))
    .replaceAll("%GAMESELECTOR%", gameSelector);
};
