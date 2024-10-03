const product=require('../model/product.js');
module.exports={
    async getAll(req,res){
        let response= await product.find()//select * from product tabel
        res.send(response);
    },
    async getProducts(req,res){
        let response= await product.find({}, 'productName productImage')//select productName and productImage from product tabel
        res.send(response);
    },
    async search(req,res){
        console.log(req.body);
        try {
             let response= await product.find({productName:req.body.searchInput},  'productName productImage');
            res.send(response);
        } catch (error) {
            res.send(error.message);
        }
       
    },
    async getOne(req,res){
        let response = await product.find({_id:req.params.id});
        res.send(response);
    },
    async addProduct(req,res){     
      const {file}=req
          if(req.file){
            req.body.productImage=req.file.originalname;
          }
       console.log(req.body)
        
        try {
           let response = await product.create(req.body);
           console.log("Product Added Successfuly"+response);
           res.send(response);
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    },
    async deleteProduct(req,res){
        try {
            let id=req.params.id;
        let response = await product.findOneAndDelete({_id:id});
        res.send(response);
        } catch (error) {
            res.send(error.message);
        }
        
    },
    async updateProduct(req,res){
        if(req.file){
            req.body.productImage=req.file.originalname;
          }
        try {
            let response =await product.updateOne({_id:req.params.id},req.body);
            res.send(response);
        } catch (error) {
            res.send(error.message);
        }
        
    }
}