const orderModel = require("../../models/order");
const userModel = require("../../models/user");
const productModel = require("../../models/product");
const categoryModel = require("../../models/category");
const imageModel = require("../../models/images");

module.exports.dashboardData = async (req, res) => {
  try {
    // counts
    const sellersCount = await userModel.find({ userType: "SELLER" }).count();
    const usersCount = await userModel.find({ userType: "USER" }).count();
    const ridersCount = await userModel.find({ userType: "RIDER" }).count();
    const categoriesCount = await categoryModel.find().count();

    return res.json({
      success: true,
      message: "dashboard data",
      data: {
        sellersCount,
        usersCount,
        ridersCount,
        categoriesCount,
      },
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    // all users
    const users = await userModel
      .find({ userType: "USER" })
      .select("-password -token");

    return res.json({
      success: true,
      message: "all users",
      data: users,
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.getAllSellers = async (req, res) => {
  try {
    // all users
    const users = await userModel
      .find({ userType: "SELLER" })
      .select("-password -token");

    return res.json({
      success: true,
      message: "all Riders",
      data: users,
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.getAllRider = async (req, res) => {
  try {
   
    // all users
    const users = await userModel
      .find({ userType: "RIDER", verified: true })
      .select("-password -token");

    return res.json({
      success: true,
      message: "all Riders",
      data: users,
    });
  } catch (error) {
    res.send(error.message);
  }
};
module.exports.getSellerAllRider = async (req, res) => {
  try {
  
    // all users
    const users = await userModel
      .find({ userType: "RIDER", verified: true })
      .select("-password -token");

    return res.json({
      success: true,
      message: "all Riders",
      data: users,
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.getAllRiderRequests = async (req, res) => {
  try {
    // all users
    
    const users = await userModel
      .find({
        userType: "RIDER",
        verified: false,
        
      })
      .select("-password -token");

    return res.json({
      success: true,
      message: "Rider Accepted",
      data: users,
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.acceptAllRiderRequests = async (req, res) => {
  try {
    console.log("Hellooo");

    // all users
    const users = await userModel.findOneAndUpdate(
      {
        userType: "RIDER",
        verified: false,
        // $or: [{ verified: false }, { verified: { $exist: false } }],
      },
      { $set: { verified: true } }
    );
    if (users) {
      console.log("Hello1");

      return res.json({
        success: true,
        message: "Rider Accepted",
        data: users,
      });
    } else {
      console.log("Hello2");

      return res.json({
        success: false,
        message: "Rider can not be Accepted",
        data: users,
      });
    }
    // .select("-password -token");

    // return res.json({
    //   success: true,
    //   message: "all Riders",
    //   data: users,
    // });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.deletePerson = async (req, res) => {
  try {
    const { id } = req.query;

    // check if product exist with the given product id
    const product = await userModel.deleteOne({ _id: id });
    if (!product) {
      return res.json({
        success: false,
        message: "Does not exist",
      });
    }
    return res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.banPerson = async (req, res) => {
  try {

    const { id } = req.query;

    const updatedorders = await userModel.findOneAndUpdate(
      {
        _id: id,
        $or: [{ riderStatus: false }, { riderStatus: { $exists: false } }],
      },
      { $set: { riderStatus: true } }
  
    );

    return res.json({
      success: true,
      status: 200,
      message: "User Baned",
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

module.exports.unBanPerson = async (req, res) => {
  try {

    const { id } = req.query;

    const updatedorders = await userModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    return res.json({
      success: true,
      status: 200,
      message: "User Unbaned",
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

module.exports.saveImage = async (req, res) => {
  try {
    var imageFile = req.query.image;
    var imageDetails = new imageModel({
      imageName: imageFile,
    });

    imageDetails.save(function (err, doc) {
      if (err) throw err;

      console.log("success");
    });


    const { id } = req.query;

    const updatedorders = await imageModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    return res.json({
      success: true,
      status: 200,
      message: "User Unbaned",
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
