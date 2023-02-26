const express = require('express');
const router = express.Router();
const axios=require('axios')
const { getRecommendation } = require('../../functions/recommendation');
const { getImprovement } = require('../../functions/user_improvement');
const getassessmentData = async () => {

    console.log("fetching data");
    const res = await axios.get('https://on-the-move.onrender.com/api/v1/collection?name=monthlyAssessment')
    // console.log(res.data);
    return res.data
}
const getData = async () => {

    console.log("fetching data");
    const res = await axios.get('https://on-the-move.onrender.com/api/v1/client/?batch=SHRED')
    console.log(res.data);
    return res.data
}
getData();
router.post("/", async (req, res) => {
    
    const user_assessment_data =await getassessmentData();
    console.log("data fetched");
    const user_improvement_allMonth = getImprovement(user_assessment_data);
    // filter latest month and pass to getRecommendation function
    const user_recommendation_latestmonth = await getRecommendation(user_improvement_allMonth);

    res.json(user_improvement_allMonth);



    

})

module.exports = router