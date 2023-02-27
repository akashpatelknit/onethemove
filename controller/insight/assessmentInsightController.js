const express = require('express');
const { getAssessmentInsight } = require('../../service/insight/assessmentInsight/assessmentInsight');
const router = express.Router();


router.post("/", async (req, res) => {
    
    const insights = await getAssessmentInsight()
    res.json(insights);

})

module.exports = router