import { ApiProperty } from "@nestjs/swagger";

export class Region {

    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    name?: string;

    @ApiProperty()
    region_type?: string;

    @ApiProperty()
    region_type_full?: string;


}