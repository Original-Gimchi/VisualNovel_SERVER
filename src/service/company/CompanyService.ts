import {CompanyRepository} from "@utils/database/Reposiotory";
import {CreateCompany, ShowFitCompany} from "@service/GPT/GPTService";
import CompanySaveDto from "@service/company/CompanySaveDto";
import {Company} from "@src/domain/company/Company";


const saveCompany = async (companyName: string) => {
    const dto: CompanySaveDto = await CreateCompany(companyName)

    const company: Company = new Company(dto, companyName);
    await CompanyRepository.save(company)
    return company
}

const showOneCompany = async (companyName: string) => {
    return await CompanyRepository.findOneBy({companyName})
}

const showFitCompany = async (keyword: string) => {
    return ShowFitCompany(keyword);
}

export {
    saveCompany,
    showOneCompany,
    showFitCompany,
}