const express = require("express");
const {
  getAppointment,
  postAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const router = express.Router();

router.get("/", getAppointment);
router.post("/", postAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
