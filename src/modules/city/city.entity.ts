import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('city')
export class CityEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @Column()
    region_id?: number;

    @ApiProperty()
    @Column()
    name?: string;

    @ApiProperty({required: false})
    @Column({default: 'город'})
    city_type?: string;

    @ApiProperty({required: false})
    @Column({default: ''})
    city_kladr_id?: string;
    
    @ApiProperty({required: false})
    @Column({default: ''})
    city_flas_id?: string;

}