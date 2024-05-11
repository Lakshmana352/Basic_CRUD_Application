const ErrorBean = require("../databean/ErrorBean");
const ResponseBean = require("../databean/ResponseBean");

const productsDb = {
  "Vivo_S1_Pro":{
    name : "Vivo_S1_Pro",
    description: "Mobile of latest",
    price: "20000"
  }
}

const addProduct = (product) => {
  if(productsDb.hasOwnProperty(product.name)){
    return new ResponseBean(400,"BAD_REQUEST","Product with given name already exists")
  }
  productsDb[product.name] = product;
  return new ResponseBean(201,"CREATED","Added the product successfully")
}

const getAllProducts = () => {
  try {
    return new ResponseBean(200,"OK",productsDb)
  } catch (error) {
    console.log(new ErrorBean("getAllProducts","internal error",error));
    return new ResponseBean(500,"INTERNAL_ERROR",{error:error})
  }
}

const getProduct = (productName) => {
  try {
    if(productsDb.hasOwnProperty(productName)){
      return new ResponseBean(200,"OK",productsDb[productName])
    }
    return new ResponseBean(404,"NOT_FOUND","product not found")
  } catch (error) {
    console.log(new ErrorBean("getProduct","internal error",error));
    return new ResponseBean(500,"INTERNAL_ERROR",{error:error})
  }
}

const deleteProduct = (productName) => {
  try {
    if(productsDb.hasOwnProperty(productName)){
      delete productsDb[productName]
      return new ResponseBean(200,"OK",`Product with id ${productName} successfully deleted`)
    }
    return new ResponseBean(404,"NOT_FOUND","product not found")
  } catch (error) {
    console.log(new ErrorBean("deleteProduct","internal error",error));
    return new ResponseBean(500,"INTERNAL_ERROR",{error:error})
  }
}

const updateProduct = (productName,product) => {
  try {
    if(productsDb.hasOwnProperty(productName)){
      if(productName.hasOwnProperty(product.name)){
        return new ResponseBean(200,"OK",`Product already exists with id ${product.name}`)
      }
      delete productsDb[productName]
      productsDb[product.name] = product
      return new ResponseBean(200,"OK",`Product with id ${product.name} successfully updated`)
    }
    return new ResponseBean(404,"NOT_FOUND","product not found")
  } catch (error) {
    console.log(new ErrorBean("updateProduct","internal error",error));
    return new ResponseBean(500,"INTERNAL_ERROR",{error:error})
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
}