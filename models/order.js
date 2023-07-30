const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderId: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
        quantity: Number,
        price: Number,
        sellerEmail: String,
        // riderStatus: {
        //   type: Boolean,
        //   default: false,
        // },
      },
    ],
    amount: Number,
    discount: Number,
    shippingAddress: String,
    riderEmail: String,
    riderStatus: {
      type: Boolean,
      default: false,
    },
    // riderStatus: Boolean,
    status: {
      type: String,
      enum: ["pending", "Sent To Rider", "Shipped", "delivered"],
    },
    country: { type: String },
    city: { type: String },
    zipcode: { type: String },
    payment_type: { type: String, enum: ["cod", "online"] },
    shippedOn: { type: String },
    deliveredOn: { type: String },
    customerLatitude: Number,
    customerLongitude: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
