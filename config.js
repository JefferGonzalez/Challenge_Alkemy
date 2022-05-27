import {config} from "dotenv";

config()

export default {
    host: process.env.DB_HOST || '',
    database: process.env.DB_DATABASE || '',
    user: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || ''
}