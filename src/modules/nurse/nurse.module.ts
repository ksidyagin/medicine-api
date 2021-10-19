import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NurseEntity } from './nurse.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([NurseEntity])
  
    ],
    exports: [TypeOrmModule]
  })
  
export class NurseModule {}
