const express = require("express");
const utility = require("utility");
const model = require("./model.js");

const Router = express.Router();
const User = model.getModel("user");

Router.get("/list", (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc);
  });
});

Router.post("/login", (req, res) => {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5pwd(pwd) }, (err, doc) => {
    if (err) {
      return res.json({ success: false, msg: "查询数据出错了！" });
    } else if (!doc) {
      return res.json({ success: false, msg: "用户名不存在或密码错误！" });
    } else {
      return res.json({ success: true, msg: "登录成功", data: doc });
    }
  });
});

Router.post("/register", (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({ user }, (err, doc) => {
    if (err) {
      return res.json({ success: false, msg: "查询数据出错了！" });
    } else if (doc) {
      return res.json({ success: false, msg: "用户名重复，请重新输入！" });
    } else {
      User.create({ user, pwd: md5pwd(pwd), type }, (err, doc) => {
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

//md5给密码加密
const md5pwd = (pwd) => {
  const salt = "ccfine24";
  return utility.md5(utility.md5(pwd + salt));
};

module.exports = Router;