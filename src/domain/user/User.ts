import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column({nullable: true})
    belonging!: string

    @Column("varchar", {nullable: false, length: 32})
    email!: string

    @Column("varchar", {nullable: false, length: 32})
    nickName!: string

    @Column("varchar", {nullable: false})
    password!: string

    constructor(dto:UserSignUpDto) {
        this.belonging = dto.belonging
        this.email = dto.email
        this.nickName = dto.nickName
        this.password = dto.password
    }
}