const Express = require("express");
const Joi = require("joi");

const app = Express();
const genres = ["action", "romance", "comedy", "adventure"];

app.get("/api/genres/", (req, res, next) => {
  res.send(genres);
  next();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
