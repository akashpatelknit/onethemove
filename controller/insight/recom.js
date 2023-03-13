const { getRecom } = require('../../service/insight/recommendation/recom');

const express=require('express')

const router=express.Router()

router.get('/',async (req,res)=>{
   const memberName = req.query.name
   const data = await getRecom(memberName);
   res.json(data);
})


module.exports= router
