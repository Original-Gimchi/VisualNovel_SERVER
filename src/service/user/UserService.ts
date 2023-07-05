import {User} from "@src/domain/user/User";
import UserSignUpDto from "@service/user/UserSignUpDto";
import {UserRepository} from "@utils/database/Reposiotory";
import {SALT} from "@utils/env/env";

const bcrypt = require("bcrypt");


const SignUp = async (userDto: UserSignUpDto) => {
    const user: User = new User(userDto);

    user.password = await bcrypt.hash(userDto.password, Number(SALT));

    await UserRepository.save(user)

    return "success"
}

export default SignUp
