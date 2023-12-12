const express= require("express");
const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"Api Works 200 " + `${Date.now()}`});
})


module.exports = router;