import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "5432"),
        dialect: "postgres",
        models: [__dirname + '/../models'],
        logging: process.env.NODE_ENV === "dev" ? console.log : false,
        define: {
            timestamps: true
        }
    }
)

async function initDB() {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to database');

        if (process.env.NODE_ENV === "dev") {
            await sequelize.sync({
                alter: true
            });

            console.log('Sequelize models has been synchronized');
        }

        return sequelize;
    }
    catch (err: any) {
        console.error("[Sequelize]", "Unable to connect", err);
        process.exit(1);
    }
}

export { sequelize, initDB }