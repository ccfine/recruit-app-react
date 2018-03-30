const express = require("express");
const model = require("./model.js");

const Router = express.Router();
const User = model.getName("user");

Router.get("./list", (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc);
  });
});

Router.post("/register", (req, res) => {
  const { User, pwd, type } = req.body;
  User.findOne({ user: user }, (err, doc) => {
    if (err) {
      return res.json({ success: false, msg: "查询数据出错了！" });
    } else if (doc) {
      return res.json({ success: false, msg: "用户名重复，请重新输入！" });
    } else {
      User.create({
        user: user,
        pwd: pwd,
        type: type
      }, (err, doc) => {
        if (err) {
          return res.json({ success: false, msg: "录入数据出错了！" });
        } else {
          return res.json({ success: true, msg: "注册成功" });
        }
      });
    }
  });
});

Router.get("/info", (req, res) => {
  return res.json({ code: 0 });
});

module.exports = Router;