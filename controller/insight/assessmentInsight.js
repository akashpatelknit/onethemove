const express = require('express');
const router = express.Router();
const { getRecommendation } = require('../../functions/recommendation');
const { getImprovement } = require('../../functions/user_improvement');



router.post("/", async (req, res) => {

    const user_assessment_data = req.body;
    const user_improvement_allMonth = getImprovement(user_assessment_data);
    // filter latest month and pass to getRecommendation function
    const user_recommendation_latestmonth = await getRecommendation(user_improvement_allMonth);

    res.json(user_recommendation_latestmonth);



    

})

module.exports = router