import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { DistrictEntity } from '../district.entity';
import { District } from '../district.model';

@Injectable()
export class DistrictService {
    constructor(
        @InjectRepository(DistrictEntity) private readonly distRepository: Repository<DistrictEntity>
        ){}
  
    create(client: District): Observable<District> 
    {
        return from(this.distRepository.save(client)); 
    }
  
  
    findOne(id: number): Observable<District> {
        return from(this.distRepository.findOne({id}));
    }

    findOneByName(city_name: string): Observable<District> {
        return from(this.distRepository.findOne({ where: { name: city_name} }));
    }
  
    findAll(): Observable<District[]> 
    {
        return from(this.distRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
  
        return from(this.distRepository.delete(id));

    }
  
    updateOne(id: number, client: District): Observable<any> 
    {
        return from(this.distRepository.update(id, client));
    }
}
