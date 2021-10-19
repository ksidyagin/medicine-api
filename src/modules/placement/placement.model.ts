import { ApiProperty } from "@nestjs/swagger";

export class Placement {

    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    district_id?: number;

    @ApiProperty()
    region_id?: number;

    @ApiProperty()
    country_id?: number;

    @ApiProperty()
    city_id?: number;

    @ApiProperty()
    street?: string;

    @ApiProperty()
    street_type_id?: number;

    @ApiProperty({required: false})
    index?: number;

    @ApiProperty({required: false})
    room?: string;

    @ApiProperty({required: false})
    home?: string;

    @ApiProperty({required: false})
    coordinate_latitude?: number;

    @ApiProperty({required: false})
    coordinate_longitude?: number;

    @ApiProperty({required: false})
    active_sign?: boolean;
}
