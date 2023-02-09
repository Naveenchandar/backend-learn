const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(`${process.env.DB_URL}${process.env.DATABASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`DB Connected`);
    } catch (error) {
        console.error("============================ MONGO DB CONNECTION ERROR ==================================", error);
    }
}

module.exports = { connectDb };