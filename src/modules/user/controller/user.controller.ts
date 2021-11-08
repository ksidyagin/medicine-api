import { Body, Request , Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards, ValidationPipe, Res, Req, Inject, CACHE_MANAGER } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { access } from 'fs';
import jwtDecode from 'jwt-decode';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/modules/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { LocalAuthenticationGuard } from 'src/modules/auth/guards/localAuthentication.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { AuthService, EmailSend } from 'src/modules/auth/services/auth.service';
import { Repository } from 'typeorm';
import RequestWithUser from '../models/requestWithUser';
import { UserEntity } from '../models/user.entity';
import { User, UserRole } from '../models/user.interface';
import { ConfirmAccountDto } from '../service/accountConfirm';
import { CarwashPayload, UserService } from '../service/user.service';
import { Response } from 'express';
import {Cache} from 'cache-manager';
@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private userService: UserService, private authService: AuthService, @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    @Post('registration')
    async create(@Body()user: User): Promise<Observable<User | Object>> {
        return (await this.userService.createUserEntry(user)).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        );
    }

    // @hasRoles(UserRole.ADMIN || UserRole.MANAGER)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth() 
    // @Post('createExecutor')
    // async createExecutor(@Body()user: User): Promise<Observable<User | Object>> {
    //     return (await this.userService.createExecutor(user)).pipe(
    //         map((user: User) => user),
    //         catchError(err => of({error: err.message}))
    //     );
    // }


    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
      const {user} = request;
      await this.cacheManager.reset();
      await this.cacheManager.set('access_token', user.id, { ttl: 1200 });
      return response.send(true);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('auth')
    async authenticate() {
        const value = await this.cacheManager.get('access_token');
        if(value != undefined){
            console.log(value);
            return {authenticated:true};
        }
        else{
            return {authenticated:false};
        }
    }

    @Get('getUser')
    async getUser() {
        const value:number = await this.cacheManager.get('access_token');
        if(value != undefined){
            return (await this.userService.getProfile(value)).pipe(
                map((user) => {
                    let token = {
                        token: user
                    };
                    return token;
                }),
                catchError(err => of({error: err.message}))
            );
        }
        else{
            return {authenticated:false};
        }
    }

    @Post('logout')
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Post('refresh')
    // async refresh(@Body()body: any) {
    // const token: any = jwtDecode(body.accessToken);
    // const admin =  await this.userRepository.findOne(token.user.user.id);
    // return this.userService.login(admin).pipe(
    //     map((jwt: string) => {return {access_token: jwt}  
    // }),
    // catchError(err => of({ error: err.message}))
    // )
    // }

    // @Post('loginSuperAdmin')
    // loginSuperAdmin(@Body()user: User): Observable<Object> {
    //     return this.userService.loginSuperAdmin(user).pipe(
    //         map((jwt: string) => {return {access_token: jwt}  
    //     }),
    //     catchError(err => of({ error: err.message}))
    //     )
    // }
    

    @Get(':id')
    findOne(@Param('id') id: number): Observable<any> {
        return this.userService.findOne(id);
    }

    // @Get()
    // index( @Query('page') page: number = 1,
    // @Query('limit') limit: number = 10): Observable<Pagination<User>> {
    //    limit = limit > 100 ? 100 : limit;
    //     return this.userService.paginate({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/users' });
    // }

    // @hasRoles(UserRole.SUPERADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth() 
    // @Delete(':id')
    // deleteOne(@Param('id')id: string): Observable<User> {
    //     return this.userService.deleteOne(Number(id));
    // }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()user: any): Observable<any>  {
        return this.userService.updateOne(Number(id), user);
    }

    // @hasRoles(UserRole.MANAGER)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth() 
    // @Put('role/:id')
    // update(@Param('id')id: string , @Body()user: User): Observable<any>  {
    //     return this.userService.updateRoleOfUser(Number(id), user);
    // }


    // @hasRoles(UserRole.ADMIN || UserRole.MANAGER)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth() 
    // @Put('carwash/:id')
    // updateCarwash(@Param('id')id: string , @Body()carwash: CarwashPayload): Observable<any>  {
    //     return this.userService.addCarwashToUser(Number(id), carwash);
    // }


    // @Get('confirm/:token')
    // async confirm(@Param('token')query: string): Promise<boolean> {
    //     await this.userService.confirm(query);
    //     return true;
    // }

    @Get('verify_code/:code')
    async confirm(@Body()query: any): Promise<boolean> {
        await this.userService.checkVerificationCode(query.id, query.verify_code);
        return true;
    }

    @Get('findEmail/:email')
    findUserByEmail(@Param('email')email: string): Observable<User> {
        return this.userService.findUserByEmail(email);
    }
}
