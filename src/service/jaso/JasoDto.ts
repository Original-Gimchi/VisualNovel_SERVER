class JasoDto {

    title!: string
    oneLineIntroduce!: string
    jaso!: string


    constructor(oneLineIntroduce: string, jaso: string) {
        this.oneLineIntroduce = oneLineIntroduce;
        this.jaso = jaso;
    }
}

export default JasoDto