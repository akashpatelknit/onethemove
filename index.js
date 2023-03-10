const express = require('express');
const cors = require('cors')
const assessmentInsightsController = require('./controller/insight/assessmentInsightController')
const consistencyInsightsController = require('./controller/insight/consistencyInsightController')
const averageintensityController=require('./controller/insight/averageIntensityController');
const workoutController=require('./controller/workoutController');
const { initDB } = require('./db/db');
const morgan = require('morgan');

const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

const port=process.env.PORT || 3000;

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