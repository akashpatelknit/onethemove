const { getRecom } = require('../../service/insight/recommendation/recom');

const express=require('express')

const router=express.Router()

router.get('/',async (req,res)=>{
   const data = await getRecom();
   res.json(data);
})


module.exports= router
