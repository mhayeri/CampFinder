const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/reviews");

const handleAsync = require("../utils/handleAsync");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

router.post(
    "/",
    isLoggedIn,
    validateReview,
    handleAsync(reviewController.addReview)
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    handleAsync(reviewController.deleteReview)
);

module.exports = router;
