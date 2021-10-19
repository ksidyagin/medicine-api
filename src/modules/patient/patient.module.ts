import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './patient.entity';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientEntity])
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService, TypeOrmModule]
})
export class PatientModule {}
