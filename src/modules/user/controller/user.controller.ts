import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { access } from 'fs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/modules/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { AuthService, EmailSend } from 'src/modules/auth/services/auth.service';
import { User, UserRole } from '../models/user.interface';
import { ConfirmAccountDto } from '../service/accountConfirm';
import { CarwashPayload, UserService } from '../service/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService, private authService: AuthService) {}

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


    @Post('login')
    login(@Body()user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {return {access_token: jwt}  
        }),
        catchError(err => of({ error: err.message}))
        )
    }

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
