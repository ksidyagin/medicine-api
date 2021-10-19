import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole, UserStatus } from "./user.interface";


@Entity('users')
export class UserEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;
    

    @ApiProperty()
    @Column()
    email?: string;

    @ApiProperty()
    @Column()
    password?: string;

    @ApiProperty()
    @Column({default: null})
    phone?: string;

    @ApiProperty()
    @Column({default: true})
    active_sign?: boolean;
    
    @ApiProperty()
    @Column({default: ''})
    verify_code?: string;

    // @ApiProperty()
    // @Column({type: 'enum', enum: UserStatus, default: UserStatus.pending })
    // status?: UserStatus;

}