const express = require("express")
const router = express.Router()
const viewsControllers = require("../Controllers/viewsController")
router.get("/derahack", viewsControllers.welcomeController)
module.exports = router