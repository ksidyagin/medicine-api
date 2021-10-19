import { ApiProperty } from "@nestjs/swagger";

export class User {

    @ApiProperty({required: false})
    id?: number;


    @ApiProperty()
    email?: string;

    @ApiProperty()
    password?: string;

    @ApiProperty({required: false})
    phone?: string;

    @ApiProperty({required: false})
    active_sign?: boolean;

    @ApiProperty({required: false})
    verify_code?: string;

}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    EXECUTOR = 'executor',
    MANAGER = 'manager',
    SUPERADMIN = 'superadmin'
}

export enum UserStatus {
    blocked = 'blocked',
    pending = 'pending',
    active = 'active'
}