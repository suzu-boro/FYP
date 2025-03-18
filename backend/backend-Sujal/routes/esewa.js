var express = require("express");
const {
  handleEsewaSuccess,
  handleEsewaFailure,
} = require("../controller/esewaController");
const { createOrder } = require("../controller/esewaController");
var router = express.Router();

router.get("/success", handleEsewaSuccess);
router.post("/create", createOrder);
router.get("/failure", handleEsewaFailure);

module.exports = router;
