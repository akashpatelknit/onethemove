const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const port=process.env.PORT || 3000;
mongoose.set('strictQuery', false);
const router = express.Router();

const assessmentInsightsController = require('./controller/insight/assessmentInsightController')
const consistencyInsightsController = require('./controller/insight/consistencyInsightController')
const averageintensityController=require('./controller/insight/averageIntensityController');
const workoutController=require('./controller/workoutController');
const { initDB } = require('./db/db');

app.use('/insight/assessment',assessmentInsightsController)
app.use('/insight/consistency',consistencyInsightsController)
app.use('/insight/intensity',averageintensityController)
app.use('/workout',workoutController)

app.get("/health", async (req, res) => {
    res.json("service is running");

})

app.listen(port, async () => {
    await initDB()
    console.log(`Server started at port ${port}`)
    
})