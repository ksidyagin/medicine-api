import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User, UserRole, UserStatus } from '../models/user.interface';
import {switchMap, map, catchError} from 'rxjs/operators';
import { use } from 'passport';
import {
    paginate,
    Pagination,
    IPaginationOptions} from 'nestjs-typeorm-paginate';

import { randomBytes } from 'crypto';
import { TokenService } from 'src/modules/token/services/token.service';
import { json } from 'express';
import { ProfilesEntity } from 'src/modules/profiles/profiles.entity';
import { PatientEntity } from 'src/modules/patient/patient.entity';
import { ProfilesService } from 'src/modules/profiles/profiles/profiles.service';
import { PatientService } from 'src/modules/patient/patient/patient.service';
import { Profiles } from 'src/modules/profiles/profiles.model';
import { NurseEntity } from 'src/modules/nurse/nurse.entity';
const bcrypt = require('bcrypt');

export class CarwashPayload{
    id: number
}

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
      @InjectRepository(ProfilesEntity) private readonly profilesRepos: Repository<ProfilesEntity>,
      @InjectRepository(PatientEntity) private readonly patientRepos: Repository<PatientEntity>,
      @InjectRepository(NurseEntity) private readonly nurseRepos: Repository<NurseEntity>,
      private authService: AuthService, private tokenService: TokenService, private profileService: ProfilesService,
      private patientService: PatientService
  ){}

    private code: string;
    generateCode(): string {
        let code: string = "";
    
        do {
            code += randomBytes(3).readUIntBE(0, 3);
        } while (code.length < 6);
    
        return code.slice(0, 6);
    }

    async createUserEntry(user: User): Promise<Observable<User>> {
                const newUser = new UserEntity();  
                newUser.email = user.email;
                newUser.password = null;
                newUser.verify_code = this.generateCode();
                const email : string = user.email;
                return from(this.userRepository.findOne({email})).pipe(
                    switchMap((userFind: User) => {
                        if(userFind){
                            throw new HttpException("User with this email is already exists", HttpStatus.BAD_REQUEST);
                        }
                        else{
                            return from(this.userRepository.save(newUser)).pipe(
                                map((user: User) => {
                                    const {password, verify_code, ...result} = user;
                                    this.authService.sendCodeEmail(email, newUser.verify_code);
                                    return result;
                                }),
                                catchError(err => throwError(err))
                            )
                        }
                    })
                )
    }

    async create(user: User): Promise<Observable<User>> {
        return (await this.authService.hashPassword(user.password)).pipe(
            switchMap((passwordHash: string) => {    
                const newUser = new UserEntity();  
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.phone = user.phone;
               
                const email : string = user.email;
                return from(this.userRepository.findOne({email})).pipe(
                    switchMap((userFind: User) => {
                        if(userFind){
                            throw new HttpException("User with this email is already exists", HttpStatus.BAD_REQUEST);
                        }
                        else{
                            return from(this.userRepository.save(newUser)).pipe(
                                map((user: User) => {
                                    const {password, ...result} = user;
                                    // this.authService.sendEmail(newUser);
                                    return result;
                                }),
                                catchError(err => throwError(err))
                            )
                        }
                    })
                )
                                         
            })
        )
    }

    async createExecutor(user: User): Promise<Observable<User>> {
        return (await this.authService.hashPassword(user.password)).pipe(
            switchMap((passwordHash: string) => {
               
                const newUser = new UserEntity();
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.phone = user.phone;
                const email : string = user.email;
                return from(this.userRepository.findOne({email})).pipe(
                    switchMap((userFind: User) => {
                        if(userFind){
                            throw new HttpException("User with this email is already exists", HttpStatus.BAD_REQUEST);
                        }
                        else{
                            return from(this.userRepository.save(newUser)).pipe(
                                map((user: User) => {
                                    const {password, ...result} = user;
                                    this.authService.sendEmailStaff(newUser);
                                    return result;
                                }),
                                catchError(err => throwError(err))
                            )
                        }
                    })
                )
                                         
            })
        )
    }


  findOne(id: number): Observable<User> {
      return from(this.userRepository.findOne({id})).pipe(
          map((user: User) => {
            const {password, ...result} = user;
            return result;
          })
      )
  }

  findAll(): Observable<User[]> {
      return from(this.userRepository.find()).pipe(
          map((users: User[]) => {
           users.forEach(function(v) {delete v.password});
           return users;
          })
      );
  }

  paginate(options: IPaginationOptions): Observable<Pagination<User>> {
    return from(paginate<User>(this.userRepository, options)).pipe(
        map((usersPageable: Pagination<User>) => {
            usersPageable.items.forEach(function(v) {delete v.password});

            return usersPageable;
        })
    )
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id)); 
  }

