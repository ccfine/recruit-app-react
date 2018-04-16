const mongoose = require("mongoose");

const MongoDB_URl = "mongodb://localhost:27017/recruit";
mongoose.connect(MongoDB_URl);

const collections = {
  user: {
    "user": { type: String, require: true },
    "pwd": { type: String, require: true },
    "type": { type: String, require: true },
    "photo": { type: String },
    "company": { type: String },
    "job": { type: String },
    "money": { type: String },
    "desc": { type: String }    
  },
  chat: {
    "chatid": { type: String, require: true },
    "from": { type: String, require: true },
    "to": { type: String, require: true },
    "read": { type: Boolean, default: false },
    "content": { type: String, require: true, default: "" },
    "create_time": { type: Number, require: true, default: new Date().getTime() },
  }
};

for (let col in collections) {
  mongoose.model(col, new mongoose.Schema(collections[col]));
}

module.exports = {
  getModel: (name) => mongoose.model(name)
};