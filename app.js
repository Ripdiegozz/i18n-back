import express from "express";
import i18n from "i18n";
import path from "path";

const app = express();

i18n.configure({
  locales: ["en", "es"],
  directory: path.join("./locales"),
  defaultLocale: "en",
  queryParameter: "lang",
  objectNotation: true,
  register: global,
  api: {
    __: "t",
    __n: "tn",
  },
});

app.use(i18n.init);

app.get("/", (req, res) => {
  const { lang } = req.query;

  if (lang) {
    i18n.setLocale(req, lang);
  } else {
    res.send("Please provide a language - /?lang=en or /?lang=es");
  }

  res.send(t("greeting"));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
