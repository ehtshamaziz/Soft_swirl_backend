const ordersModel = require("../../models/order");
const userModel = require("../../models/user");
const productModel = require("../../models/product");
const categoryModel = require("../../models/category");
const reviewModel = require("../../models/review");

module.exports.sellerDashboard = async (req, res) => {
  console.log("seller hitted");

  try {
    // counts
    const PendingOrdersCount = await ordersModel
      .find({
        "items.sellerEmail": { $eq: req.params.sellerEmail },
        status: { $eq: "pending" },
      })
      .count();
    // User.find({"publications": {$eq:req.params.id}}).exec()
    const ProgressOrdersCount = await ordersModel
      .find({
        "items.sellerEmail": { $eq: req.params.sellerEmail },
        status: { $in: ["Sent To Rider", "Shipped"] },
      })
      .count();
    const productsCount = await productModel
      .find({ sellerEmail: { $eq: req.params.sellerEmail } })
      .count();
    const DeliveredOrdersCount = await ordersModel
      .find({
        "items.sellerEmail": { $eq: req.params.sellerEmail },
        status: { $eq: "delivered" },
      })
      .count();
    // const ReviewsCount = await reviewModel.find({product:{$eq:req.params.sellerEmail}})

    return res.json({
      success: true,
      message: "dashboard data",
      data: {
        PendingOrdersCount,
        ProgressOrdersCount,
        productsCount,
        DeliveredOrdersCount,
        // ReviewsCount,
      },
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.getAllSellerProducts = async (req, res) => {
  try {
    // Search through title names
    // var {search} = req.query
    // if(!search) search = ""

    const { sellerEmail } = req.query;

    const products = await productModel
      .find({ sellerEmail: { $eq: req.params.sellerEmail } })
      .populate("category");

    return res.json({
      success: true,
      status: 200,
      message: "list of products",
      data: products,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.getFilteredSellerProducts = async (req, res) => {
  try {
    // Search through title names
    var { search } = req.query;
    if (!search) search = "";

    const products = await productModel
      .find({ sellerEmail: { $eq: req.params.sellerEmail } })
      .populate("category");

    return res.json({
      success: true,
      status: 200,
      message: "list of products",
      data: products,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};
