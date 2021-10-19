import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('nurse')
export class NurseEntity {
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
    specialization_id?: number;

    @ApiProperty()
    @Column()
    certificate?: string;

    @ApiProperty()
    @Column()
    work_experience?: number;


    @ApiProperty()
    @Column()
    user_id?: number;
    
    @ApiProperty()
    @Column()
    certificate_date_begin?: Date;

    @ApiProperty()
    @Column()
    certificate_date_end?: Date;

    @ApiProperty()
    @Column()
    post?: string;

    @ApiProperty({required: false})
    @Column()
    clinic_id?: number;

    @ApiProperty({required: false})
    @Column()
    doctor_id?: number;

    @ApiProperty()
    @Column()
    placement_id?: number;

    @ApiProperty()
    @Column()
    work_schedule_id?: number

}