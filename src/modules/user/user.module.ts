import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserEntity } from './models/user.entity';
import { AuthModule } from '../auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TokenModule } from '../token/token.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { PatientModule } from '../patient/patient.module';
import { NurseModule } from '../nurse/nurse.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    
    forwardRef(() => AuthModule),
    forwardRef(() => TokenModule),
    forwardRef(() => ProfilesModule),
    forwardRef(()=> PatientModule),
    forwardRef(()=> NurseModule)

  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
