const router = require("express").Router();

// const utils = require("../utils/utils");
// console.log(utils.mainsendEmail());

const adminROuter = require("./adminrouter");
const usersRouter = require("./usersrouter");
router.use("/admin", adminROuter);
router.use("/user", usersRouter);

module.exports = router;
