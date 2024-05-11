const express = require("express")
const { authenticateToken } = require("./middleware/jwtToken")

const app = express()
app.use(express.json())

// app.use("/",(req,res)=>{
//   res.status(200).json({message: "Home Page"})
// })
app.use("/user",require("./routes/userRoutes"))
app.use("/products",require("./routes/productRoutes"))

app.listen(8080,()=>{
  console.log(`Server is running successfully......`);
})