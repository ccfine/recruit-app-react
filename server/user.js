const express = require("express");
const utility = require("utility");
const model = require("./model.js");

const Router = express.Router();
const User = model.getModel("user");

Router.get("/list", (req, res) => {
  // User.remove({},(err,doc)=>{});
  User.find({}, (err, doc) => {
    return res.json(doc);
  });
});

Router.get("/validate", (req, res) => {
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({ success: false, msg: "没有登录" });
  } else {
    User.findOne({ _id: userId }, { "pwd": 0, "__v": 0 }, (err, doc) => {
      if (err) {
        return res.json({ success: false, msg: "查询数据出错了！" });
      } else if (!doc) {
        return res.json({ success: false, msg: "没有登录" });
      } else {
        return res.json({ success: true, msg: "已经登录了", data: doc });
      }
    });
  }
});

Router.post("/login", (req, res) => {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5pwd(pwd) }, { "pwd": 0, "__v": 0 }, (err, doc) => {
    if (err) {
      return res.json({ success: false, msg: "查询数据出错了！" });
    } else if (!doc) {
      return res.json({ success: false, msg: "用户名不存在或密码错误！" });
    } else {
      res.cookie("userId", doc._id);
      res.json({ success: true, msg: "登录成功", data: doc });
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

Router.post("/improve", (req, res) => {
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({ success: false, isLogin: false, msg: "没有登录，请重新登录！" });
  } else {

  }
});

//md5给密码加密
const md5pwd = (pwd) => {
  const salt = "ccfine24";
  return utility.md5(utility.md5(pwd + salt));
};

module.exports = Router;