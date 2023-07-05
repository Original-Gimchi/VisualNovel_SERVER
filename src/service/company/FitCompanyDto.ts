class FitCompanyDto {

    company!: string
    oneLineIntroduce!: string

    constructor(company: string, oneLineIntroduce: string) {
        this.company = company
        this.oneLineIntroduce = oneLineIntroduce
    }
}

export default FitCompanyDto