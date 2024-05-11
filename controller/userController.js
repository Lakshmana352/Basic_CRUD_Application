const bcrypt = require("bcrypt")
const userValidator = require("../validator/userValidator")
const ResponseBean = require("../databean/ResponseBean")
const ErrorBean = require("../databean/ErrorBean")
const { getToken } = require("../middleware/jwtToken")
const { getUser, addUser } = require("../service/userService")

const signUp = async(req,res)=>{
  try {
    const user = req.body
    userValidator.validate(user)
    const checkUser = getUser(user.username)
    if(checkUser.code != 404){
      res.status(checkUser.code).json(checkUser);
      return;
    }
    // SALT should be in .env
    user.password = await bcrypt.hash(user.password,12)
    const addedUser = addUser(user)
    if(addedUser.code != 201){
      throw new Error(addedUser.response)
    }
    res.status(201).json(new ResponseBean(201,"CREATED",{username: user.username}));
    return;
  } catch (error) {
    console.log(new ErrorBean("signUp","Bcrypt or addedUser error may be",error));
    res.status(500).json(new ResponseBean(500,"INTERNAL_ERROR",error))
  }
}

const signIn = async(req,res)=>{
  try {
    const user = req.body
    userValidator.validate(user)
    const checkUser = getUser(user.username)
    if(checkUser.code != 200){
      res.status(checkUser.code).json(checkUser);
      return;
    }
    if(!(await bcrypt.compare(user.password,checkUser.response.password))){
      res.status(400).json(new ResponseBean(400,"BAD_REQUEST","Password does not match"))
      return;
    }
    const token = getToken(user)
    if(token.code != 201){
      throw new Error(token.response)
    }
    res.status(200).json(new ResponseBean(200,"OK",token.response))
    return
  } catch (error) {
    console.log(new ErrorBean("signUp","Bcrypt error may be",error));
    res.status(500).json(new ResponseBean(500,"INTERNAL_ERROR",{error:error}))
  }
}

module.exports = {
  signIn,
  signUp
}