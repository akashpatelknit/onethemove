const express = require('express');
const app = express();
const router = express.Router();
const COLLECTION = require('../model/model');
const user_improvement=require('../functions/user_improvement');
const recommendation=require('../functions/recommendation');

router.get("/", async (req, res) => {
    try {

        res.json(req.body);

    } catch {
        console.log("erroe");
    }
})
router.post("/", async (req, res) => {

    const user_data = req.body;
    const user_improvement_latestmonth = user_improvement(user_data);
    const user_recommendation_latestmonth=recommendation(user_improvement_latestmonth);


    

    try {
        res.json(user_recommendation_latestmonth);
    } catch (err) {
        console.log(err);
    }

})

module.exports = router