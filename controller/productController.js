const ResponseBean = require("../databean/ResponseBean")
const ErrorBean = require("../databean/ErrorBean")
const productValidator = require("../validator/productValidator")
const { getProduct, addProduct, deleteProduct, getAllProducts, updateProduct } = require("../service/productService")

const addProductController = async(req,res)=>{
  try {
    const product = req.body
    productValidator.validate(product)
    const checkProduct = getProduct(product.name)
    if(checkProduct == 200){
      res.status(400).json(new ResponseBean(400,"BAD_REQUEST","Product already exists"))
      return;
    }
    if(checkProduct.code != 404){
      throw new Error(checkProduct.response)
    }
    const addedProduct = addProduct(product)
    res.status(addedProduct.code).json(addedProduct)
    return;
  } catch (error) {
    console.log(new ErrorBean("addProductController","internal error",error));
    res.status(500).json(new ResponseBean(500,"INTERNAL_ERROR",{error}))
  }
}

const deleteProductController = async(req,res)=>{
  try {
    const id = req.params.id
    if(!id){
      res.status(400).json(new ResponseBean(400,"BAD_REQUEST","Id is not provided in url"))
      return;
    }
    const resp = deleteProduct(id)
    res.status(resp.code).json(resp.response)
  } catch (error) {
    console.log(new ErrorBean("deleteProductController","internal error",error));
    res.status(500).json(new ResponseBean(500,"INTERNAL_ERROR",{error:error}))
  }
}

const updateProductController = async(req,res) => {
  try {
    const id = req.params.id
    const product = req.body
    if(!id){
      res.status(400).json(new ResponseBean(400,"BAD_REQUEST","Id is not provided in url"))
      return;
    }
    const resp = updateProduct(id,product)
    res.status(resp.code).json(resp.response)
  } catch (error) {
    console.log(new ErrorBean("updateProductController","internal error",error));
    res.status(500).json(new ResponseBean(500,"INTERNAL_ERROR",{error:error}))
  }
}

const getProductController = async(req,res) => {
  try {
    const id = req.params.id
    if(!id){
      res.status(400).json(new ResponseBean(400,"BAD_REQUEST","Id is not provided in url"))
      return;
    }
    const resp = getProduct(id)
    res.status(resp.code).json(resp)
  } catch (error) {
    console.log(new ErrorBean("getProductController","internal error",error));
    res.status(500).json(new ResponseBean(500,"INTERNAL_ERROR",{error:error}))
  }
}

const getAllProductsController = async(req,res) => {
  try {
    const resp = getAllProducts()
    res.status(resp.code).json(resp.response)
  } catch (error) {
    console.log(new ErrorBean("getProductController","internal error",error));
    res.status(500).json(new ResponseBean(500,"INTERNAL_ERROR",{error:error}))
  }
}

module.exports = {
  addProductController,
  deleteProductController,
  updateProductController,
  getAllProductsController,
  getProductController
}