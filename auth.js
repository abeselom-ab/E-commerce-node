const jwt = require('jsonwebtoken');
const config = require('./config/default.json');
const user = require('./src/model/user');
module.exports = (role) => async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ error: "Unauthorized access" });
    }   
    jwt.verify(token, config.get('private_key'), async function (err, decoded) {
        
        if (err) {
            let data={
                error:true ,
                message: 'Unauthorized Access!!!!!', 
                statusCode:401 ,
                data:null
            }
            res.send(data);
            // return res.json({ success: false, message: 'Unauthorized Access!. '+err.message });
        } else {
            try {
                const User = await user.findById( decoded._id ).lean();
                req.User = decoded;
                if (!User || !role.includes(User.role)) {
                    let data={
                        error:true ,
                        message: 'Unauthorized Access!!!!!', 
                        statusCode:401 ,
                        data:null
                    }
                   res.status(data.statusCode).send(data);
                   return ;
                }
                next()
            } catch (error) {
                console.log(error);
                let response = {
                    error:true,
                    message:error.message,
                    statusCode:500,
                    data:null
                };
                res.status(response.statusCode).send(response);
               return ;
            }
        }
    });
}