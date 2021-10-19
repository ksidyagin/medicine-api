import { ApiProperty } from "@nestjs/swagger";

export class Patient {

    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    first_name?: string;

    @ApiProperty()
    last_name?: string;

    @ApiProperty()
    patronymic?: string;

    @ApiProperty()
    age?: number;

    @ApiProperty()
    sex?: boolean;

    @ApiProperty()
    date_birth?: Date;

    @ApiProperty()
    profile_id?: number;

    @ApiProperty()
    user_id?: number;
    
    @ApiProperty()
    placement_id?: number;

    @ApiProperty({required: false})
    clinic_id?: number;

    @ApiProperty()
    snils?: string;

}