//   deleteRelations(id: number): Observable<any> {
//     return from(this.clientRepository.findOne({id}, {relations: ['cars', 'orders']})).pipe(
//         map((client: Client) => {
//             if(client){  
//                 for(let i =0; i< client.orders.length; i++){
//                     this.orderRepository.delete(client.orders[i].id);
//                 }
//                 for(let i =0; i< client.cars.length; i++){
//                  this.clientAutoRepository.delete(client.cars[i].id);
//                 }
//                 this.clientRepository.delete(id);
//             }
//             else{
//              throw new HttpException("This user is not exists", HttpStatus.BAD_REQUEST);
//             }
//         })
//     )   
//   }
  updateOne(id: number, user: any): Observable<any> {
    const newUser = new UserEntity();  
    newUser.email = user.email;
    newUser.active_sign = user.active_sign;
    newUser.phone = '';
    return from(this.authService.hashPassword(user.password)).pipe(
        map((passwordHash: string) => {
            newUser.password = passwordHash;
            return from(this.userRepository.update(id, newUser));
        })
    )
  }

  updateRoleOfUser(id: number, user: User): Observable<any> {
      return from(this.userRepository.update(id, user));
  }



  login(user: User): Observable<string> {
      return this.validateUser(user.email, user.password).pipe(
          switchMap((user: User) => {
              if(user){
                let profiles: Profiles[];
                let patient_entry;
                return from(this.profilesRepos.find({ where: { user_id: user.id} })).pipe(
                    switchMap((data: Profiles[])=>{
                        profiles = data;
                        for(let i = 0; i < profiles.length; i++){
                            if(profiles[i].profile_type === 'patient'){
                                return from(this.patientRepos.findOne(profiles[i].profile_id)).pipe(
                                    switchMap((patient)=>{
                                        console.log(patient);
                                        return this.authService.generateJWT({user, patient}).pipe(map((jwt: string) => jwt));
                                    })
                                )
                            }
                            else if (profiles[i].profile_type === 'nurse'){
                                return from(this.nurseRepos.findOne(profiles[i].profile_id)).pipe(
                                    switchMap((nurse)=>{
                                        console.log(nurse);
                                        return this.authService.generateJWT({user, nurse}).pipe(map((jwt: string) => jwt));
                                    })
                                )
                            }
                        }
                        console.log(profiles)

                        
                    })
                )
                
              }
              else {
                throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
              }
          })
      )
    }

  //SUPERADMIN
  loginSuperAdmin(user: User): Observable<string> {
    const checkUser = this.validateSuperAdmin(user.email, user.password);
            if(checkUser){
                return this.authService.generateJWT(checkUser).pipe(map((jwt: string) => jwt));
            }
            else {
              throw new HttpException('Wrong email or password for SuperAdmin', HttpStatus.BAD_REQUEST);
            }
        
    }


  validateUser(email: string, password: string): Observable<User> {
      return this.findByEmail(email).pipe(
          switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
              map((match: boolean) => {
                  if(match){
                      const {password, ...result} = user;
                      return result;
                  }
                  else {
                      throw Error;
                  }
              })
          ))
      )
  }

  validateSuperAdmin(email: string, password: string): User {
      if(email === process.env.MAILDEV_USER && password === process.env.MAILDEV_PASS){
        const user: User = {
            id: 0,
            email: email,
            password: "123456",
            phone: "88005553535"
        }
        const {password, ...result} = user;
        return result;
      }
      else {
        throw new HttpException('Wrong password or email for SuperUser', HttpStatus.BAD_REQUEST);
      }

    }
    
  findByEmail(email: string): Observable<User> {
      return from(this.userRepository.findOne({email}));
  }

  findUserByEmail(email: string): Observable<User> {
    return this.findByEmail(email).pipe(
        map((user: User) => {
            if(user){
                return user;
            }
            else {
                return null;
            }
        })
    );  
  }

  checkVerificationCode(id: string, code: string){
        return from(this.userRepository.findOne(id)).pipe(
            map((user: User) => {
                if(user.verify_code === code){
                    return true;
                }
                else{
                    return false;
                }
            })
        )
    }


   async confirm(token: string): Promise<Observable<any>> {
    const data =  this.authService.verifyToken(token);
    const user =  await this.userRepository.findOne(data.id);

    this.tokenService.deleteOne(data._id, token);

    if (user) {
        // user.status = UserStatus.active;
        return from (this.userRepository.update(data.id, user));
    }
    throw new BadRequestException('Confirmation error');
    }
}
