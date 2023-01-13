import mongoose from 'mongoose'

const MONGO_DB_URL = 'mongodb://localhost:27017/sharenergy'

export const connectToDatabase = async (mongoDatabaseURI = MONGO_DB_URL): Promise<typeof mongoose> =>
  await mongoose.connect(mongoDatabaseURI)
