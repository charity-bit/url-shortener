const mongoose = require("mongoose");
const shortId = require("shortid");

const urlSchema = new mongoose.Schema({
    longUrl: {  
       type: String,
       required:true,

    },
  uid: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: { type:Number, default: 0 },
  date: { type: Date, default: Date.now},
});


module.exports = mongoose.model("shortUrl", urlSchema);
