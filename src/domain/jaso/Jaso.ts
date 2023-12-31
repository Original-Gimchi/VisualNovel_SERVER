import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm"
import JasoDto from "@service/jaso/JasoDto";
import {User} from "@src/domain/user/User";

@Entity()
export class Jaso {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column("varchar", {nullable: false})
    title!: string

    @Column("varchar", {nullable: false})
    oneLineIntroduce!: string

    @Column("text", {nullable: false})
    jaso!: string

    @Column()
    userId!: number

    @ManyToMany(() => User, user => user.Shared_jaso)
    @JoinTable()
    Share_Users?: User[]

    constructor(jasoDto: JasoDto, userId: number) {
        if (!jasoDto) return;

        this.title = jasoDto.title
        this.oneLineIntroduce = jasoDto.oneLineIntroduce
        this.jaso = jasoDto.jaso
        this.userId = userId
    }

    updateJaso(jasoDto: JasoDto) {
        this.title = jasoDto.title
        this.oneLineIntroduce = jasoDto.oneLineIntroduce
        this.jaso = jasoDto.jaso
    }
}