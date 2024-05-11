const express = require("express")
const { getAllProductsController, addProductController, getProductController, updateProductController, deleteProductController } = require("../controller/productController")
const { authenticateToken } = require("../middleware/jwtToken")

const router = express.Router()

router.get("/",authenticateToken,getAllProductsController)
router.post("/",authenticateToken,addProductController)
router.get("/:id",authenticateToken,getProductController)
router.put("/:id",authenticateToken,updateProductController)
router.delete("/:id",authenticateToken,deleteProductController)

module.exports = router