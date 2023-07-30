const ReviewModel = require("../../models/review");

module.exports.addReview = async (req, res) => {
  try {
    console.log("Hello");
    const data = req.body;
    let user = req.user;
    // addReview();

    const review = new ReviewModel({
      user: user?._id, // Assuming user._id is the ObjectId of the user
      product: data.product, // Assuming data.product is the ObjectId of the product being reviewed
      reviews: data.review, // Assuming data.reviews contains the review text
    });

    // Save the review document to the database
    const addReview = await review.save();

    // const addReview = await ReviewModel.findOneAndUpdate(
    //   { user: user?._id },
    //   { $push: { reviews: data } },
    //   { new: true }
    // );

    console.log("added");

    return res.json({
      success: true,
      message: "Product review is added successfully",
      data: addReview,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.allReview = async (req, res) => {
  try {
    console.log("Bachaoooo");
    const { id } = req.query;
    let user = req.user;
    const allReview = await ReviewModel.find({
      product: id,
    })
      .populate("user", "email name")
      .populate("product", "title");
    // .populate("user", "name");

    console.log(allReview);
    return res.json({
      success: true,
      message: "Product review is getsuccessfully",
      data: allReview,
    });
  } catch (error) {
    return res.send(error.message);
  }
};
