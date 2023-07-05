import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"
import JasoDto from "@service/jaso/JasoDto";

@Entity()
export class Jaso {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column("varchar", {nullable: false})
    oneLineIntroduce!: string

    @Column("text", {nullable: false})
    jaso!: string

    @Column()
    userId!: number

    constructor(jasoDto: JasoDto, userId: number) {
        if(!jasoDto) return;

        this.oneLineIntroduce = jasoDto.oneLineIntroduce
        this.jaso = jasoDto.jaso
    }

    updateJaso(jasoDto: JasoDto) {
        this.oneLineIntroduce = jasoDto.oneLineIntroduce
        this.jaso = jasoDto.jaso
    }
}