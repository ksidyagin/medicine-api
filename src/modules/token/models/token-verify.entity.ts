import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class TokenVerifyEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    token: string;

    @Column({type: 'timestamp'})
    expireAt: string;

}