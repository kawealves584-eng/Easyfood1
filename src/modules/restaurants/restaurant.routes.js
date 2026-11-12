const { Router } = require("express");
const controller = require("./restaurant.controller");

const router = Router();

router.get("/", controller.index);
router.post("/", controller.store);
router.delete("/:id", controller.destroy);

module.exports = router;
