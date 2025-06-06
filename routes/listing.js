const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");

const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer=require("multer");

const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


// const validateListing=(req,res,next)=>{

// let {error} =listingSchema.validate(req.body);
 
//  if(error){
//     let errMsg=error.details.map((el)=> el.message).join(",");
//     throw new ExpressError(400,errMsg);
//  }else{
//     next();
//  }
// };
//index and create route
 router.route("/").get( wrapAsync( listingController.index))//
  .post( isLoggedIn, validateListing,upload.single("listing[image]"),wrapAsync(listingController.createListing));

 

//New route

router.get("/new",isLoggedIn,listingController.renderNewForm);
//show and update route
router.route("/:id")
.get(  wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync( listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm ));


module.exports=router;

