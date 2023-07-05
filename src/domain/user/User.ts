import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column({nullable: true})
    belonging!: string

    @Column("varchar", {nullable: false, length: 32})
    email!: String

    @Column("varchar", {nullable: false, length: 32})
    nickName!: String

    @Column("varchar", {nullable: false})
    password!: String
}