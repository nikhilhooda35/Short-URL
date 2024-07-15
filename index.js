const express = require("express");

const urlRoute = require("./routes/url");
const { connectDB } = require("./connection");
const URL = require("./models/url");
const { handleGetAnalytics } = require("./controllers/url");

const app = express();
const PORT = 8001;

connectDB();

app.use(express.json());

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
  res.redirect(entry.redirectURL);
});

app.get("/analytics/:shortId", handleGetAnalytics);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
