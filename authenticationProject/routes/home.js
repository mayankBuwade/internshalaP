const express = require("express");
const requireAuth = require("../middleware/requiredAuth.js");

const router = express.Router();

// require auth for all workouts
router.use(requireAuth);

router.get("/", (req, res) => {
  res.status(200).json("welcome user");
});

module.exports = router;
