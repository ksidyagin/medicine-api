import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('patient')
export class PatientEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @Column()
    first_name?: string;

    @ApiProperty()
    @Column()
    last_name?: string;

    @ApiProperty()
    @Column()
    patronymic?: string;

    @ApiProperty()
    @Column()
    age?: number;

    @ApiProperty()
    @Column()
    sex?: boolean;

    @ApiProperty()
    @Column()
    date_birth?: Date;

    @ApiProperty()
    @Column()
    profile_id?: number;

    @ApiProperty()
    @Column()
    user_id?: number;
    
    @ApiProperty()
    @Column()
    placement_id?: number;

    @ApiProperty({required: false})
    @Column()
    clinic_id?: number;

    @ApiProperty()
    @Column()
    snils?: string;

}