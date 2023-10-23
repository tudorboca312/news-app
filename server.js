const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

import("node-fetch").then((module) => {
  fetch = module.default;
});
app.use(express.static("public"));

const API_KEY = process.env.NEWS_API_KEY;

// Middleware to fetch news
const fetchNews = (category) => async (req, res, next) => {
  const url = category
    ? `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    : `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        req.query.q
      )}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.data = data;
    next();
  } catch (error) {
    next(error);
  }
};

app.get("/getGeneralNews", fetchNews("general"), (req, res) =>
  res.json(res.data)
);
app.get("/getBusinessNews", fetchNews("business"), (req, res) =>
  res.json(res.data)
);
app.get("/getSportNews", fetchNews("sport"), (req, res) => res.json(res.data));
app.get("/getTechnologyNews", fetchNews("technology"), (req, res) =>
  res.json(res.data)
);
app.get("/getEntertainmentNews", fetchNews("entertainment"), (req, res) =>
  res.json(res.data)
);
app.get("/searchNews", fetchNews(), (req, res) => res.json(res.data));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(port, () => console.log(`Server has started on port ${port}`));
