const ordersModel = require("../../models/order");
const userModel = require("../../models/user");
const productModel = require("../../models/product");
const categoryModel = require("../../models/category");
const product = require("../../models/product");

module.exports.getRiderOrders = async (req, res) => {
  try {
    console.log("products000");

    // Search through title names
    var { search } = req.query;
    if (!search) search = "";

    const products = await ordersModel
      .find({ riderEmail: { $eq: req.params.riderEmail } })
      .populate({ path: "user", select: "-password -token" })
      .populate("items.productId")
      .populate("items.categoryId");

    products.forEach((product) => {
      const riderStatus = product.riderStatus;
      console.log({ riderStatus });
    });

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

module.exports.setRiderEmail = async (req, res) => {
  try {
    // var {search} = req.query
    // if(!search) search = ""

    const { id } = req.query;

    const updatedorders = await ordersModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    return res.json({
      success: true,
      status: 200,
      message: "list of products",
      data: updatedorders,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};
module.exports.riderDeleteProduct = async (req, res) => {
  try {
    const { id } = req.query;

    // check if product exist with the given product id
    const product = await ordersModel.findOneAndDelete({ _id: id });
    if (!product) {
      return res.json({
        success: false,
        message: "order does not exist",
      });
    }
    return res.json({
      success: true,
      message: "order deleted successfully",
    });
  } catch (error) {
    return res.send(error.message);
  }
};
module.exports.riderAddStatus = async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;

    console.log(id);
    console.log(data.riderStatus);

    const order = await ordersModel.findOneAndUpdate(
      {
        _id: id,
        $or: [{ riderStatus: false }, { riderStatus: { $exists: false } }],
      },
      {
        $set: { riderStatus: true },
      },
      { new: true }
    );

    console.log(order);

    if (!order) {
      return res.json({
        success: false,
        message: "order does not exist",
        data: order,
      });
    } else {
      return res.json({
        success: true,
        // status: 200,
        message: "order updated successfully",
        data: order,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

module.exports.riderSetTime = async (req, res) => {
  try {
    const user = req.query;
    console.log(user);
    const { toTime, fromTime } = req.body;
    console.log(typeof toTime);
    console.log(toTime);
    // console.log(fromTime);
    // console.log("Hello00");

    const setTime = await userModel.findOneAndUpdate(
      {
        _id: user.id,
      },
      { $set: { fromTime: fromTime, toTime: toTime } },
      { new: true }
    );

    if (setTime) {
      console.log(setTime);
      console.log("time updated");
      res.json({
        success: true,
        message: "successeded",
      });
    } else {
      console.log("Time Not updated");
      res.json({
        success: false,
        message: "not successeded",
      });
    }
  } catch (error) {
    console.log("Error in set time");

    return res.send(error.message);
  }
};
