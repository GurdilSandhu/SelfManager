const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/Bookroutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use("/books", router);

const PORT = process.env.PORT || 5000;

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.l69zx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => {
  console.log("Connected to Database");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => console.log(err));
