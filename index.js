const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const port=process.env.PORT || 3000;
mongoose.set('strictQuery', false);

const cont=require('./controller/controller')

app.use('/',cont)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})