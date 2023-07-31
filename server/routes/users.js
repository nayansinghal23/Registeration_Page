const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
  getAllUsers,
  updatePassword,
} = require("../controllers/users");
const router = express.Router();

router.get("/register", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/login", updatePassword);
router.get("/current", currentUser);

module.exports = router;
