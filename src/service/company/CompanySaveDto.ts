class CompanySaveDto {

    keyword!: string
    oneLineIntroduce!: string
    allIntroduce!: string

    constructor(keyword: string, oneLineIntroduce: string, allIntroduce: string) {
        this.keyword = keyword
        this.oneLineIntroduce = oneLineIntroduce
        this.allIntroduce = allIntroduce
    }
}

export default CompanySaveDto