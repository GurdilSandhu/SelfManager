const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/Bookroutes');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use("/books", router);


mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.l69zx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
).then(() => console.log("Connected to Database")
).then(() => {
    app.listen(5000)
}).catch(() => console.log(err));