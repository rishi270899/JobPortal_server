const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    
    // If no token is provided, return unauthorized
    if (!token) {
      return res.status(401).json({ status: "failed", message: "Unauthorized" });
    }

    // Verify the token and extract data
    const data = jwt.verify(token, "rishigoyal@27");

    // Find user associated with the token
    const userData = await userModel.findOne({ _id: data.ID });

    // If user data is found, attach it to the request object
    if (userData) {
      req.userData = userData;
      next();  // Proceed to the next middleware or route handler
    } else {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = checkAuth;
