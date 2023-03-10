const express = require('express');
const { getAssessmentInsight } = require('../../service/insight/assessmentInsight/assessmentInsight');
const { getUserConsistency } = require('../../service/insight/consistency/getconsistency');
const { getWorkoutAttendance } = require('../../service/insight/consistency/insight_attendance');
const router = express.Router();


router.get("/workout/attendance", async (req, res) => {
    
    const insights = await getWorkoutAttendance()
    res.json(insights);

})

router.get("/user", async (req, res) => {
    
    const memberCode = req.query.code
    const insights = await getUserConsistency(memberCode)
    res.json(insights);

})

module.exports = router