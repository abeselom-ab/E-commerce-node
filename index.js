const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* file uploading uising multer*/
app.use(express.static("./src/storage/uploads/"));
const multerU = require('./src/helper/multer');
const upload = multer({
    filefilter: multerU.fileFilter, 
    storage: multerU.storage,
});

const port = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/e-commerce');
app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }); 