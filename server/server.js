const app = require("./src/app.js");
const dotenv = require("dotenv");

dotenv.config("/.env");


app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
})