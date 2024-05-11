const jwt = require("jsonwebtoken");
const ResponseBean = require("../databean/ResponseBean");
const ErrorBean = require("../databean/ErrorBean");

// Normally this should be .env
const TOKEN_SECRET = "Lucky" 

const getToken = (user) => {
  try {
    const accessToken = jwt.sign(user,TOKEN_SECRET,{expiresIn: '15m'});
    if(!accessToken){
      throw new Error("Error in generatin of access token")
    }
    return new ResponseBean(201,"CREATED",{token: accessToken});
  } catch (error) {
    console.log(new ErrorBean("getToken","JWT sign error",error));
    return new ResponseBean(500,"INTERNAL_ERROR",`Error: ${error}`);
  }
}

const authenticateToken = (req,res,next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
      res.status(400).json(new ResponseBean(400,"BAD_REQUEST","Token not found"));
      return;
    }
    jwt.verify(token,TOKEN_SECRET,function(err,user){
      if(err){
        console.log(err);
        res.status(401).json(new ResponseBean(401,"BAD_REQUEST","Token does not match or expired"));
        return;
      }
      else{
        req.user = user;
        next();
      }
    })
  } catch (error) {
    console.log(new ErrorBean("authenticateToken","May be JWT error in verifying",error));
    return new ResponseBean(500,"INTERNAL_ERROR",`Error: ${error}`);
  }
}

module.exports = {
  getToken,
  authenticateToken
}