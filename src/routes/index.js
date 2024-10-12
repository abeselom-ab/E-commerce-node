const express = require("express");


const router = express.Router();

router.get('/product/:id', productController.getOne)