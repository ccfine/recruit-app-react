const express = require("express");
const mongoose = require("mongoose");

const app = express();
const MongoDB_URl = "mongodb://localhost:27017/recruit";

mongoose.connect(MongoDB_URl);
mongoose.connection.on("connected", () => {
  console.log("connected successfully");
});

const User = mongoose.model("user", new mongoose.Schema({
  user: { type: String, require: true},
  age: { type: Number, require: true }
}));

// User.create({
//   user: "ccfine",
//   age: 20
// }, (err, doc) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(doc);
//   }
// });

// User.remove({ user: "ccfine" }, (err, doc) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(doc);
//   }
// });

// User.update({ user: "ccfine" }, { $set: { age: 23 } }, (err, doc) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(doc);
//   }
// });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/data", (req, res) => {
  User.find({ user: "ccfine" }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.json(doc); 
    }
  });
});

app.listen(9093, () => {
  console.log("run successfully");
});