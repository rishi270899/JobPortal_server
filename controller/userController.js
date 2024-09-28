const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
  static userInsert = async (req, res) => {
    // console.log(req.body);

    try {
      const { name, email, password, confirmpassword, phone, role } = req.body;

      // Check if email is already registered
      const user = await userModel.findOne({ email: email });
      if (user) {
        return res.status(409).json({ message: "Email already registered" });
      } else {
        if (name && email && password && confirmpassword && phone && role) {
          if (password === confirmpassword) {
            // Convert password to hash-password
            const hashpassword = await bcrypt.hash(password, 10);
            console.log(hashpassword);

            // Create new user object
            const result = new userModel({
              name,
              email,
              password: hashpassword,
              role,
              phone,
            });

            // Save the user with hashed password
            const userData = await result.save();

            // Now generate token
            if (userData) {
              const token = jwt.sign(
                { ID: userData._id, email: userData.email },
                "rishigoyal@27",
                { expiresIn: "1h" } // Set token expiration time
              );

              // Set token as a cookie and send response
              res
                .status(201)
                .cookie("token", token, { httpOnly: true }) // Store token in cookie
                .json({
                  status: "success",
                  message: "Thanks for registration",
                  token,
                });
            }
          } else {
            // If password and confirm password do not match
            return res.status(400).json({
              status: "failed",
              message: "Password and confirm password do not match",
            });
          }
        } else {
          // If required fields are missing
          return res.status(400).json({
            status: "failed",
            message: "All fields are required",
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "failed", message: error.message });
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log(req.body);

      // Check if all required fields are present
      if (email && password && role) {
        const user = await userModel.findOne({ email });

        // If user exists
        if (user) {
          // Check if the password matches
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            // Check if the role matches
            if (user.role === role) {
              // Generate token
              const token = jwt.sign(
                { ID: user._id, email: user.email },
                "rishigoyal@27",
                { expiresIn: "1h" }
              );
              res.cookie("token", token, { httpOnly: true });

              // Send success response
              return res.status(200).json({
                status: "success",
                message: "Login Successfully",
                token,
                user,
              });
            } else {
              // Role does not match
              return res.status(403).json({
                status: "failed",
                message: "User with this role is not authorized",
              });
            }
          } else {
            // Password does not match
            return res.status(401).json({
              status: "failed",
              message: "Incorrect password",
            });
          }
        } else {
          // User not found
          return res.status(404).json({
            status: "failed",
            message: "User not registered",
          });
        }
      } else {
        // Missing fields
        return res.status(400).json({
          status: "failed",
          message: "All fields are required",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "failed", message: error.message });
    }
  };

  // static userLogout = async (req,res) => {
  //   try {
  //     req.status(201).cookie({"token" ,{
  //       httpOnly :true,
  //       expires : new Date(Date.now()),

  //     }}.json({status : true, message : "Logout Successfully"}))
      
  //   } catch (error) {
  //     console.log(error)
  //     return res.status(500).status({status : "failed" , message : error.message})
      
  //   }
  // }


  static userLogout = async (req, res) => {
    try {
      // Clear the token by setting the cookie with an empty value and immediate expiration
      res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),  // Expire the cookie immediately
      }).json({
        status: true,
        message: "Logout Successfully"
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  };
  

  static getUserbyID = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ status: "failed", message: error.message });
    }
  };

  static getalluser = async (req, res) => {
    try {
      const users = await userModel.find();
      if (!users) {
        res.status(400).json({ message: "users not found" });
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      res.status(400).json({ status: "failed", message: error.message });
    }
  };
}

module.exports = userController;
