import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('region')
export class RegionEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @Column()
    name?: string;

    @ApiProperty()
    @Column()
    region_type?: string;

    @ApiProperty()
    @Column()
    region_type_full?: string;

}