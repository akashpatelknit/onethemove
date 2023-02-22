const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const port=process.env.PORT || 3000;
mongoose.set('strictQuery', false);

const assessmentInsightsController = require('./controller/insight/assessmentInsight')

app.use('/insight/assessment',assessmentInsightsController)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})