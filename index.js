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


app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')))
/* file uploading uising multer*/
// app.use(express.static("./src/uploads/"));
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
//const route = require(../route)
//app.use('/eCommerce/api, route)
app.get('/e-commerce/api/product/:id',productController.getOne);
app.get('/e-commerce/api/products/getAll',productController.getAll);
app.get('/e-commerce/api/products/getProducts',productController.getProducts);
app.post('/e-commerce/api/products/search',productController.search);

app.post('/e-commerce/api/products/add',upload.single('productImage'),productController.addProduct);
app.delete('/e-commerce/api/products/deleteProduct/:id',productController.deleteProduct);
app.put('/e-commerce/api/products/edit/:id',upload.single('productImage'),productController.updateProduct);

/*users routing*/
app.get('/e-commerce/api/users/getUsers',userController.getUsers);
app.get('/e-commerce/api/users/:id',userController.getOne);
app.post('/e-commerce/api/user/login',userController.login);
app.post('/e-commerce/api/users/add',upload.single('profilePicture'),userController.addUser);
app.delete('/e-commerce/api/users/deleteUser/:id',userController.deleteUser);
app.put('/e-commerce/api/users/updateUser/:id',upload.single('profilePicture'),userController.updateUser);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 