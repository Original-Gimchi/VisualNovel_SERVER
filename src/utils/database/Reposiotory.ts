import {AppDataSource} from "@utils/database/Database";
import {Jaso} from "@src/domain/jaso/Jaso";
import {User} from "@src/domain/user/User";
import {UnAuthorizedException} from "@utils/exception/Exceptions";

const UserRepository = AppDataSource.getRepository(User)
const JasoRepository = AppDataSource.getRepository(Jaso)


const findUserByIdNotNull = async (id: number) => {
    return (await UserRepository.findOneBy({id})) ?? (() => { throw new UnAuthorizedException(); })();
}

const findUserByEmailNotNull = async (email: string) => {
    return (await UserRepository.findOne({
        where: {
            email: email
        }
    })) ?? (() => { throw new UnAuthorizedException(); })();
}

const findJasoByUserId = async (userId: number) => {
    return (await JasoRepository.find({
        where: {
            userId: userId
        }
    })) ?? (() => { throw new UnAuthorizedException(); })();
}

const findJasoByIdNotNull = async (id: number) => {
    return (await JasoRepository.findOneBy({id})) ?? (() => { throw new UnAuthorizedException(); })();
}

export {
    UserRepository,
    JasoRepository,
    findUserByIdNotNull,
    findUserByEmailNotNull,
    findJasoByUserId,
    findJasoByIdNotNull,
}