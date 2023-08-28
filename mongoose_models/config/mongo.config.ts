import mongoose from 'mongoose'
// require("dotenv").config();
require("dotenv").config()
console.log(process.env.DATABASE_URL)
const connect = () => {
    mongoose.connect(process.env.DATABASE_URL as string, {
        // useNewUrlParser: true,
        // useUnifiedTopology:true,
        tls: true
    })
    .then(()=>console.log("DB connected"))
    .catch((err: any )=>{
        console.log("Error occured while connectiong to DB");
        console.log(`Error: ${err}`);
    })
}

export default connect;