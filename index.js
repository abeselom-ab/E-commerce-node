const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const multer = require('multer');
const cors = require('cors');
const Auth = require('./auth');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* file uploading uising multer*/
app.use(express.static("./src/storage/uploads/"));
const multerU = require('./src/helper/multer');
const upload = multer({
    filefilter: multerU.fileFilter, 
    storage: multerU.storage,
});

const port = process.env.PORT || 3000;
const userController=require('./src/controller/userController');
const productController = require('./src/controller/productController');

 mongoose.connect('mongodb://localhost:27017/e-commerce');
app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

/* products routing */
app.get('/product/:id',productController.getOne);
app.get('/products/getAll',productController.getAll);
app.get('/products/getProducts',productController.getProducts);
app.post('/products/search',productController.search);

app.post('/product/add',upload.single('productImage'),productController.addProduct);
app.delete('/product/deleteProduct/:id',productController.deleteProduct);
app.put('/product/edit/:id',upload.single('productImage'),productController.updateProduct);

/*users routing*/
app.get('/user/getUsers',userController.getUsers);
app.get('/user/:id',userController.getOne);
app.post('/user/login',userController.login);
app.post('/user/add',upload.single('profilePicture'),userController.addUser);
app.delete('/user/deleteUser/:id',userController.deleteUser);
app.put('/user/updateUser/:id',upload.single('profilePicture'),userController.updateUser);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 