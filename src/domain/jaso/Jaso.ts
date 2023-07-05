import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Jaso {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column("varchar", {nullable: false})
    oneLineIntroduce!: string

    @Column("text", {nullable: false})
    jaso!: string
}