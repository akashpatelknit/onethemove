const express = require('express');
const app = express();
const router = express.Router();
const COLLECTION = require('../model/model');

router.get("/", async (req, res) => {
    try {
       
        res.json(req.body);

    } catch {
        console.log("erroe");
    }
})
router.post("/", async (req, res) => {

    const user_data = req.body;
    const recommendation = [];

    user_data.map((item) => {
        const arr = []
        item.improvement.map((item1) => {
            if (item1.improvement < 0) {
                arr.push({
                    movement: item1.movement,
                    improvement:item1.improvement,
                    recommendation: "recomm_xyz"
                })
            }
        })

        const data = new COLLECTION({
            name: item.name,
            assessmentMonth: item.assessmentMonth,
            Gap: item.Gap,
            improvement: arr

        })
        if (arr.length >= 1) {

            recommendation.push(data);
        }


    })

    try {
        res.json(recommendation);
    } catch (err) {
        console.log(err);
    }

})

module.exports = router