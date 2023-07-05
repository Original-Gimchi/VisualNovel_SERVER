class JasoDto {

    title!: string
    oneLineIntroduce!: string
    jaso!: string


    constructor(title: string, oneLineIntroduce: string, jaso: string) {
        this.title = title;
        this.oneLineIntroduce = oneLineIntroduce;
        this.jaso = jaso;
    }
}

export default JasoDto