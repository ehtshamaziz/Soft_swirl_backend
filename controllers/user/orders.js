const ordersModel = require("../../models/order");

module.exports.orders = async (req, res) => {
  try {
    const user = req.user;
    const orders = await ordersModel
      .find({ user: user._id })
      .populate({ path: "user", select: "-password -token" })
      .populate("items.productId")
      .populate("items.categoryId");

    return res.json({
      success: true,
      message: "orders",
      data: orders,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.getOrder = async (req, res) => {
  try {
    console.log("helpehti");

    const user = req.user;
    const { id } = req.query;

    // console.log(req.user);
    const orders = await ordersModel.findOne({
      user: user._id,
      "items.productId": id,
    });

    return res.json({
      success: true,
      message: "orders",
      data: orders,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.getNotification = async (req, res) => {
  try {
    console.log("helpehti");

    const user = req.query;
    console.log(user.id);
    // const { id } = req.query;

    // console.log(req.user);
    const orders = await ordersModel.find({
      user: user.id,
      riderStatus: true,
    });

    console.log(orders);

    return res.json({
      success: true,
      message: "orders",
      data: orders,
    });
  } catch (error) {
    return res.send(error.message);
  }
};
