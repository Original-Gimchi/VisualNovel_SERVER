import {User} from "@src/domain/user/User";
import {InternalServerException} from "@utils/exception/Exceptions";
import {AppDataSource} from "@utils/database/Database";
import UserSignUpDto from "@service/user/UserSignUpDto";
import process from "process";
import {UserRepository} from "@utils/database/Reposiotory";

const bcrypt = require("bcrypt");


const signUp = async (userDto: UserSignUpDto) => {
    const user: User = new User(userDto);

    user.password = await bcrypt.hash(userDto.password, process.env.SALT);

    await UserRepository.save(user)
}

export default signUp
