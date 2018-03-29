const express = require("express");

const userRouter = require("./user.js");
const app = express();

app.use("/user", userRouter);

app.listen(9093, () => {
  console.log("run successfully");
});