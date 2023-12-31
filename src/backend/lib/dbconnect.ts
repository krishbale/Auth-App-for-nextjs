import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

 const dbConnect = async () => {
  try {
    if(connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URL!);
    connection.isConnected = db.connections[0].readyState;
  } catch (error:unknown) {
    const message = typeof error === 'string' ? error : 'An unknown error occurred';
    console.log(message);
    throw new Error(message);
  }
};
export default dbConnect;