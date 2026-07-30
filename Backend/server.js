require("dotenv").config()
const app = require("./src/app")
const connectTODB = require("./src/config/database")
const PORT = process.env.PORT || 3000;

connectTODB();

app.set("trust proxy", 1);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
