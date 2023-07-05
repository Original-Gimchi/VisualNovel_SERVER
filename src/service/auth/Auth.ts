import {User} from "@src/domain/user/User";
import {UnAuthorizedException} from "@utils/exception/Exceptions";
import {findUserByEmailNotNull} from "@utils/database/Reposiotory";
import process from "process";
import UserSignInDto from "@service/auth/SignInDto";

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const signIn = async (userDto: UserSignInDto) => {
    const user: User = await findUserByEmailNotNull(userDto.email)

    if (user.password != bcrypt.hash(userDto.password, process.env.SALT)) {
        throw new UnAuthorizedException();
    }
    const token = jwt.sign(
        {email: user.email}, process.env.JWT_SECRET)
    return {token}
}

export default signIn
