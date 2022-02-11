const express = require("express");
const { route } = require("express/lib/application");
const {
  addData,
  getData,
  delData,
  updateData,
  getCount,
  getCount2,
  mailData,
} = require("../controllers/userControllers");
const router = express.Router();
router.route("/").post(getData);
router.route("/addData").post(addData);
router.route("/delData").post(delData);
router.route("/updateData").post(updateData);
router.route("/getCount").post(getCount);
router.route("/getCount2").post(getCount2);
router.route("/mailData").post(mailData);
module.exports = router;
