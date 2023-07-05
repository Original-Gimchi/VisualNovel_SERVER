import {User} from "@src/domain/user/User";
import {InternalServerException} from "@utils/exception/Exceptions";
import {AppDataSource} from "@utils/database/Database";
import UserSignUpDto from "@service/user/UserSignUpDto";
import process from "process";
import JasoDto from "@service/jaso/JasoDto";
import {Jaso} from "@src/domain/jaso/Jaso";
import {findJasoByIdNotNull, findJasoByUserId, JasoRepository} from "@utils/database/Reposiotory";

const bcrypt = require("bcrypt");


const saveJaso = async (jasoDto: JasoDto, userId: number) => {
    await JasoRepository.save(new Jaso(jasoDto, userId));
}

const showJaso = async (userId: number) => {
    return await findJasoByUserId(userId)
}

const updateJaso = async (jasoId: number, jasoDto: JasoDto) => {
    const jaso: Jaso = await findJasoByIdNotNull(jasoId)

    await JasoRepository.save(jaso);
}

const deleteJaso = async (jasoId: number) => {
    return await JasoRepository.delete(jasoId)
}

