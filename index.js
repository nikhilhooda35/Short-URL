const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const { connectDB } = require("./connection");
const URL = require("./models/url");
const { handleGetAnalytics } = require("./controllers/url");
const staticRouter = require("./routes/staticRouter");
const app = express();
const PORT = 8001;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.use("/", staticRouter);

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  const appendURL = entry?.redirectURL.includes("http")
    ? entry.redirectURL
    : `https://${entry?.redirectURL}`;
  res.redirect(appendURL);
});

app.get("/analytics/:shortId", handleGetAnalytics);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
