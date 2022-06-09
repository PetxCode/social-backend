const {
	deleteFollow,
	createFollow,
} = require("../controller/followController");
const verified = require("../utils/verified");

const express = require("express");
const router = express.Router();

router.route("/").post(verified, createFollow);

router.route("/:id/:post").delete(deleteFollow);

module.exports = router;

// router.put('/follow',requireLogin,(req,res)=>{
//     User.findByIdAndUpdate(req.body.followId,{
//         $push:{followers:req.user._id}
//     },{
//         new:true
//     },(err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }
//       User.findByIdAndUpdate(req.user._id,{
//           $push:{following:req.body.followId}

//       },{new:true}).select("-password").then(result=>{
//           res.json(result)
//       }).catch(err=>{
//           return res.status(422).json({error:err})
//       })

//     }
//     )
// })
