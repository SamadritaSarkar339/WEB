const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const{validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");

//REviews
//post review route
router.post("/", isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//  //delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
// // Fixed route with correct parameters
// router.delete("/:id/reviews/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
//     let { id, reviewId } = req.params;
//     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//    req.flash("success", "Review Deleted!");
//    res.redirect(`/listings/${id}`); }));


module.exports=router;