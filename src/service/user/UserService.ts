import {User} from "@src/domain/user/User";
import {InternalServerException} from "@utils/exception/Exceptions";
import {AppDataSource} from "@utils/database/Database";


const signUp = async (userDto: UserSignUpDto) => {
    try {
        const user: User = new User(userDto);

        await AppDataSource.manager.save(user);
    } catch (error) {
        console.error('Error from saving user in DB:', error);
        throw new InternalServerException()
    }
}

export default signUp
