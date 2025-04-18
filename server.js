import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import cors from "cors";
dotenv.config()
const app = express()

connectDB()


//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/payment", paymentRoutes)


app.get("/", (req, res) => {
    res.send({
        message: "<h1>welcome to ecommerce app</h1>"
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.bgBlue.white)
})