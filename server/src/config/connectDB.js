import mongoose from "mongoose";

export async function ConnectDB(){
    const mongo_conn_string=process.env.MONGO_URI;
    if(!mongo_conn_string){
        console.error("mongo connection string not delivered");
        process.exit(1);
    }
    try{
        const conn=await mongoose.connect(mongo_conn_string);
        console.log(`DB connected successfully\n${conn.connection.host} `);
    }catch(err){
        console.error(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    }
}