const express = require("express");

const urlRoute = require("./routes/url");
const { connectDB } = require("./connection");

const app = express();
const PORT = 8001;

connectDB();

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
