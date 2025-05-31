const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
        
//req.body.image=req.file?.path || "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGd";
//console.log(req.body.image);
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async () =>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'6838999b95466493aae73085'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};
initDB();