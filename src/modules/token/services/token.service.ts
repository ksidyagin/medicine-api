import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { TokenVerifyEntity } from '../models/token-verify.entity';
import { TokenVerify } from '../models/token-verify.interface';

@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(TokenVerifyEntity) private readonly tokenRepository: Repository<TokenVerifyEntity>,
    ){}
  
    create(token: TokenVerify): Observable<TokenVerifyEntity> 
    {
        return from(this.tokenRepository.save(token)); 
    }
  
    findOne(id: number, token: string): Observable<TokenVerifyEntity> {
       return from (this.tokenRepository.findOne({id, token}));
    }
  
    deleteOne(id: number, token: string): Observable<any> 
    {
        return from(this.tokenRepository.delete({id, token}));
    }
  
    
}
