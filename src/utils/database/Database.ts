import {DataSource} from "typeorm";
import process from "process";
import {User} from "@src/domain/user/User";
import {Jaso} from "@src/domain/jaso/Jaso";
import {Company} from "@src/domain/company/Company";

require('dotenv').config()

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [User, Jaso, Company],
    synchronize: true,
    logging: ["info", "error"],
    charset: "utf8mb4"
})

const DatabaseStart = () => {
    AppDataSource.initialize()
        .catch((error) => console.log(error))
}

export {
    DatabaseStart,
    AppDataSource
}