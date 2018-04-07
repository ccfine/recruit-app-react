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
  }
};

for (let col in collections) {
  mongoose.model(col, new mongoose.Schema(collections[col]));
}

module.exports = {
  getModel: (name) => mongoose.model(name)
};