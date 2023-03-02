const express = require('express');

const { getWorkoutDetails } = require('../service/workoutDetails');
const router = express.Router();


router.get("/details", async (req, res) => {
    
    const intensity = await getWorkoutDetails(
        req.query.batch,
        req.query.title,
        req.query.member,
        req.query.theme
        );
    res.json(intensity);

})

module.exports = router