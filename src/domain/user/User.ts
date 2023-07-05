import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm"
import UserSignUpDto from "@service/user/UserSignUpDto";
import {Jaso} from "@src/domain/jaso/Jaso";

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

    @ManyToMany(() => Jaso, jaso => jaso.Share_Users)
    Shared_jaso?: Jaso[]

    constructor(dto: UserSignUpDto) {
        if (!dto) return;

        this.belonging = dto.belonging
        this.email = dto.email
        this.nickName = dto.nickName
    }
}