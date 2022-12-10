import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';
import { Poe } from '../models/poe';
import { PoeDto } from 'src/app/poes/dto/poe-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoeService {

  private poes: Array<Poe> = [];
  private controllerBaseUrl!: string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.controllerBaseUrl = `${environment.apiBaseUrl}/poe`;
  }

  public getPoes(): Array<Poe> {
    return this.poes;
  }

  public findOne(id: number): Observable<Poe> {
    return this.httpClient.get<any>(
      `${environment.apiBaseUrl}/poe/${id}`
    )
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id);
          poe.setTitle(inputPoe.title);
          poe.setPoeType(inputPoe.poeType);
          poe.setBeginDate(new Date (inputPoe.beginDate));
          poe.setEndDate(new Date (inputPoe.endDate));
          poe.setIdAelion(inputPoe.idAelion);
          return poe;
        })
      );
  }

  public findAll(): Observable<Poe[]> {
    return this.httpClient.get<any>(this.controllerBaseUrl)
      .pipe(
        take(1),
        map((poes: any[]) => {
          return poes.map((inputPoe: any) => {
            const poe: Poe = new Poe();
            poe.setId(inputPoe.id);
            poe.setTitle(inputPoe.title);
            poe.setPoeType(inputPoe.poeType);
            poe.setBeginDate(new Date (inputPoe.beginDate));
            poe.setEndDate(new Date (inputPoe.endDate));
            poe.setIdAelion(inputPoe.idAelion);
            return poe;
          })
        })
      );
  }

  public add(poe: PoeDto): Observable<Poe> {
    console.log("La fonction add appelle ", poe);
    return this.httpClient.post<PoeDto>(this.controllerBaseUrl, poe)
      .pipe(
        take(1),
        map((poeDto: PoeDto) => {
          const poe: Poe = new Poe();
          poe.setId(poeDto.id!);
          poe.setTitle(poeDto.title);
          poe.setPoeType(poeDto.poeType);
          poe.setBeginDate(new Date (poeDto.beginDate));
          poe.setEndDate(new Date (poeDto.endDate));
          poe.setIdAelion(poeDto.idAelion);
          return poe;
        })
      );
  }


  public update(poe: Poe): Observable<Poe> {
    return this.httpClient.put<Poe>(
      `${this.controllerBaseUrl}`,
      poe
    )
    .pipe(
      take(1),
      map((anyPoe: any) => {
        const poe: Poe = new Poe();
        poe.setId(anyPoe.id!);
        poe.setTitle(anyPoe.title);
        poe.setPoeType(anyPoe.poeType);
        poe.setBeginDate(new Date(anyPoe.beginDate));
        poe.setEndDate(new Date(anyPoe.endDate));
        poe.setIdAelion(anyPoe.idAelion);
        
        return poe;
      })
    )
  }

  public delete(poe: Poe): Observable<HttpResponse<any>> {
    console.log(`Le composant me demande de supprimer la poe ${poe.getTitle()} avec l'id Aelion ${poe.getIdAelion()}
     et l'id ${poe.getId()}`);
    return this.httpClient.delete(
      `${this.controllerBaseUrl}/${poe.getId()}`,
      {
        observe: 'response'
      }
    );
  }




}
