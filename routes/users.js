const express = require("express");
const router = express.Router();
const handleAsync = require("../utils/handleAsync");
const passport = require("passport");

const userController = require("../controllers/users");

const { storeReturnTo } = require("../middleware");

router
    .route("/register")
    .get(userController.renderRegisterForm)
    .post(handleAsync(userController.createUser));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        storeReturnTo,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        userController.login
    );

router.get("/logout", userController.logout);

module.exports = router;
