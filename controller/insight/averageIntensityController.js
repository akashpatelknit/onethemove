const express = require('express');
const { getAverageIntensity } = require('../../service/insight/intensity/averageIntensity');
const { getIntensityRecommendation } = require('../../service/insight/intensity/recommendateIntensity');
const router = express.Router();


router.get("/workout/average", async (req, res) => {
    
    const intensity = await getAverageIntensity();
    res.json(intensity);

})

router.get("/recommendation", async (req, res) => {
    
    const memberName = req.query.name
    const title=req.query.day
    const intensity = await getIntensityRecommendation(memberName,title);
    res.json(intensity);

})

module.exports = router