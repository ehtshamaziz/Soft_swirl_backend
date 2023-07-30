const mongoose = require("mongoose")

const imagesSchema = mongoose.Schema({

    imageName : String,
});

module.exports = mongoose.model("images", imagesSchema)