import { ApiProperty } from "@nestjs/swagger";

export class City {

    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    region_id?: number;

    @ApiProperty()
    name?: string;

    @ApiProperty({required: false})
    city_type?: string;

    @ApiProperty({required: false})
    city_kladr_id?: string;
    
    @ApiProperty({required: false})
    city_flas_id?: string;

}