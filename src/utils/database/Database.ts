import {DataSource} from "typeorm";
import process from "process";
import {User} from "@src/domain/user/User";
require('dotenv').config()

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [User],
    synchronize: true,
    logging: ["info","error"],
    charset: "utf8mb4"
})

const DatabaseStart = () => {
    AppDataSource.initialize()
        .then(() => {
            const user = new User()
            user.email = "jasoservicewillbeking@gmail.com";
            user.belonging = "부산소프트웨어마이스터고";
            user.nickName = "이창보킹갓제너럴";
            user.password = "iu123hrfkodsasdkfasdjkfhasjkfhaskfhasdkjfas"
            AppDataSource.manager.save(user)
        })
        .catch((error) => console.log(error))
}

export {
    DatabaseStart,
    AppDataSource
}