import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('profiles')
export class ProfilesEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @Column()
    user_id?: number;

    @ApiProperty()
    @Column()
    profile_id?: number;

    @ApiProperty()
    @Column()
    profile_type?: string;

    @ApiProperty({required: false})
    @Column({default: true})
    active_sign?: boolean;
}