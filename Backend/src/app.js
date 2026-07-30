const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",
    "https://interview-ai-rho-rose.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

/* require all the routes here  */
const authRouter = require("./routes/auth.route")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here*/
app.use ("/api/auth", authRouter)
app.use ("/api/interview",interviewRouter)
module.exports = app