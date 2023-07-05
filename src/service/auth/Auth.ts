import {User} from "@src/domain/user/User";
import {UnAuthorizedException} from "@utils/exception/Exceptions";
import {findUserByEmailNotNull} from "@utils/database/Reposiotory";
import UserSignInDto from "@service/auth/SignInDto";
import {JWT_SECRET} from "@utils/env/env";

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const signIn = async (userDto: UserSignInDto) => {
    const user: User = await findUserByEmailNotNull(userDto.email)

    if (!await bcrypt.compare(userDto.password, user.password)) {
        throw new UnAuthorizedException();
    }
    const token = jwt.sign(
        {email: user.email}, JWT_SECRET)
    return {token}
}

export default signIn
