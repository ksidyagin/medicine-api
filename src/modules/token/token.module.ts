import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenVerifyEntity } from './models/token-verify.entity';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenVerifyEntity])
    
],
  providers: [TokenService],
  exports:[TokenService]
})
export class TokenModule {}
