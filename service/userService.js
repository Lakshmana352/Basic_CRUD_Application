const users = {}
const ResponseBean = require("../databean/ResponseBean")
const ErrorBean = require("../databean/ErrorBean")

const addUser = (user)=>{
  try {
    users[user.username] = user;
    return new ResponseBean(201,"CREATED",user)
  } catch (error) {
    console.log(new ErrorBean("addUser","",error));
    return new ResponseBean(500,"INTERNAL_ERROR",{error:error})
  }
}

const getUser = (username)=>{
  try {
    if(users.hasOwnProperty(username)){
      return new ResponseBean(200,"OK",users[username])
    }
    return new ResponseBean(404,"NOT_FOUND","User not found with given username")
  } catch (error) {
    console.log(new ErrorBean("getUser","",error));
    res.status(500).json(new ResponseBean(500,"INTERNAL_ERROR",{error:error}))
  }
}

module.exports = {
  addUser,
  getUser
}