const mongoose=require("mongoose");
const Schema=mongoose.Schema;
//const initData=require("../init/data.js");
const Review=require("./review.js");
    

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
        
    //     type:String,
    //     //filename:String,
    //     //url:String,
    //     default:"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnww",
    //    set:(v)=> typeof v === "string"  && v.trim()!==""? v:"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnww" ,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",

    },
    ],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
},
// category:{
//     type:String,
//     enum:["mountains","arctic","farms","amazing-pools","castles","camping","iconic-cities","trending"]
// }

});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews
        
        }});
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;