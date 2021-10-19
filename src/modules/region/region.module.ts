import { Module } from '@nestjs/common';
import { RegionService } from './region/region.service';
import { RegionController } from './region/region.controller';
import { RegionEntity } from './region.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegionEntity])
    
  ],
  providers: [RegionService],
  controllers: [RegionController],
  exports:[RegionService, TypeOrmModule]
})
export class RegionModule {}
