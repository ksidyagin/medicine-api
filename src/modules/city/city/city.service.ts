import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { CityEntity } from '../city.entity';
import { City } from '../city.model';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>
        ){}
  
    create(client: City): Observable<City> 
    {
        return from(this.cityRepository.save(client)); 
    }
  
  
    findOne(id: number): Observable<City> {
        return from(this.cityRepository.findOne({id}));
    }

    findOneByName(city_name: string): Observable<City> {
        return from(this.cityRepository.findOne({ where: { name: city_name} }));
    }
  
    findAll(): Observable<City[]> 
    {
        return from(this.cityRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
  
        return from(this.cityRepository.delete(id));

    }
  
    updateOne(id: number, client: City): Observable<any> 
    {
        return from(this.cityRepository.update(id, client));
    }
}
