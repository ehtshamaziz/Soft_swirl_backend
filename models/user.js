const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// const { TOKEN_KEY } = process.env

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    userType: String,
    password: String,
    image: {
      type: String,
      default: "abc",
    },
    token: String,
    accountStatus: String,
    fromTime: {
      type: String,
      // default: new Date("2023-07-07T00:00:00Z"),
    },
    toTime: {
      type: String,
      // default: new Date("2023-07-07T00:00:00Z"),
    },
    verified: {
      type: Boolean,
      default: false,
    },
    wishlist: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

// userSchema.methods.generateAuthToken = function () {
//     this.token = jwt.sign({ userID: this._id, email: this.email }, TOKEN_KEY, { expiresIn: '10h' })
// }

module.exports = mongoose.model("user", userSchema);
