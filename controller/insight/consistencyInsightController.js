const express = require('express');
const { getAssessmentInsight } = require('../../service/insight/assessmentInsight/assessmentInsight');
const { getWorkoutAttendance } = require('../../service/insight/consistency/insight_attendance');
const router = express.Router();


router.get("/workout/attendance", async (req, res) => {
    
    const insights = await getWorkoutAttendance()
    res.json(insights);

})

module.exports = router