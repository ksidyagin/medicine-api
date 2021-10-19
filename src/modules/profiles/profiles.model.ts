import { ApiProperty } from "@nestjs/swagger";

export class Profiles {

    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    user_id?: number;

    @ApiProperty()
    profile_id?: number;

    @ApiProperty()
    profile_type?: string;

    @ApiProperty({required: false})
    active_sign?: boolean;
}
