const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = process.env.JWT_SECRET;

// Route 1 : Create a user using:POST "/api/auth/creteuser". doesnt require auth

router.post('/createuser', [
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'password must be of 5 charcter').isLength({ min: 5 })
], async (req, res) => {
   let success = false;

   // if there are errors, return Bad request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }  

   // Check wheter the user with this email exist already
   try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass
      })
      const data = {
         user: {
            id: user.id
         }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
   
      //res.json(user)
      success = true
      res.json({success, authtoken })

   } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal server Error ")
   }
});


// Route 2 : Authenticate a User using :POST "/api/auth/login".  No login required.

router.post('/login', [
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
   let success = false

   // if there are errors,return Bad request and error  
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { email, password } = req.body;
   try {
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ errors: 'please try to login with correct credentials' });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
         success = false
         return res.status(400).json({success, error: 'please try to login with correct credentials' })
      }

      const data = {
         user: {
            id: user.id
         }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true ;
      res.json({ success, authtoken })

   } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal server Error ")
   }

});
 
// Route 3 : Get loggedin User-Details using: POST "/api/auth/getuser". login required

router.post('/getuser', fetchuser, async (req, res) => {

try {
   const userId = req.user.id;
   const user = await User.findById(userId).select("-password")
   res.send(user);
} catch (error) {
   console.error(error.message);
   res.status(500).send("Internal server Error");
}
});

module.exports = router