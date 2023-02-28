const express = require('express');
const { getAverageIntensity } = require('../../service/insight/assessmentInsight/test1');
const router = express.Router();


router.post("/", async (req, res) => {
    
    const intensity = await getAverageIntensity();
    res.json(intensity);

})

module.exports = router