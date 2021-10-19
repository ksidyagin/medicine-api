import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles/profiles.service';
import { ProfilesController } from './profiles/profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesEntity } from './profiles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesEntity]),

  ],
  providers: [ProfilesService],
  controllers: [ProfilesController],
  exports: [ProfilesService, TypeOrmModule]
})
export class ProfilesModule {}
