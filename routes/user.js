const express = require("express");
const { handleUserSignup } = require("../controllers/user");
const router = express.Router();

router.post("/", handleUserSignup);
router.get("/signup", (req, res) => {
  return res.render("signup");
});

module.exports = router;
