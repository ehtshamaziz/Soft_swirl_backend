const express = require("express");
const app = express();
const port = process.env.PORT;
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
var path = require("path");
var cors = require("cors");

// To access public folder
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Set up Global configuration access
dotenv.config();

// MULTER
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    let uploadFile = file.originalname.split(".");
    let name = `${uploadFile[0]}-${Date.now()}.${
      uploadFile[uploadFile.length - 1]
    }`;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

const {
  register,
  login,
  updateUser,
  deleteUser,
  userById,
  resetPassword,
  addProfilePic,
  getProfilePic,
  sendmail,
} = require("./controllers/auth/auth");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("./controllers/products/products");
const {
  checkout,
  addToCart,
  cart,
  removeFromCart,
} = require("./controllers/user/cart");
const {
  isAdmin,
  isSeller,
  checkAuth,
} = require("./controllers/middlewares/auth");
const {
  dashboardData,
  getAllUsers,
  getAllRider,
  getAllRiderRequests,
  getSellerAllRider,
  acceptAllRiderRequests,
  getAllSellers,
  deletePerson,
  banPerson,
  unBanPerson,
  saveImage,
} = require("./controllers/admin/dashboard");
const {
  sellerDashboard,
  getAllSellerProducts,
  getFilteredSellerProducts,
} = require("./controllers/seller/sellerDashboard");
const {
  getRiderOrders,
  setRiderEmail,
  riderDeleteProduct,
  riderAddStatus,
  riderSetTime,
} = require("./controllers/rider/riderOrders");
const {
  getAllOrders,
  changeStatusOfOrder,
  getMyOrders,
} = require("./controllers/admin/orders");
const {
  orders,
  getOrder,
  getNotification,
} = require("./controllers/user/orders");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("./controllers/categories/category");
const {
  addToWishlist,
  wishlist,
  removeFromWishlist,
} = require("./controllers/user/wishlist");
const {
  addReview,
  allReview,
} = require("./controllers/review-controller/review");
const mongoose = require("./config/database")();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// AUTH
app.post("/register", register);
app.post("/login", login);

// User Routes
app.post("/update-user", updateUser);
app.get("/user", userById);
app.get("/delete-user", deleteUser);
app.post("/reset-password", resetPassword);
app.patch("/addProfile-pic", addProfilePic);
app.get("/getProfile-pic", getProfilePic);
app.post("/sendmail", sendmail);
// sendmail;
// Products
app.post("/product", addProduct);
app.get("/products", getAllProducts);
app.post("/update-product", [isAdmin], updateProduct);
app.get("/delete-product", [isAdmin], deleteProduct);

// CATEGORIES
app.post("/category", [isAdmin], addCategory);
app.get("/categories", getCategories);
app.post("/update-category", [isAdmin], updateCategory);
app.get("/delete-category", [isAdmin], deleteCategory);

// ORDERS
app.get("/orders", [checkAuth], orders);
app.get("/get-review", [checkAuth], getOrder);
app.get("/get-notification", [checkAuth], getNotification);

// CHECKOUT
app.post("/checkout", [checkAuth], checkout);

// WISHLIST
app.post("/add-to-wishlist", [checkAuth], addToWishlist);
app.get("/wishlist", [checkAuth], wishlist);
app.get("/remove-from-wishlist", [checkAuth], removeFromWishlist);

//Review
app.post("/add-review", [checkAuth], addReview);
app.get("/all-review", [checkAuth], allReview);

// ADMIN
app.get("/dashboard", [isAdmin], dashboardData);
app.get("/admin/orders", getAllOrders);
app.get("/admin/order-status", changeStatusOfOrder);
app.get("/admin/users", [isAdmin], getAllUsers);
app.get("/admin/riders", [isAdmin], getAllRider);
app.get("/seller/ridersGet", [isSeller], getSellerAllRider);
app.get("/admin/ridersRequest", [isAdmin], getAllRiderRequests);
app.patch("/admin/acceptAllRiderRequests", [isAdmin], acceptAllRiderRequests);

app.get("/admin/sellers", [isAdmin], getAllSellers);

// /admin/ridersRequest
app.delete("/admin/person", deletePerson);
app.patch("/admin/banPerson", banPerson);
app.patch("/admin/UnbanPerson", unBanPerson);

//SELLER
app.get("/sellerDashboard/:sellerEmail", sellerDashboard);
app.get("/sellerProducts/:sellerEmail", getAllSellerProducts);
app.get("/sellerDelete-product", deleteProduct);
app.post("/sellerUpdate-product", updateProduct);
app.get("/seller/orders", getAllOrders);
app.get("/seller/myorders/:sellerEmail", getMyOrders);
app.get("/seller/getRiders", getAllRider);
app.get("/seller/uploadImage", saveImage);
app.get("/seller/getMyFilteredOrders/:riderEmail", getFilteredSellerProducts);

//RIDER
app.get("/rider/getMyOrders/:riderEmail", getRiderOrders);
app.patch("/rider/updateOrder", setRiderEmail);
app.get("/rider/riderDelete-product", riderDeleteProduct);
app.post("/rider/addStatus", riderAddStatus);
app.patch("/rider/setTime", riderSetTime);

// HELPER
app.post(
  "/photos/upload",
  upload.array("photos", 12),
  function (req, res, next) {
    // req.files is array of `photos` files

    try {
      let files = req.files;
      if (!files.length) {
        return res.status(400).json({
          err: "Please upload an image",
          msg: "Please upload an image",
        });
      }
      let file = req.files[0];
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        return res.json({ image: file.filename });
      }
    } catch (error) {
      return res.send(error.message);
    }
  }
);

app.listen(process.env.PORT || 8081, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
