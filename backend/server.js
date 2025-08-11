import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import mongoose from 'mongoose'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// App config
const app = express()
const port = process.env.PORT || 4000

// Connect DB & Cloudinary
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/admin/user',userRouter)
// app.use('/api/user',userRouter)

app.get('/', (req, res) => {
    res.send("API Working");
})

app.listen(port, () => console.log("✅ Server running on port", port))



//app config
// const app=express()
// const port=process.env.PORT || 4000
// connectDB()
// connectCloudinary()
// //middleware
// app.use(express.json())
// app.use(cors())

// // const TestSchema = new mongoose.Schema({ name: String });
// // const Test = mongoose.model("Test", TestSchema);
// //api endpoints
// app.use('/api/admin',adminRouter)


// app.get('/',(req,res)=>{
//     res.send("API Working ");
// })
// app.listen(port, ()=> console.log("Server is running on ", port))

// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'
