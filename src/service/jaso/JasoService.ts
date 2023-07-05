import JasoDto from "@service/jaso/JasoDto";
import {Jaso} from "@src/domain/jaso/Jaso";
import {findJasoByIdNotNull, findJasoByUserId, JasoRepository} from "@utils/database/Reposiotory";
import {ForbiddenException} from "@utils/exception/Exceptions";

const bcrypt = require("bcrypt");


const saveJaso = async (jasoDto: JasoDto, userId: number) => {
    await JasoRepository.save(new Jaso(jasoDto, userId));
}

const showJaso = async (userId: number) => {
    return await findJasoByUserId(userId)
}

const updateJaso = async (jasoId: number, jasoDto: JasoDto, userId: number) => {
    const jaso: Jaso = await findJasoByIdNotNull(jasoId)

    if (jaso.userId != userId) throw new ForbiddenException()

    return await JasoRepository.save(jaso);
}

const deleteJaso = async (jasoId: number, userId: number) => {
    const jaso: Jaso = await findJasoByIdNotNull(jasoId)

    if (jaso.userId != userId) throw new ForbiddenException()

    return await JasoRepository.delete(jasoId)
}

