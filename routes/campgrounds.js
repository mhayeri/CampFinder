const express = require("express");
const router = express.Router();

const campController = require("../controllers/campgrounds");
const handleAsync = require("../utils/handleAsync");

const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const { storage } = require("../cloudinary");

const multer = require("multer");
const upload = multer({ storage });

router
    .route("/")
    .get(handleAsync(campController.index))
    .post(
        isLoggedIn,
        upload.array("image"),
        validateCampground,
        handleAsync(campController.createCampground)
    );

/**
 ** Route to create a new campground.
 */
router.get("/new", isLoggedIn, campController.renderNewForm);

router
    .route("/:id")
    .get(isLoggedIn, handleAsync(campController.viewCampground))
    .put(
        isLoggedIn,
        isAuthor,
        upload.array("image"),
        validateCampground,
        handleAsync(campController.updateCampground)
    )
    .delete(isLoggedIn, isAuthor, handleAsync(campController.deleteCampground));

/**
 ** Route to edit a particular campground. Serves form.
 *  @param id The id of the selected campground.
 */
router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor,
    handleAsync(campController.editCampground)
);

module.exports = router;
