const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");
const PORT = 8001;
const app = express();

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("mongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);

app.use("/", staticRouter);

app.use("/test", async (req, res) => {
  const allURLS = await URL.find({});
  return res.render("url", {
    urls: allURLS,
  });
});

app.use("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
