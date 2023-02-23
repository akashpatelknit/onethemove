const express = require('express');
const router = express.Router();
const { getRecommendation } = require('../../functions/recommendation');
const { getImprovement } = require('../../functions/user_improvement');



router.post("/", async (req, res) => {

    const user_assessment_data = req.body;
    const user_improvement_allMonth = getImprovement(user_assessment_data);
    // filter latest month and pass to getRecommendation function
    const user_recommendation_latestmonth = getRecommendation(user_improvement_allMonth);




    try {
        res.json(user_recommendation_latestmonth);
    } catch (err) {
        console.log(err);
    }

})

module.exports = router