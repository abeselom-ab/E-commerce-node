const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/e-commerce');
app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }); 