require("dotenv").config()
const app = require("./src/app")
const connectTODB = require("./src/config/database")


connectTODB()
app.set("trust proxy", 1);

app.listen(3000,() => {
    console.log("server is running on port 3000")
})

