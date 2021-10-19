import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictEntity } from './district.entity';
import { DistrictController } from './district/district.controller';
import { DistrictService } from './district/district.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DistrictEntity])
  ],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [DistrictService, TypeOrmModule]
})
export class DistrictModule {}
