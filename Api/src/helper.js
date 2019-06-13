const jwt=require('jsonwebtoken')
const hiddendata=require('../../secret')
const secret=hiddendata.secret;





const generate_token= function generate_token(user_id, user_password, user_email){
    return jwt.sign({
        _id: user_id,
        password: user_password,
        email:user_email,
        expiresIn: 86400 
    },secret)
}




let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    if (token.startsWith('Bearer ')) {
      
      token = token.slice(7, token.length);
    }
  
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
       return res.status(500).send({ auth:false,message:"Failed to authenticate token"})
        } else {
        req.userId = decoded._id;
        
          next();
        }
      });
    } else {
       return  res.status(403).send({auth:null, message:"Auth token is not provided"})
    }
  };
  
  module.exports = {
    checkToken: checkToken,
    generate_token
  }




