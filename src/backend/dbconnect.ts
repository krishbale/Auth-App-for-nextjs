import mongoose, { Mongoose } from "mongoose";

// Define the type for the cached structure
interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the NodeJS.Global interface
declare global {
  namespace NodeJS {
    interface Global {
      mongooseCache?: Cached;
    }
  }
}

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Initialize or retrieve the cached connection object
interface GlobalWithMongooseCache extends NodeJS.Global {
    mongooseCache?: Cached;
}

let cached = (global as GlobalWithMongooseCache).mongooseCache ?? { conn: null, promise: null };

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

// Update the global cache after

export default dbConnect;