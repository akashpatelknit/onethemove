const express = require('express');
const { getAverageIntensity } = require('../../service/insight/assessmentInsight/averageIntensity');
const router = express.Router();


router.get("/workout/average", async (req, res) => {
    
    const intensity = await getAverageIntensity();
    res.json(intensity);

})

module.exports = router