import { ApiProperty } from "@nestjs/swagger";

export class District {

    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    name?: string;

    @ApiProperty()
    city_id?: number;

}