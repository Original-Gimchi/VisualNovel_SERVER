import JasoDto from "@service/jaso/JasoDto";
import {Jaso} from "@src/domain/jaso/Jaso";
import {findJasoByIdNotNull, findJasoByUserId, findUserByIdNotNull, JasoRepository} from "@utils/database/Reposiotory";
import {ForbiddenException} from "@utils/exception/Exceptions";
import {User} from "@src/domain/user/User";

const saveJaso = async (jasoDto: JasoDto, userId: number) => {
    const jaso = new Jaso(jasoDto, userId)
    await JasoRepository.save(jaso);

    return jaso
}

const showJaso = async (userId: number) => {
    return await findJasoByUserId(userId)
}

const updateJaso = async (jasoId: number, jasoDto: JasoDto, userId: number) => {

    const jaso: Jaso = await findJasoByIdNotNull(jasoId)

    if (jaso.userId != userId) throw new ForbiddenException()
    else if (jaso.Share_Users && jaso.Share_Users.filter(user => user.id == userId).length < 0) throw new ForbiddenException()

    jaso.updateJaso(jasoDto)

    await JasoRepository.save(jaso);
    return jaso
}

const deleteJaso = async (jasoId: number, userId: number) => {
    const jaso: Jaso = await findJasoByIdNotNull(jasoId)

    if (jaso.userId != userId) throw new ForbiddenException()
    await JasoRepository.delete(jasoId)
    return "success"
}

const grantJaso = async (jasoId: number, userId: number, grantUserId: number) => {
    const jaso: Jaso = await findJasoByIdNotNull(jasoId)

    if (jaso.userId != userId) throw new ForbiddenException()

    if (grantUserId == userId) throw new ForbiddenException()
    const grantUser: User = await findUserByIdNotNull(grantUserId)

    !!jaso.Share_Users ? jaso.Share_Users.push(grantUser) : [grantUser]

    await JasoRepository.save(jaso)
    return "success"
}

export {
    saveJaso,
    showJaso,
    updateJaso,
    deleteJaso,
    grantJaso
}

