import JasoDto from "@service/jaso/JasoDto";
import {Jaso} from "@src/domain/jaso/Jaso";
import {findJasoByIdNotNull, findJasoByUserId, JasoRepository} from "@utils/database/Reposiotory";
import {ForbiddenException} from "@utils/exception/Exceptions";

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
    await JasoRepository.save(jaso);
    return jaso
}

const deleteJaso = async (jasoId: number, userId: number) => {
    const jaso: Jaso = await findJasoByIdNotNull(jasoId)

    if (jaso.userId != userId) throw new ForbiddenException()
    await JasoRepository.delete(jasoId)
    return "success"
}

export {
    saveJaso,
    showJaso,
    updateJaso,
    deleteJaso
}

