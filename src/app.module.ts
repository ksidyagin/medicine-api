import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TokenModule } from './modules/token/token.module';
import { PlacementModule } from './modules/placement/placement.module';
import { RegionModule } from './modules/region/region.module';
import { CityModule } from './modules/city/city.module';
import { DistrictModule } from './modules/district/district.module';
import { PatientModule } from './modules/patient/patient.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { NurseModule } from './modules/nurse/nurse.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: "postgres", 
      url: process.env.DATABASE_URL,
      // host: process.env.HOST,
      // port: 5432,
      // username: 'nuelivibofnmsz',
      // password: process.env.PASSWORD,
      // database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false
      }
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST, // change to your email smtp server like www.example.com
        port: process.env.EMAIL_PORT, // change to configured tls port for smtp server
        secure: true,
        auth: {
            user: process.env.MAILDEV_USER,
            pass: process.env.MAILDEV_PASS
        }
      },
      defaults: {
        from:`"No reply" <${process.env.MAILDEV_USER}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    AuthModule,
    TokenModule,
    PlacementModule,
    RegionModule,
    CityModule,
    DistrictModule,
    PatientModule,
    NurseModule,
    ProfilesModule,
    CacheModule.register()
    
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
