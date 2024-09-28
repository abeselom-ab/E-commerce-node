const user = require('../model/user');
const secretKey = require('../../config/default.json');
const jwt = require('jsonwebtoken')
module.exports={
    async getOne(req,res){
        console.log(req.params.id);
        let response=await user.find({_id:req.params.id});
        // console.log(response)
        res.send(response);
    },
    async getUsers(req,res){
        let response= await user.find();
        res.send(response);
    },
    async addUser(req,res){
        // console.log(req.files);
        const {file}=req
        console.log(file);
               if(req.file){      
                     req.body.profilePicture=req.file.originalname;                 
               }
               console.log(req.body);     
        try {
       let response= await user.create(req.body);
       console.log('User Registered'+response);
       res.send(response);
    } catch (error) {
        res.send(error);
        console.log(error.message);
    }
       
    },
    async deleteUser(req,res){
       try {
        let response=await user.findOneAndDelete({_id:req.params.id});
        res.send(response);
       } catch (error) {
        res.send(error.message);
       }
    },
    async updateUser(req,res){
        const {file}=req
        console.log(file);
               if(req.file){      
                     req.body.profilePicture=req.file.originalname;                 
               }
               console.log(req.body);
        try {
        let response=await user.updateOne({_id:req.params.id},req.body);
        console.log("User updated Successfuly"+response);
        res.send(response);
        } catch (error) {
            res.send(error.message);
        }
    },

 // Replace with a secure secret key

async login(req,res){

    // console.log("Email: ", req.body.email);
    // console.log("Password: ", req.body.password);
    let User = await user.findOne({email: req.body.email})
    console.log(User)
        if(User ==null ){
            res.json( {
                error: true,
                status: 401,
                message: "Invalid credentials"
            })
        }else{
           if(req.body.password !== User.password){
                console.log("user is invalid")
                res.json( {
                    error: true,
                    status: 401,
                    message: "Invalid credentials"
                })
            }
            else{
                console.log("Hello User")
                res.json( {
                    error: false,
                    status: 200,
                    role: User.role,
                    message: "user is credential"
                });
            }  
        }
   
    // const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    //     const token = jwt.sign({ username: user.username, role: user.role }, secretKey.get('private_key'), { expiresIn: '1h' });
    //     console.log("token: ", token);
    //     return {
    //         error: false,
    //         user,
    //         message: "Logged in successfully"
    //     }
}

    
}