import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm"
import CompanySaveDto from "@service/company/CompanySaveDto";

@Entity()
export class Company {
    @PrimaryColumn()
    companyName!: string

    @Column("varchar", {nullable: false})
    keyword!: string

    @Column("varchar", {nullable: false})
    oneLineIntroduce!: string

    @Column("text", {nullable: false})
    allIntroduce!: string

    constructor(companySaveDto: CompanySaveDto, companyName: string) {
        if(!companySaveDto) return;

        this.companyName = companyName
        this.keyword = companySaveDto.keyword
        this.oneLineIntroduce = companySaveDto.oneLineIntroduce
        this.allIntroduce = companySaveDto.allIntroduce
    }
}