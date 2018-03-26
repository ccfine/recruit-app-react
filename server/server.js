const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/data", (req, res) => {
  res.json({ name: "hello world" });
});

app.listen(9093, () => {
  console.log("run successfully");
});