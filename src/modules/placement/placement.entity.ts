import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('placement')
export class PlacementEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;
    
    @ApiProperty()
    @Column()
    district_id?: number;

    @ApiProperty()
    @Column({default: 1})
    region_id?: number;

    @ApiProperty()
    @Column({default: 1})
    country_id?: number;

    @ApiProperty()
    @Column()
    city_id?: number;

    @ApiProperty()
    @Column()
    street?: string;

    @ApiProperty()
    @Column({default: 2})
    street_type_id?: number;

    @ApiProperty({required: false})
    @Column({default: 0})
    index?: number;

    @ApiProperty({required: false})
    @Column({default: ''})
    room?: string;

    @ApiProperty({required: false})
    @Column({default: ''})
    home?: string;

    @ApiProperty({required: false})
    @Column({default: 0})
    coordinate_latitude?: number;

    @ApiProperty({required: false})
    @Column({default: 0})
    coordinate_longitude?: number;

    @ApiProperty({required: false})
    @Column({default: true})
    active_sign?: boolean;

}