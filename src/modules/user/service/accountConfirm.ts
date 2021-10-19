import { ApiProperty } from "@nestjs/swagger";

export class ConfirmAccountDto {
    @ApiProperty()
    token: string;
}