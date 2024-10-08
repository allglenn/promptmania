import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    console.log("connecting to database");
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("using existing database connection");
        return;
    }

    try {
        console.log("using new database connection");
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "promptmania"
        });

        isConnected = db.connections[0].readyState; 
        console.log("Connected to database");
    }
    catch (err) {
        console.log(err)
    }
}