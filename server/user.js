const express = require("express");
const utility = require("utility");
const model = require("./model.js");

const Router = express.Router();
const User = model.getModel("user");
const Chat = model.getModel("chat");

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

Router.post("/improve", (req, res) => {
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({ success: false, isLogin: false, msg: "没有登录，请重新登录！" });
  } else {
    User.findByIdAndUpdate(userId, req.body, (err, doc) => {
      if (err) {
        return res.json({ success: false, msg: "查询数据出错！" });
      } else if (!doc) {
        return res.json({ success: false, isLogin: false, msg: "该用户不存在！" });
      } else {
        const data = Object.assign({
          user: doc.user,
          type: doc.type
        }, req.body);
        return res.json({ success: true, msg: "完善信息成功", data: data }); 
      }       
    });
  }
});

Router.get("/userlist", (req, res) => {
  // User.remove({},(err,doc)=>{});
  const { type } = req.query;
  User.find({ type }, { pwd: 0, __v: 0 },(err, doc) => {
    if (err) {
      return res.json({ success: false, msg: "查询数据出错了！" });
    } else {
      if (type === "worker") {
        return res.json({ success: true, msg: "牛人列表", data: doc });
      } else {
        return res.json({ success: true, msg: "boss列表", data: doc });
      }
    }
  });
});

Router.get("/msglist", (req, res) => {
  const { userId } = req.cookies;
  let users = [];
  User.find({}, (err, doc) => {
    doc.forEach(item => {
      users.push({ id: item._id, name: item.user, photo: item.photo });
    });
  });
  Chat.find({ "$or": [{ from: userId }, { to: userId }] }, (err, doc) => {
    if (err) {
      return res.json({ success: false, msg: "查询数据出错了！" });
    } else {
      return res.json({ success: true, msg: "聊天列表", data: doc, users: users })
    }
  });
});

// Chat.remove({},(err,doc)=>{});

//md5给密码加密
const md5pwd = (pwd) => {
  const salt = "ccfine24";
  return utility.md5(utility.md5(pwd + salt));
};

module.exports = Router;