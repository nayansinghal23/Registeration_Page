const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
  getAllUsers,
} = require("../controllers/users");
const router = express.Router();

router.get("/register", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", currentUser);

module.exports = router;
