import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { ProfilesEntity } from '../profiles.entity';
import { Profiles } from '../profiles.model';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(ProfilesEntity) private readonly placementRepository: Repository<ProfilesEntity>
        ){}
  
    create(client: Profiles): Observable<Profiles> 
    {
        return from(this.placementRepository.save(client)); 
    }
  
  
    findOne(id: number): Observable<Profiles> {
        return from(this.placementRepository.findOne({id}));
    }

  
    findAll(): Observable<Profiles[]> 
    {
        return from(this.placementRepository.find());
    }
  
    findByUserId(id:number): Observable<Profiles[]>{
       return from(this.placementRepository.find({ where: { user_id: id} }));
    }
    deleteOne(id: number): Observable<any> 
    {
  
        return from(this.placementRepository.delete(id));

    }
  
    updateOne(id: number, client: Profiles): Observable<any> 
    {
        return from(this.placementRepository.update(id, client));
    }

}
