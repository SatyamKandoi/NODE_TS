//Import the mongoose module
import mongoose from "mongoose";
import { DataBaseError } from "../errors/database-error";
class Database { // Singleton
        connection = mongoose.connection;

        constructor() {
                try {
                        this.connection
                                .on('open', console.info.bind(console, 'Database connection: open'))
                                .on('close', console.info.bind(console, 'Database connection: close'))
                                .on('disconnected', console.info.bind(console, 'Database connection: disconnecting'))
                                .on('disconnected', console.info.bind(console, 'Database connection: disconnected'))
                                .on('reconnected', console.info.bind(console, 'Database connection: reconnected'))
                                .on('fullsetup', console.info.bind(console, 'Database connection: fullsetup'))
                                .on('all', console.info.bind(console, 'Database connection: all'))
                                .on('error', () => {
                                        console.error.bind(console, 'MongoDB connection: error:')
                                        process.exit(0)
                                });
                } catch (error) {
                        throw new DataBaseError("Connection Failed", "ERR_CONNECTING_DB")
                }
        }

        async connect() {
                try {
                        await mongoose.connect(
                                process.env.MONGO_URL as string
                        );
                } catch (error) {
                        console.error(error);
                }
        }

        async close() {
                try {
                        await this.connection.close();
                } catch (error) {
                        console.error(error);
                }
        }
}

const database = new Database()

export { database }