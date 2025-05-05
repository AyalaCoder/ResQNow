const express=require ("express")
const cors = require("cors")
const bcrypt = require("cors")

const mongoose=require("mongoose")
require ("dotenv").config()

const connectDB=require ("./config/dbConn")
const corsOptions=require("./config/corsOption")
const userRoutes=require("./routes/userRoutes")
const emergencyRoutes=require("./routes/emergencyRoutes")
const callHistoryRoutes=require("./routes/callHistoryRoutes")
const notificationRoutes=require("./routes/notificationRoutes")
const authRouter=require ("./routes/authRouter")
const bodyParser = require('body-parser'); 

const app=express()

const PORT=process.env.PORT||1234
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.json());

app.use('/user',userRoutes)
app.use('/emergency',emergencyRoutes)
// app.use('/callHistory',callHistoryRoutes)
// app.use('/notification',notificationRoutes)
app.use('/auth',authRouter)
app.use('/emergency',emergencyRoutes)
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
    })
    mongoose.connection.on('error', err => {
    console.log(err)
    }
)

