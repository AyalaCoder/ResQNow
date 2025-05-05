const express = require("express")
 const router = express.Router()
 const emergencyController = require("../controllers/emergencyController")
 router.get("/",emergencyController.getAllEmergency)
 router.get("/:id", emergencyController.getEmergency)
 router.post("/", emergencyController.createNewEmergency)
 router.delete("/:id",emergencyController.deleteEmergency)
 router.put("/:id",emergencyController.updateEmergency)
 module.exports = router