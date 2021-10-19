import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";


export class Nurse {
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
         first_name?: string;

    @ApiProperty()
         last_name?: string;

    @ApiProperty()
         patronymic?: string;

    @ApiProperty()
         specialization_id?: number;

    @ApiProperty()
         certificate?: string;

    @ApiProperty()
         work_experience?: number;


    @ApiProperty()
         user_id?: number;
    
    @ApiProperty()
         certificate_date_begin?: Date;

    @ApiProperty()
         certificate_date_end?: Date;

    @ApiProperty()
         post?: string;

    @ApiProperty({required: false})
         clinic_id?: number;

    @ApiProperty({required: false})
         doctor_id?: number;

    @ApiProperty()
         placement_id?: number;

    @ApiProperty()
         work_schedule_id?: number

}