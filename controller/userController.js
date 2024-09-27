const userModel = require("../models/user");

class userController {
  static userInsert = async (req, res) => {
    console.log(req.body);

    try {
      const { name, email , password, phone, role } = req.body;
      const result = new userModel(req.body);
      if (!result) {
        return res
          .status(404)
          .json({ status: "fail", message: "User data not found" });
      }
      const saveuser = await result.save()
      res.status(200).json({
        status : "success",
        message : "User Registration Succesfully",
        saveuser,
      })
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error.message });
    }
  };
}

module.exports = userController;
